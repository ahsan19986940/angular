import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map, filter, scan } from 'rxjs/operators';
import { user } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken: any;
  constructor(private http: HttpClient, private router:Router, private toastr: ToastrService) { }
  getToken(){
    return !!localStorage.getItem('id_token');
  }
  changepassword(data){
    let headers = new HttpHeaders();
    headers.append('content-Type', 'application/json');
    return this.http.put('user/changepassword', data, { headers: headers });
  }
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    localStorage.removeItem('userId')
    localStorage.removeItem('fullname')
    localStorage.removeItem('role')
    localStorage.removeItem('isLoggedIn')
    
    this.toastr.success("You have successfully Logged Out");
    
    this.router.navigate(['/']); 
  }
  login(user) {
    let headers = new HttpHeaders();
    headers.append('content-Type', 'application/json');
    return this.http.post('user/login', user, { headers: headers });
  }
  updateLocation(data){
    let headers = new HttpHeaders();
    headers.append('content-Type', 'application/json');
    return this.http.put('user/addLocation', data, { headers: headers });
  }
  getAllUser(){
    return this.http.get('user/getUsers');
  }
  getUserById(id){
    return this.http.get('user/getUserById/' + id);
  }
  addUser(data){
    let headers = new HttpHeaders();
    headers.append('content-Type', 'application/json');
    return this.http.post('user/addUser', data, { headers: headers });
  }
  getUsername(){
    return this.http.get('user/getUsername');
  }
}