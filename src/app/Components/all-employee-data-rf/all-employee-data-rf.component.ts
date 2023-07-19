import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-all-employee-data-rf',
  templateUrl: './all-employee-data-rf.component.html',
  styleUrls: ['./all-employee-data-rf.component.css']
})
export class AllEmployeeDataRFComponent implements OnInit,OnDestroy{
  
  employeeSubscription!:Subscription;

  constructor(private service:EmployeeService,private router:Router) {}

  employeeList:Employee[]=[];
  employeeId:any;
  isSuccess:boolean=false;

  ngOnInit(): void {
    this.getAllEmployee();
  }

  ngOnDestroy(): void {
    this.employeeSubscription.unsubscribe();
  }

  getAllEmployee(){
    this.employeeSubscription=this.service.getAllEmployees().subscribe({
      next:(data:any)=>{
        this.employeeList=data.Result;
      }
    })
  }

  getEmployeeId(id:any)
  {
    this.employeeId=id;
    this.isSuccess=true;
  }

  closeEmit(e:any){
    this.isSuccess=e;
  }

  deleteEmp(id:any){
    if(confirm("Are you sure you want to delete this?")){
      this.service.deleteEmployee(id).subscribe({
        next:(data:any)=>{
          if(data){
            window.alert(data.Result);
            this.getAllEmployee();
          }
        }
      })
    }
  }

  EditEmp(id:any){
    this.router.navigate(['edit-emp-rf/'+id]);
  }

}
