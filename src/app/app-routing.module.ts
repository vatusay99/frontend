import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HomeComponent } from './components/home/home.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { PageErrorsComponent } from './components/page-errors/page-errors.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "list-task", component: TaskListComponent },
  { path: "create", component: TaskFormComponent },
  { path: "detail/:id", component: TaskDetailComponent },
  { path: "edit/:id", component: EditTaskComponent },
  { path: "error/:message", component: PageErrorsComponent },
  { path: "**", pathMatch:"full", redirectTo:"home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
