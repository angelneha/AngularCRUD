import { Injectable } from '@angular/core';
import {HttpClient,HttpClientModule} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http:HttpClient) { }

  postUser(data: any){
    return this.http.post<any>("https://627344e36b04786a0903a375.mockapi.io/students/",data)
  }
  getUser(){
    return this.http.get<any>("https://627344e36b04786a0903a375.mockapi.io/students")
  }
  deleteUser(id:number){
    return this.http.delete<any>("https://627344e36b04786a0903a375.mockapi.io/students/"+id)
  }
  updateUser(data:any,id:number){
    return this.http.put<any>("https://627344e36b04786a0903a375.mockapi.io/students/"+id,data)
  }
}
