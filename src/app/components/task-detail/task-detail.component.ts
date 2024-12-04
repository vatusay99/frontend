import { Component, numberAttribute, Type } from '@angular/core';
import { Tasks, TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { parseArgs } from 'util';


@Component({
  selector: 'app-task-detail',
  standalone: false,
  
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {

  public titulo:string = "Detalle de la tarea";
  detalleTarea:any;
  loading:boolean;
  task: any;

  constructor(private taskService: TaskService,
     private route:ActivatedRoute,
  ){
    this.loading=true;
    this.route.params.subscribe( params =>{
      
      this.getTaskhById(params['id']);
      this.loading = false
    })
  }

  getTaskhById(id: number){
    this.task = this.taskService.getTask(id)

  }

}
