import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 token:string = '6297b1aa53d798ca13aaffadd6e886977420542de4e3a8011e9a1ff47615a57a';
 loading:boolean = true
  constructor(private http:HttpClient) { 

  }

  getUsers(){
    let url = 'https://gorest.co.in/public/v1/users';
    return this.http.get(url);
  }

  getUser(id:any){
    let url = `https://gorest.co.in/public/v1/users/${id}?access-token=${this.token}`;
    return this.http.get(url);
  }
}
