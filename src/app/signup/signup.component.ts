import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { fadeAnimation } from "../animations/fadeAnimations";
import { ApiService } from "../services/api.service";
import { TitleService } from "../services/title.service";
import { LocalStorage } from "../services/local-storage.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  animations: [fadeAnimation]
})
export class SignupComponent implements OnInit {
  showDiv: boolean = true;
  emailInput: String;
  usernameInput: String;
  passwordInput: String;
  confirmPasswordInput: String;
  success: String;
  status;
  showSuccess: boolean = false;
  registerData;
  btnLoading: boolean = false;
  btnDisabled: boolean = false;

  constructor(
    private apiService: ApiService,
    private pageTitle: TitleService,
    private localStorage: LocalStorage,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.localStorage.getToken()) {
      this.router.navigate(["dashboard"]);
    }
    this.pageTitle.setPageTitle("URL Shortener | Sign up");
  }

  onResgisterSubmit() {
    this.btnLoading = true;
    this.btnDisabled = true;

    const user = {
      email: this.emailInput,
      username: this.usernameInput,
      password: this.passwordInput,
      confirmPassword: this.confirmPasswordInput
    };

    this.apiService.signupUser(user).subscribe(
      res => {
        this.registerData = res;
        if (this.registerData.success) {
          this.success = "User created";

          this.btnLoading = false;
          this.btnDisabled = false;
          this.showSuccess = true;
        }
      },
      error => {
        this.btnLoading = false;
        this.btnDisabled = false;
        this.showSuccess = false;
        this.status = error.error.error;
      }
    );
  }
}
