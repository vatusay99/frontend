import { Component, OnInit } from '@angular/core';
import { TaskService, Tasks } from '../../services/task.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import e from 'express';

@Component({
  selector: 'app-task-list',
  standalone: false,
  
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  title: string = "Lista de tareas";
  TaskList: Tasks[] = [];
  filtro:boolean=false;
  loading:boolean;
  statusError?: any;
  messageError?: any;
  statusText?: any;

  constructor(private _taskService: TaskService, private router: Router){
   
    this.loading=true;


    /* this.TaskList = this._taskService.getTaskList();
    
    if(this.TaskList.length>0){ this.loading = false;} */
  
  }

  ngOnInit(): void {
    this.getList();
  } 


  filtarTareasActivas(filtro: string){
    if(filtro == "activas")
    { this.filtro = true}
    else if(filtro == "finalizadas")
    {
      this.filtro = false;
    }
    /* console.log(this.filtro); */
    this.filterIfItComplete(this.filtro);
  }

  detalles(detailTask: Tasks){
    this.router.navigate([ '/detail', detailTask.id])
  }

  getList()
  {
    /* this.loading=true;

    this.TaskList = this._taskService.getTaskList();
    console.log(this.TaskList);
    if(this.TaskList.length>0){ this.loading = false;}
    if(this.TaskList.length == 0 ) { 
      console.log(this.TaskList);
      this.loading = false;
    } */

    this._taskService.getTasks().subscribe(
        {
          next:data=>{
            /* console.log("Data: ", data); */
            this.loading=false;
            this.TaskList = data;
            
          },
          error:error=>{
            console.log("Error: ", error);
            this.statusError = error.ok;
            this.messageError = error.message;
            this.statusText = error.statusText;
            this.loading=false;
          }
        }
    );
    
  }

  filterIfItComplete(isCompleted: boolean){
    this.TaskList = this._taskService.getTaskIsComplete(isCompleted);
    if(this.TaskList.length>0){ this.loading = false;}
  }
  
  delete(id: number){
    console.log("Eliminando desde el component .ts");
    
    this._taskService.deleteTask(id)
    this.router.navigate([ '/list-task'])
  }

  Edit(item: Tasks){
    console.log({item: item})
    this.router.navigate([ '/create', item])
    

  }
}
