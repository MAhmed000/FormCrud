import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { Expense } from '../Models/Expense';

@Component({
  selector: 'app-model-box',
  templateUrl: './model-box.component.html',
  styleUrls: ['./model-box.component.css']
})
export class ModelBoxComponent implements OnInit{
  @Input() employeeId:any;
  @Output() close:EventEmitter<boolean>=new EventEmitter<boolean>();

  constructor(private service:EmployeeService) {
    
  }
  
  CloseModel(){
    this.close.emit(false);
  }

  ngOnInit(): void {
    this.getExpenses();
  }

  expenseList:any[]=[];

  getExpenses(){
    this.service.getExpenseById(this.employeeId).subscribe({
      next:(data:any)=>{
        this.expenseList=data.Result;
      }
    })
  }
}
