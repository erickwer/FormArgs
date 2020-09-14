import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArgumentsRoutingModule } from './arguments-routing.module';
import { ArgumentsComponent } from './arguments.component';
import { PageHeaderModule } from './../../shared';
import { CreateArgumentsComponent } from './create-argument/create-argument.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewArgumentComponent } from './view-argument/view-argument.component';
import { CreatePremiseComponent } from './create-premisse/create-premise.component';
import { SendArgumentComponent } from './send-argument/send-argument.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArgumentsRoutingModule,
    PageHeaderModule
  ],
  declarations: [
    ArgumentsComponent,
    CreateArgumentsComponent,
    ViewArgumentComponent,
    CreatePremiseComponent,
    SendArgumentComponent
  ]
})
export class ArgumentsModule { }
