import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, UserInfo } from '@angular/fire/auth';
import { Firestore, collectionData, docData, doc, addDoc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { collection, DocumentReference, getDoc, getDocs } from 'firebase/firestore';
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
        console.log('Changed', user);
        this.currentUserId = user.uid;
        this.getUser(user.uid).then((snapshot)=> {
          snapshot.forEach( async (userRef)=> {
            docData(userRef.ref, { idField: 'uid' }).subscribe( async (user)=> {
              this.currentUser = user;
            })
            })
          });
        this.userInfoChangeSub.next(user);
      })
    } catch (e) {

    }

  }

  async signUp({ email, password}) {
    try {
      const credential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('result', credential);
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

  async getUser(uid: string) {
    console.log('getUser uid')
    console.log(uid);
    const usersRef = collection(this.firestore, `${this.USERS_KEY}`);
    const q = query(usersRef, where('uid', '==', `${uid}`));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
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

}
