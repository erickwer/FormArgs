import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseComponent } from './pages/exercise/exercise.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';


const routes: Routes = [
  {
    path: 'exercise/:argument_id',
    component: ExerciseComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'get-started',
    component: GetStartedComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
