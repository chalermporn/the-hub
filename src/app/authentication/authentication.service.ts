import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { User } from './../models/user.model';
import { Message } from "./../models/message.model";

@Injectable()
export class AuthenticationService {
  user: Observable<firebase.User>;
  authenticatedUsername: string;


  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public userService: UserService,
  ) {
    this.user = afAuth.authState;
  }

  login(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(signedInUser => {
        if (signedInUser) {
          const username = signedInUser.additionalUserInfo.username;
          this.authenticatedUsername = username;
          this.userService.userExists(username).subscribe(user => {
            if (!user) {
              const newUser = new User(
                signedInUser.user.displayName,
                username,
                signedInUser.user.email,
                signedInUser.user.uid,
                signedInUser.user.photoURL
              );
              this.userService.createUser(newUser);
            }
          });
        }
      });
  }

  logout(): void {
    this.router.navigate(['']);
    this.afAuth.auth.signOut();
  }
}
