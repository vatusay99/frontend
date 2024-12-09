import { Component, numberAttribute, OnInit, Type } from '@angular/core';
import { Tasks, TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { parseArgs } from 'util';
import { error, log } from 'console';


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
  task:Tasks = {
    id: 0,
    title: "",
    description: "",
    isCompleted: false,
    createAt: new Date()
  };
  id: number = 0;

  constructor(private _taskService: TaskService, 
              private router: Router,
              private route: ActivatedRoute 
  )
  {
    this.loading=true;
    console.log("iniciado TaskDetailComponent en costructor")
  }

  ngOnInit(): void {

    let params:any = this.route.snapshot.params;
    console.log({params: params});
    this.id = params.id;
    this.getTaskhById(this.id);

    
    
  }

  getTaskhById(id: number){
    if(this.id){
      this._taskService.getTaskById(id).subscribe({
        next:(data:any)=>{
          console.log({data: data});
          let fecha = data.createAt 
          this.task = data;
          
        },
        error:error=>{
          console.log({error: error});
          
          let message = error.message;
          this.router.navigate(['/error/message']).then(()=>{
            window.location.reload();
          });
        }
      })
      this.loading = false;
      
    }

  }

  goToList(){
    console.log("estoy en goto list");
    this.router.navigate([ '/list-task']);
  }

}
