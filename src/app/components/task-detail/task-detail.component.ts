import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { parseArgs } from 'util';


@Component({
  selector: 'app-task-detail',
  standalone: false,
  
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {

  title:string = "Detalle de la tarea";
  getTaskById:any = {};

  constructor(private taskService: TaskService, private _activatedRoute:ActivatedRoute){
    this._activatedRoute.params.subscribe( params =>{
      this.getTaskById = this.taskService.getTask(params['id'])
      console.log({getById: this.getTaskById});
      
    })
  }

}
