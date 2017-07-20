import { Component, OnInit } from '@angular/core';
import { UserLookupService } from './../github-service/user-lookup.service';
import { UserData } from './../user-data.model';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  providers: [UserLookupService]
})
export class UserSearchComponent implements OnInit {

  searchedUser: UserData = null;

  constructor(
    private userSearch: UserLookupService
  ) { }

  ngOnInit() {
  }

  lookupUser(username: string): void {
    this.userSearch.getUserDetails(username).subscribe(data => {
      const body = data.json();
      this.searchedUser = new UserData(
        body.login,
        body.name,
        body.html_url,
        body.avatar_url,
        body.bio,
        body.location,
        body.created_at,
        body.updated_at,
        body.public_repos,
        [], //this needs to be an array of repositories
        body.followers,
        body.following,
        [] //this needs to be an array of repositories
      );
      console.log(this.searchedUser);
    });
  }
}
