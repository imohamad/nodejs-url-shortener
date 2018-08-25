import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ApiService {
  // private API_URL = "http://urlsh.eu-4.evennode.com/api/v0.1/";
  private API_URL = "http://localhost:3000/api/v0.1/";
  private URLS_PATH = "urls/";
  private STATICS_PATH = "statics";
  private AUTH_USER = "users/signin";
  private SIGNUP_PATH = "users/signup";
  private HEADERS = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}

  authUser(user) {
    return this.http.post(this.API_URL + this.AUTH_USER, user, {
      headers: this.HEADERS
    });
  }
  signupUser(user) {
    return this.http.post(this.API_URL + this.SIGNUP_PATH, user, {
      headers: this.HEADERS
    });
  }

  getUserLinks() {
    return this.http.get(this.API_URL + this.URLS_PATH, {
      headers: this.HEADERS
    });
  }

  getStatics() {
    return this.http.get(this.API_URL + this.STATICS_PATH, {
      headers: this.HEADERS
    });
  }
  shortUrl(url) {
    return this.http.post(this.API_URL + this.URLS_PATH, url, {
      headers: this.HEADERS
    });
  }
  removeUrl(id) {
    return this.http.delete(this.API_URL + this.URLS_PATH + id, {
      headers: this.HEADERS
    });
  }

  logOut() {
    localStorage.clear();
  }
}
