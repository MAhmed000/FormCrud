import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEmployeeDataTDComponent } from './Components/all-employee-data-td/all-employee-data-td.component';
import { AllEmployeeDataRFComponent } from './Components/all-employee-data-rf/all-employee-data-rf.component';
import { AddNewEmpTdComponent } from './Components/add-new-emp-td/add-new-emp-td.component';
import { AddNewEmpRfComponent } from './Components/add-new-emp-rf/add-new-emp-rf.component';

const routes: Routes = [
  {path:"",component:AllEmployeeDataTDComponent},
  {path:"emp-list-td",component:AllEmployeeDataTDComponent},
  {path:"emp-list-rf",component:AllEmployeeDataRFComponent},
  {path:"add-emp-td",component:AddNewEmpTdComponent},
  {path:"add-emp-rf",component:AddNewEmpRfComponent},
  {path:"edit-emp-td/:id",component:AddNewEmpTdComponent},
  {path:"edit-emp-rf/:id",component:AddNewEmpRfComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
