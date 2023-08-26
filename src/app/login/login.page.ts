import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { userDB } from '../data/userdb.data';
import { UserLoginInput } from './domain/user-login-input.domain';
import { UserModel, UserType } from './model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userLoginInput: UserLoginInput = {
    userEmail: '',
    userPwd: '',
  };
  public showLoginError: boolean = false;
  public showInputError: boolean = false;

  constructor(private router: Router) {
    this.clearLoginCredentials();
  }

  ngOnInit() {}

  clearLoginCredentials() {
    this.userLoginInput.userEmail = '';
    this.userLoginInput.userPwd = '';
  }

  doLogin(loginCredentials: UserLoginInput): UserModel | void {
    if (loginCredentials?.userEmail && loginCredentials.userPwd) {
      this.showInputError = false;
      const loginResult: UserModel[] | [] = userDB.filter(
        (user) =>
          user.email === loginCredentials.userEmail &&
          user.password === loginCredentials.userPwd
      );
      if (loginResult.length < 1) {
        this.showLoginError = true;
        return;
      }

      this.showLoginError = false;
      this.doAuthorize(loginResult[0]);
    }
    this.showInputError = true;
  }

  doAuthorize(userInfo: UserModel) {
    const userInfoState: NavigationExtras = {
      state: {
        userInfo,
      },
    };

    return userInfo.user_type === UserType.ADMIN
      ? this.router.navigate(['/admin/productlist'], userInfoState)
      : this.router.navigate(['/user'], userInfoState);
  }
}
