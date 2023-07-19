import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllEmployeeDataRFComponent } from './Components/all-employee-data-rf/all-employee-data-rf.component';
import { AllEmployeeDataTDComponent } from './Components/all-employee-data-td/all-employee-data-td.component';
import { HttpClientModule } from '@angular/common/http';
import { ModelBoxComponent } from './model-box/model-box.component';
import { AddNewEmpTdComponent } from './Components/add-new-emp-td/add-new-emp-td.component';
import { AddNewEmpRfComponent } from './Components/add-new-emp-rf/add-new-emp-rf.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AllEmployeeDataRFComponent,
    AllEmployeeDataTDComponent,
    ModelBoxComponent,
    AddNewEmpTdComponent,
    AddNewEmpRfComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
