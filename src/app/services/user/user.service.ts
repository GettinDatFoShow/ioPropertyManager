import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../../global/models/globals.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User = null;

  constructor(private _afAuth: AngularFireAuth, private _firestore: AngularFirestore) { 
    this._afAuth.onAuthStateChanged(user => {
      console.log('Changed', user);
      this.currentUser = user;
    })
  }

  async signUp({ email, password}) {
    const credential = await this._afAuth.createUserWithEmailAndPassword(email, password);
    console.log('result', credential);
    const uid = credential.user.uid;

    return this._firestore.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credential.user.email
    });
  }

  signIn({email, password}) {
    return this._afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this._afAuth.signOut();
  }

}
