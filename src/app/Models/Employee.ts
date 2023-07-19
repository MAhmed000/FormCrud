import { Expense } from "./Expense";

export interface Employee{
    EmployeeId:any;
    EmployeeName:string;
    Contact:string;
    Address:string;
    GenderId:string;
    Gender:any;
    expenses:Expense[]
}