import { USER_LOGIN_URL } from './../shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { IUserLogin } from './../shared/interfaces/IUserLogin';
import { User } from './../shared/models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject =
  new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>
  constructor(private http: HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
   }

   public get currentUser():User{
    return this.userSubject.value;
  }

   login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          console.log(user)
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          console.log("track here")
          this.toastrService.success(
            `Welcome to FeedU, ${user?.name}!`,
            'Login Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  
  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
