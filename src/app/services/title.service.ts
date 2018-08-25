import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class TitleService {
  constructor(private titleService: Title) {}

  setPageTitle(title: string) {
    return this.titleService.setTitle(title);
  }
}
