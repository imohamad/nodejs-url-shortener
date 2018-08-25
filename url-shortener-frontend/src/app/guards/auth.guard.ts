import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LocalStorage } from "../services/local-storage.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate { //check localstorage for show dashboard
  constructor(private localStorage: LocalStorage, private router: Router) {}
  canActivate(): boolean {
    if (this.localStorage.loggedIn()) {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
