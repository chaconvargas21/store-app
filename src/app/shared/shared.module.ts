import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatDialogModule,
    MatStepperModule
  ]
})
export class SharedModule { }
