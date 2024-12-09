import { Component, numberAttribute, OnInit, Type } from '@angular/core';
import { Tasks, TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { parseArgs } from 'util';


@Component({
  selector: 'app-task-detail',
  standalone: false,
  
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit  {

  public titulo:string = "Detalle de la tarea";
  detalleTarea:any;
  loading:boolean;
  task: any;
  id: number = 0;

  constructor(private taskService: TaskService, 
              private router: Router
  )
  {
    this.loading=true;
    console.log("iniciado TaskDetailComponent en costructor")
  }

  ngOnInit(): void {
    console.log("Iniciado ngOninit");
    
    
  }

  getTaskhById(id: number){
    /* this.task = this.taskService.getTask(id); */
    if(this.task.id){
      console.log({task: this.task});
      this.loading = false;
      
    }

  }

  goToList(){
    console.log("estoy en goto list");
    this.router.navigate([ '/list-task']);
  }

}
