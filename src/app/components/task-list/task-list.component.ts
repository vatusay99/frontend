import { Component } from '@angular/core';
import { TaskService, Tasks } from '../../services/task.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private _taskService: TaskService, private router: Router){
   
    this.loading=true;

    this.TaskList = this._taskService.getTaskList();
    
    if(this.TaskList.length>0){ this.loading = false;}
  
  }

  ngOnInit(): void {
    
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

  detalles(id: number){
    this.router.navigate([ '/detail', id])
  }
  

}
