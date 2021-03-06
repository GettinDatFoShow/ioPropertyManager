import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, UserInfo } from '@angular/fire/auth';
import { Firestore, collectionData, docData, doc, addDoc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { collection, DocumentData, DocumentReference, getDoc, getDocs, QuerySnapshot } from 'firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { User } from '../../global/models/globals.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserId: string = null;
  currentUser = null;
  USERS_KEY: string = 'users';
  userInfoChangeSub: Subject<UserInfo> = new Subject<UserInfo>()

  constructor(private auth: Auth, private firestore: Firestore) { 
    try {
      this.auth.onAuthStateChanged((user: UserInfo) => {
        this.currentUserId = user.uid;
        this.reloadUser();
        // this.userInfoChangeSub.next(user);
      })
    } catch (e) {

    }

    console.warn('USER SERVICE INSTANCE CREATED');
  }

  async signUp({ email, password}) {
    try {
      const credential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return credential;
    } catch (e) {
      console.warn(e.message);
    }
  }

  async signIn({email, password}) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    return signOut(this.auth);
  }

  createUser(user: User): Promise<DocumentReference> {
    const userDocRef = collection(this.firestore, this.USERS_KEY);
    return addDoc(userDocRef, user);
  }

  getUser(uid: string) {
    console.warn('user service getUser uid')
    const usersRef = collection(this.firestore, `${this.USERS_KEY}`);
    const q = query(usersRef, where('uid', '==', `${uid}`));
    return getDocs(q);
  }

  updateUser(user: User): Promise<any> {
    const userDocRef = doc(this.firestore, `${this.USERS_KEY}/${user.uid}`);
    return updateDoc(userDocRef, {
      uid: user.uid,
      signInEmail: user.signInEmail,
      personalInfo: user.personalInfo,
      joinDate: user.joinDate,
      location: user.location,
      active: user.active,
      isOwner: user.isOwner,
      membership: user.membership,
      companyId: user.companyId,
      extraInfo: user.extraInfo
    });
  }  

  setUserId(uid: string): void {
    this.currentUserId = uid;
  }

  setCurrentUser(user: User) {
    // this.setUserId(user.uid);
    this.currentUser = user;
  }
  
  getCurrentUser(): User {
    return this.currentUser;
  }

  getCurrentUserId(): string {
    return this.currentUserId;
  }

  async reloadUser() {
    await this.getUser(this.currentUserId).then((snapshot: QuerySnapshot<DocumentData>)=> {
      snapshot.forEach( (userRef)=> {
        docData(userRef.ref, { idField: 'uid' }).subscribe( (user)=> {
          this.currentUser = user;
          this.userInfoChangeSub.next(this.currentUser);
           // this.router.navigateByUrl('/tabs', {replaceUrl: true});
        });
        // this.loadingUserData = false;
      })
    });
  }

}
