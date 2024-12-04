import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HomeComponent } from './components/home/home.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "list-task", component: TaskListComponent },
  { path: "create", component: TaskFormComponent },
  { path: "detail/:id", component: TaskDetailComponent },
  { path: "**", pathMatch:"full", redirectTo:"home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
