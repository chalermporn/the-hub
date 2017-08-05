import * as firebase from 'firebase';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatRoomDetailComponent } from './chat-room-detail/chat-room-detail.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { RepoSearchComponent } from './repo-search/repo-search.component';
import { AboutComponent } from './about/about.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './route-guards/auth-guard.service';
import { AuthenticationService } from './authentication/authentication.service';
import { MaxPagesService } from './github-services/max-pages.service';

import { masterFirebaseConfig } from './api-keys';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

// the reason behind this can be found here https://github.com/angular/angularfire2/issues/556
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    ChatRoomComponent,
    ChatRoomDetailComponent,
    LandingPageComponent,
    NavbarComponent,
    ChatRoomComponent,
    UserSearchComponent,
    RepoSearchComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [UserService, AuthGuard, AuthenticationService, MaxPagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
