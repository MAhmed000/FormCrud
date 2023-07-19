import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../Models/Expense';
import { Employee } from '../Models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  BASE_URL:string="https://localhost:7104/api/Employee/";

  constructor(private http:HttpClient) { }

  getAllEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.BASE_URL+"GetAllEmployee");
  }

  getExpenseById(id:any):Observable<Expense[]>
  {
    return this.http.get<Expense[]>(this.BASE_URL+"GetExpense/"+id);
  }

  deleteEmployee(id:any){
    return this.http.delete(this.BASE_URL+id);
  }

  getAllGender():Observable<any[]>{
    return this.http.get<any[]>(this.BASE_URL+"GetAllGenders");
  }

  getAllTypes():Observable<any[]>{
    return this.http.get<any[]>(this.BASE_URL+"GetAllTypes");
  }

  getSingleEmployee(id:any):Observable<Employee>{
    return this.http.get<Employee>(this.BASE_URL+"GetEmployeeById/"+id);
  } 

  AddNewEmployee(val:Employee):Observable<Employee>{
    return this.http.post<Employee>(this.BASE_URL+"AddNewEmployee",val);
  }

  EditEmployee(data:Employee){
   return this.http.put(`${this.BASE_URL}UpdteEmployee`,data); 
  }

}
