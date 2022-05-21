import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {ServicesService} from '../services.service';
import {UserModel} from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  userModelObj:UserModel=new UserModel();
  userData:any=[];
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,private api:ServicesService) { }
  getUser(){
    this.api.getUser().subscribe(res=>{
      this.userData=res;
      console.log(this.userData);
    },
    err=>{
      console.log(err)
    })
  }
  deleteUser(user:any){
    this.api.deleteUser(user.id).subscribe(res=>{
      this.getUser()
      alert("user Deleted")
    },
    err=>{
      alert("Error Detected")
    })
  }
  clickAddUser(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postUserDetails(){
    this.userModelObj.FirstName=this.formValue.value.FirstName;
    this.userModelObj.LastName=this.formValue.value.LastName;
    this.userModelObj.Email=this.formValue.value.Email;
    this.userModelObj.PhoneNo=this.formValue.value.PhoneNo;
    this.userModelObj.Salary=this.formValue.value.Salary;
  

    this.api.postUser(this.userModelObj).subscribe(res=>{
      console.log(res);
      alert("Done");
      this.formValue.reset();
      let canc=document.getElementById("cancel");
      canc?.click();
      this.getUser();
    },
    err=>{
      alert("Error Detected")
    })
  }
  postData(user:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id=user.id;
    this.formValue.controls['FirstName'].setValue(user.FirstName)
    this.formValue.controls['LastName'].setValue(user.LastName)
    this.formValue.controls['Email'].setValue(user.Email)
    this.formValue.controls['PhoneNo'].setValue(user.PhoneNo)
    this.formValue.controls['Salary'].setValue(user.Salary)
    
  }
  updateUserDetails(){
    this.userModelObj.FirstName=this.formValue.value.FirstName;
    this.userModelObj.LastName=this.formValue.value.LastName;
    this.userModelObj.Email=this.formValue.value.Email;
    this.userModelObj.PhoneNo=this.formValue.value.PhoneNo;
    this.userModelObj.Salary=this.formValue.value.Salary;
    this.api.updateUser(this.userModelObj,this.userModelObj.id).subscribe(res=>{
      alert("user updated");
      let canc=document.getElementById("cancel");
      canc?.click()
      this.getUser();
    },
    err=>{
      alert("Error Detected")
    })
  }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      FirstName:[''],
      LastName:[''],
      Email:[''],
      PhoneNo:[''],
      Salary:[''],
      
    })
    this.getUser();
  }

}
