import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service4Service {

  constructor() {
  }

  isauthenticated(): boolean {
    return Boolean(localStorage.getItem('jwt_token'))
  }

  settoken(token: any): void {
    localStorage.setItem('jwt_token', JSON.stringify(token))
  }

  gettoken(): any {
    if (this.isauthenticated()) {
      return JSON.parse(localStorage.getItem('jwt_token') as string)
    }

  }

  getcurrentuser(): any {
    if (this.isauthenticated()) {
      return JSON.parse(
        atob(this.gettoken().split('.')[1])
      )
    }
  }

}
