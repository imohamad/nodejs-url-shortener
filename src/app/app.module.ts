import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ApiService } from "./services/api.service";
import { LocalStorage } from "./services/local-storage.service";
import { TitleService } from "./services/title.service";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CutTextPipe } from "./limit-text.pipe";
import { AppRoutingModule } from "./app-routing.module";
import { AuthGuard } from "./guards/auth.guard";
import { TokenInterceptor } from "./interceptor/token.interceptor";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CutTextPipe,
    DashboardComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    ApiService,
    LocalStorage,
    TitleService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
