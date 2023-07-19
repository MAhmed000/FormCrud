import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Models/Employee';
import { Expense } from 'src/app/Models/Expense';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-new-emp-td',
  templateUrl: './add-new-emp-td.component.html',
  styleUrls: ['./add-new-emp-td.component.css']
})
export class AddNewEmpTdComponent implements OnInit{

  constructor(private service:EmployeeService,private ActivatedRoute:ActivatedRoute,private router:Router){}
  genderList:any[]=[];
  typesList:any[]=[];
  addEditBtn:string="Add Employee";

  ngOnInit(): void {
    var id=this.ActivatedRoute.snapshot.params['id'];
    if(id){
      this.getSingleEmployee(id);
      this.getAllGender();
      this.addEditBtn="Edit Employee"
    }else{
      this.getAllGender();
      this.AddNewExpense();
    }
  }
  count:number=0;
  employee:Employee={
    EmployeeId: '00000000-0000-0000-0000-00000000000' + this.count.toString(),
    EmployeeName: '',
    Contact: '',
    Address: '',
    GenderId: '',
    expenses: [],
    Gender: {GenderId:'',Gender:''}
  }

  getAllGender(){
    this.service.getAllGender().subscribe((data:any)=>{
      this.genderList=data.Result;
      console.log(this.genderList)
    })

    // Get All Types
    this.service.getAllTypes().subscribe({
      next:(value:any)=>{
        this.typesList=value.Result;
      }
    })
  }

  AddNewExpense(){
    this.count++;
    this.employee.expenses.push({
      ExpenseId: '00000000-0000-0000-0000-00000000000'+this.count.toString(),
      ExpenseName: '',
      TypeId: '',
      Date: '',
      Cost: 0,
      EmployeeId: this.employee.EmployeeId
    })
  }
  DeleteItem(expense:Expense){
    this.employee.expenses=this.employee.expenses.filter(x=>{
      return x.ExpenseId!=expense.ExpenseId
    })
    this.totalCost=this.totalCost-expense.Cost;
  }

  getSingleEmployee(id:any){
    this.service.getSingleEmployee(id).subscribe({
      next:(value:any)=>{
        var emp=value.Result;
        this.employee=value.Result;
        this.employee.expenses=emp.ExpenseTbls;
        this.totalCost=0;
        this.employee.expenses.forEach(x=>{
          x.Date=x.Date.substring(0,10).toString();
          this.totalCost+=x.Cost;
        })
      }
    })
  }


  totalCost:number=0;

  TotalCost(e:any){
    this.totalCost=0;
    e.forEach((element:any) => {
      this.totalCost=this.totalCost+element.Cost;
    });
    return this.totalCost;
  }

  

  Submit(e:NgForm){
    if(e.valid){
      this.employee.GenderId=this.employee.Gender.GenderId;
      if(this.addEditBtn=="Add Employee"){
        this.service.AddNewEmployee(this.employee).subscribe({
          next:(val:any)=>{
            alert(val.Result);
            e.reset();
            this.router.navigateByUrl("emp-list-td");
          },error:(err)=>{
            console.log(err);
          }
        })
      }else{
        this.service.EditEmployee(this.employee).subscribe({
          next:(result:any)=>{
            alert(result.Result);
            this.router.navigateByUrl("emp-list-td");
          },error:(err)=>{
            console.log(err);
          }
        })
      }
    }
  }
}
