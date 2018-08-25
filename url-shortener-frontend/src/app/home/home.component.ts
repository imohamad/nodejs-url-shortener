import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { ApiService } from "../services/api.service";
import { LocalStorage } from "../services/local-storage.service";
import { fadeAnimation } from "../animations/fadeAnimations";
import { TitleService } from "../services/title.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  animations: [fadeAnimation]
})
export class HomeComponent implements OnInit {
  emailInput: String;
  passwordInput: String;
  status: String;
  result;
  btnLoading: boolean = false;
  showStatus: boolean = false;
  btnDisabled: boolean = false;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorage,
    private router: Router,
    private pageTitle: TitleService
  ) {}

  ngOnInit() {
    if (this.localStorage.getToken()) { //check localstorage
      this.router.navigate(["dashboard"]);
    }
    this.pageTitle.setPageTitle("URL Shortener | Login"); //set page title
  }

  onLoginSubmit() {
    this.btnLoading = true;
    this.btnDisabled = true;

    const user = { //get username & password
      email: this.emailInput,
      password: this.passwordInput
    };

    this.apiService.authUser(user).subscribe(
      response => {
        this.result = response;

        if (this.result.success) {
          //set localstorage for save user in browser
          this.localStorage.storeUserData(this.result.token, this.result.user);
          this.router.navigate(["dashboard"]); //redirected to dashboard page
        }
      },
      error => {
        this.btnLoading = false;
        this.status = error.error.status;
        this.btnDisabled = false;
        this.showStatus = true;
        setTimeout(() => { //hide status after 1.5 sec
          this.showStatus = false;
        }, 1500);
      }
    );
  }
}
