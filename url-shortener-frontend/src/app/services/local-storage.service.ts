import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStorage {
  constructor() {}

  storeUserData(token, user) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  loggedIn() {
    return !!localStorage.getItem("token") && localStorage.getItem("user");
  }

  getToken() {
    return localStorage.getItem("token");
  }
  getUser() {
    return localStorage.getItem("user");
  }
}
