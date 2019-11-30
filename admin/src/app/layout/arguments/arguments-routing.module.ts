import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArgumentsComponent } from './arguments.component';
import { CreateArgumentsComponent } from './create-argument/create-argument.component';
import { ViewArgumentComponent } from './view-argument/view-argument.component';
import { CreatePremiseComponent } from './create-premisse/create-premise.component';

const routes: Routes = [
  {
    path: '', component: ArgumentsComponent
  },
  {
    path: 'create', component: CreateArgumentsComponent
  },
  {
    path: 'view/:id', component: ViewArgumentComponent
  },
  {
    path: 'view/:id/premise', component: CreatePremiseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArgumentsRoutingModule {
}
