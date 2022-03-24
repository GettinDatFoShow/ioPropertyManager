import { Injectable } from '@angular/core'
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collectionData, docData, doc, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { collection, DocumentReference } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '../../global/models/globals.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User = null;
  USERS_KEY: string = 'Users';

  constructor(private _auth: Auth, private _firestore: Firestore) { 
    this._auth.onAuthStateChanged(user => {
      console.log('Changed', user);
      this.currentUser = user;
    })
  }

  async signUp({ email, password}) {
    try {
      const credential = await createUserWithEmailAndPassword(this._auth, email, password);
      console.log('result', credential);
      return credential;
    } catch (e) {
      console.warn(e.message);
    }
  }

  signIn({email, password}) {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  signOut() {
    return signOut(this._auth);
  }

  createUser(user: User): Promise<DocumentReference> {
    const userDocRef = collection(this._firestore, this.USERS_KEY);
    return addDoc(userDocRef, user);
  }

  getUser(uid: string): Observable<User> {
    const userDocRef = doc(this._firestore, `${this.USERS_KEY}/${uid}`);
    return docData(userDocRef, {idField: 'uid'}) as Observable<User>;
  }

  updateUser(user: User): Promise<any> {
    const userDocRef = doc(this._firestore, `${this.USERS_KEY}/${user.uid}`);
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

}
