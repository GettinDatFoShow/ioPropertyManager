import { Injectable } from '@angular/core'
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { User } from '../../global/models/globals.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User = null;

  constructor(private _auth: Auth) { 
    this._auth.onAuthStateChanged(user => {
      console.log('Changed', user);
      this.currentUser = user;
    })
  }

  async signUp({ email, password}) {
    try {
      const credential = await createUserWithEmailAndPassword(this._auth, email, password);
      console.log('result', credential);
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

}
