import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-add-new-emp-rf',
  templateUrl: './add-new-emp-rf.component.html',
  styleUrls: ['./add-new-emp-rf.component.css']
})
export class AddNewEmpRfComponent implements OnInit,OnDestroy{
  ButtonValue:string="Add Employee";
  genderList:any;
  typeList:any;
  genderSubscription!:Subscription;
  typeSubscription!:Subscription;
  singleEmployeeSubscription!:Subscription;
  id:any;
  constructor(private fb:FormBuilder,private router:Router,private activeRoute:ActivatedRoute,private service:EmployeeService){}

  ngOnInit(): void {
    // Get Id 
      this.id=this.activeRoute.snapshot.params['id'];      
      if(this.id!=null){
        this.getSingleEmployee();
        this.ButtonValue="Edit Employee";
      }else{
      this.AddNewExpense();
      }
    //
    this.getAllTypeAndGender();
    
  }

  ngOnDestroy(): void {
    this.genderSubscription.unsubscribe();
    this.typeSubscription.unsubscribe();
  }
  // Get All Types And Gender

  private getAllTypeAndGender(){
    this.genderSubscription=this.service.getAllGender().subscribe((data:any)=>{
      this.genderList=data.Result;
    })

    this.typeSubscription=this.service.getAllTypes().subscribe((data:any)=>{
      this.typeList=data.Result;
    })
  }
  // Get Single Employee

  getSingleEmployee(){
    this.singleEmployeeSubscription=this.service.getSingleEmployee(this.id).subscribe((data:any)=>{
      this.employeeForm=this.fb.group({
        EmployeeId:this.fb.control(data.Result.EmployeeId),
        EmployeeName:this.fb.control(data.Result.EmployeeName,[Validators.required,Validators.minLength(3),Validators.maxLength(14)]),
        Contact:this.fb.control(data.Result.Contact,[Validators.required,Validators.pattern(/^03\d{2}-\d{7}$/)]),
        Address:this.fb.control(data.Result.Address),
        GenderId:this.fb.control(data.Result.Gender.GenderId,[Validators.required]),
        expenses:this.fb.array([])
      })
      data.Result.ExpenseTbls.forEach((element:any) => {
        (<FormArray>this.employeeForm.get('expenses')).push(this.LoadExpense(element))
      });
    })

  }

  // Form Group
  employeeForm:FormGroup=this.fb.group({
    EmployeeId:this.fb.control('6039fec6-a952-4b71-98b4-8c8e06214172'),
    EmployeeName:this.fb.control('',[Validators.required,Validators.minLength(3),Validators.maxLength(14)]),
    Contact:this.fb.control('',[Validators.required,Validators.pattern(/^03\d{2}-\d{7}$/)]),
    Address:this.fb.control(''),
    GenderId:this.fb.control('',[Validators.required]),
    expenses:this.fb.array ([])
  })
// Add New Expense
  AddNewExpense(){
    (<FormArray>this.employeeForm.get('expenses')).push(this.GenerateExpense());
  }

  item:FormArray=(<FormArray>this.employeeForm.get('expenses'));
  // Generate Row for Expense

  GenerateExpense(){
    return this.fb.group({
      ExpenseId:this.fb.control('00000000-0000-0000-0000-000000000000'),
      ExpenseName:this.fb.control('',[Validators.required]),
      TypeId:this.fb.control('',[Validators.required]),
      Date:this.fb.control('',[Validators.required]),
      Cost:this.fb.control(0,[Validators.required]),
      EmployeeId:this.fb.control(this.employeeForm.get('EmployeeId')?.value)
    })
  }

  // Load Existing Values
  LoadExpense(x:any){
    return this.fb.group({
      ExpenseId:this.fb.control(x.ExpenseId),
      ExpenseName:this.fb.control(x.ExpenseName,[Validators.required]),
      TypeId:this.fb.control(x.TypeId,[Validators.required]),
      Date:this.fb.control(x.Date,[Validators.required]),
      Cost:this.fb.control(x.Cost,[Validators.required]),
      EmployeeId:this.fb.control(x.EmployeeId)
    })
  }

  // Get Controls of Expenses
  get expenseList(){
    return (<FormArray>this.employeeForm.get('expenses')).controls;
  }
  DeleteItem(i:any){
    (<FormArray>this.employeeForm.get('expenses')).removeAt(i);
  }

  Submit(){
    if(this.employeeForm.valid){
      if(this.ButtonValue=="Add Employee"){
          this.service.AddNewEmployee(this.employeeForm.value).subscribe({
            next:(data:any)=>{
              alert(data.Result)
              this.employeeForm.reset();
              this.router.navigate(['emp-list-rf']);
            }
          })
      }else{
        console.log(this.employeeForm.value);
        
        this.service.EditEmployee(this.employeeForm.value).subscribe((res:any)=>{
          alert(res.Result);
        })
      }
    }
  }

}

