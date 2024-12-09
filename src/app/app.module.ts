import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import  { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch  } from '@angular/common/http';


//services
import { TaskService } from './services/task.service';

// rutas
import { AppRoutingModule } from './app-routing.module';
// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { RouterModule } from '@angular/router';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { PageErrorsComponent } from './components/page-errors/page-errors.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskDetailComponent,
    LoadingComponent,
    EditTaskComponent,
    PageErrorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    TaskService,
    HttpClient,
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
