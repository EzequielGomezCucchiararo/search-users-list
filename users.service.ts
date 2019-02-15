import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restangular } from 'ngx-restangular';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private Users = this.restangular.all('users');

  constructor(
    private restangular: Restangular,
    private oAuthService: OAuthService
  ) { }

  getUsers(options: any): Observable<any[]> {
    return this.Users.getList(options, { 'Authorization': `Bearer ${this.oAuthService.getAccessToken()}` });
  }
}
