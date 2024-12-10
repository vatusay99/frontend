import { Component, OnInit } from '@angular/core';
import { TaskService, Tasks } from '../../services/task.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { error, log } from 'console';

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
    { this.filtro = false}
    else if(filtro == "finalizadas")
    {
      this.filtro = true;
    }
    this.filterIfItComplete(this.filtro); 
  }

  detalles(detailTask: Tasks){
    this.router.navigate([ '/detail', detailTask.id])
  }

  getList()
  {
    this._taskService.getTasks().subscribe(
        {
          next:data=>{
            this.loading=false;
            this.TaskList = data;
            
          },
          error:error=>{
            console.log("Error: ", error);
            this.statusError = error.ok;
            this.messageError = error.message;
            this.statusText = error.statusText;
            this.loading=false;

            this.router.navigate(['/error/:message']).then(()=>{
              window.location.reload();
            })
            
          }
        }
    );
    
  }

  filterIfItComplete(isCompleted: boolean){
    this._taskService.getTaskIsComplete(isCompleted).subscribe({
      next:data=>{
        this.TaskList = data;

        if(this.TaskList.length>=0){ this.loading = false;}

      },
      error: error=>
      {
        console.log("Error: ", error);
        this.statusError = error.ok;
        this.messageError = error.message;
        this.statusText = error.statusText;
        this.loading=false;

        Swal.fire({
          title: "Ops...",
          text: "Algo salio mal!! intentelo mas tarde.",
          icon: "error"
        });
          
        this.router.navigate(['error/fallo de filtro.']).then(()=>{
          window.location.reload();
        })
      }
    })
  }
  
  delete(id: any){
    console.log("Eliminando desde el component .ts");
    this._taskService.deleteTask(id).subscribe({
      next:resp=>{
        console.log({resp: resp});

        Swal.fire({
          title: "¿Atencion se eliminara tarea?",
          text: "esta seguro de querer eliminar esta tarea!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, Eliminar Tarea!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Eliminado!",
              text: "La tarea fue eliminada con exito.",
              icon: "success"
            });

            this.router.navigate(['error/Algo salio mal!! intentelo mas tarde.']).then(()=>{
              window.location.reload();
            })
          }

        });

        

      },
      error:error=>{
        console.log("Error: ", error);
        this.statusError = error.ok;
        this.messageError = error.message;
        this.statusText = error.statusText;
        this.loading=false;

        Swal.fire({
          title: "Ops...",
          text: "Algo salio mal!! intentelo mas tarde.",
          icon: "error"
        });
          
        this.router.navigate(['error/Algo salio mal!! intentelo mas tarde.']).then(()=>{
          window.location.reload();
        })
      }
    })
    /* this.router.navigate([ '/list-task']) */
  }

  Edit(item: Tasks){
    console.log({item: item})
    this.router.navigate([ '/create', item])
    

  }
}
