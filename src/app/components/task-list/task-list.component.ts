import { Component } from '@angular/core';
import { TaskService, Tasks } from '../../services/task.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-list',
  standalone: false,
  
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  title: string = "Lista de tareas";
  TaskList: Tasks[] = [];
  filtro:boolean=false;
  loading:boolean;
  private urlRequest:string ="http://localhost:5130/api/Tareas";

  constructor(private _taskService: TaskService, private http: HttpClient){
   
    this.loading=true;

    this.TaskList = this._taskService.getTaskList();
    if(this.TaskList.length>0){ this.loading = false;}
  
  }

  ngOnInit(): void {
    // Obtener los datos del backend cuando el componente se inicialice
    /* this.tasksService.obtenerDatos().subscribe((response) => {
      console.log({ response: response})
      this.datos = response;

      console.log(this.datos);  
    }); */

    /* this.TaskList = this._taskService.getTaskList(); */
  } 


  filtarTareasActivas(filtro: string){
    if(filtro == "activas")
    { this.filtro = false}
    else if(filtro == "finalizadas")
    {
      this.filtro = true;
    }
    console.log(this.filtro);
    
  }
  

}
