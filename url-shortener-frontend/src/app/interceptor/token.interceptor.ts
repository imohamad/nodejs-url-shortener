import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';


import { LocalStorage } from '../services/local-storage.service';
import 'rxjs/add/operator/do';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private localStorage: LocalStorage, private router: Router) { }
  intercept(req, next){
 
    const tokenizedReq = req.clone({
      headers: req.headers.set(
        'Authorization', `Bearer ${this.localStorage.getToken()}`
      )
    });

    return next.handle(tokenizedReq).do(succ => {

    }, err => {
      if(err.status == 401){
        this.router.navigate(['/']); 
        localStorage.clear();
      }
    });

  }
}
