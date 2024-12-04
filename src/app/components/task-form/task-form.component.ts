import { Component } from '@angular/core';

@Component({
  selector: 'app-task-form',
  standalone: false,
  
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  public title: string = "Fromulario creacion nueva tareas";
  btnName: string = "Crear tarea";
}
