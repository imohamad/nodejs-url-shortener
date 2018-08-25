import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { fadeAnimation } from "../animations/fadeAnimations";
import { ApiService } from "../services/api.service";
import { LocalStorage } from "../services/local-storage.service";
import { TitleService } from "../services/title.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  animations: [fadeAnimation]
})
export class DashboardComponent implements OnInit {
  showMain: boolean = true;

  links: boolean = true;
  profile: boolean = false;

  user: any = "";
  result: any = "";
  userLinksData: any = "";
  url: String;
  btnLoading: boolean = false;
  btnDisabled: boolean = false;
  firstItem: number = 0;
  lastItem: number = 4;
  showNextPage: boolean = false;
  showPrevPage: boolean = false;
  status: String;
  showStatus: boolean = false;
  loading: boolean = true;

  constructor(
    private apiService: ApiService, //connect to api
    private localStorage: LocalStorage, //storage manager
    private router: Router, //redirect
    private pageTitle: TitleService //change & set page title
  ) {}

  ngOnInit() {
    this.pageTitle.setPageTitle("URL Shortener | Dashboard");
    this.user = JSON.parse(this.localStorage.getUser());

    this.getStatics();
    this.getUserLinks();
  }

  getStatics() {
    this.apiService.getStatics().subscribe(
      res => {
        this.result = res;
      },
      error => {
        console.log(error);
      }
    );
  }

  getUserLinks() {
    this.loading = true;
    this.apiService.getUserLinks().subscribe(
      res => {
        this.userLinksData = res;
        this.userLinksData.urlData.reverse();
        this.loading = false;

        if (this.userLinksData.count > this.lastItem) {
          this.showNextPage = true;
          this.loading = false;
        }
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  shortUrl() {
    this.btnLoading = true;
    this.btnDisabled = true;

    const link = {
      url: this.url
    };

    this.apiService.shortUrl(link).subscribe(
      res => {
        this.getStatics();
        this.getUserLinks();
        this.url = "";
        this.btnLoading = false;
        this.btnDisabled = false;
        this.status = "Your link has been shortened.";
        this.showStatus = true;

        setTimeout(() => {
          this.showStatus = false;
        }, 3000);
      },
      error => {
        console.log(error);
        this.url = ""; //for clear field
        this.btnLoading = false;
        this.btnDisabled = false;
        this.status = "Sorry, there is a problem, try again.";
      }
    );
  }

  removeLink(id: String) {
    this.apiService.removeUrl(id).subscribe(
      res => {
        this.getStatics();
        this.getUserLinks();
        this.status = "Your link has been deleted.";
        this.showStatus = true;
        setTimeout(() => {
          this.showStatus = false;
        }, 2000);
      },
      error => {
        console.log(error);
        this.status = "Sorry, there is a problem, try again.";
      }
    );
  }

  showLinks() {
    this.profile = false;
    this.links = true;
  }

  showProfile() {
    this.links = false;
    this.profile = true;
  }

  nextPage() {
    if (this.userLinksData.count > this.lastItem) {
      this.firstItem = this.lastItem;
      this.lastItem = this.lastItem + 4;
      if (this.userLinksData.count - this.lastItem < 1) {
        this.showNextPage = false;
      }
      if (this.firstItem > 0) {
        this.showPrevPage = true;
      }
    }
  }

  prevPage() {
    if (this.firstItem > 0) {
      this.lastItem = this.firstItem;
      this.firstItem = this.lastItem - 4;
      if (this.firstItem < 4) {
        this.showPrevPage = false;
      }
      if (this.userLinksData.count > this.lastItem) {
        this.showNextPage = true;
      }
    }
  }

  logOutSystem() {
    this.router.navigate(["/"]);
    this.apiService.logOut();
  }
}
