import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collectionData, docData, doc, addDoc, deleteDoc, updateDoc, query, where } from '@angular/fire/firestore';
import { collection, DocumentReference, getDoc, getDocs } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '../../global/models/globals.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUserId: string = null;
  currentUser: User = null;
  USERS_KEY: string = 'users';

  constructor(private auth: Auth, private firestore: Firestore) { 
    try {
      this.auth.onAuthStateChanged(user => {
        console.log('Changed', user);
        this.currentUserId = user.uid;
      })
    } catch (e) {

    }

  }

  async signUp({ email, password}) {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
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
