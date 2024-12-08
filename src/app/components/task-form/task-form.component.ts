import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICreateTasks, TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {

  task: Observable<any>= new Observable();
  loading:boolean = false;
  editItem?: any;

  public title: string = "Fromulario creacion nueva tareas";
  btnName: string = "Crear tarea";
  tarea = {
    id: 0,
    title: '',
    description: "",
    isCompleted: false,  
  };

  public myForm: FormGroup = new FormGroup({
    title: new FormControl('titulo',[ Validators.required],[]),
    description: new FormControl('',[Validators.minLength(5)],[]),
    isCompleted: new FormControl(true,[],[]),
  })


  /* public myForm: FormGroup = this.fb.group({

    title:[''],
    description:[''],
    isCompleted:[false],

  }); */
  constructor(private fb: FormBuilder, private _taskService: TaskService,
              private router: Router, private activatedRoute:ActivatedRoute,
  ){
    this.activatedRoute.params.subscribe( (params) =>{
      console.log({params: params});
      this.editItem = params;
      console.log({editItem: this.editItem});
      
    });
  }

  ngOnInit(): void {
    this.myForm.reset(this.tarea)
  }

  isValidFile(field: string){
    return this.myForm.controls[field].errors 
    && this.myForm.controls[field].touched;
  }

  onSave():void{
    if( this.myForm.invalid) return;
    console.log(this.myForm.value);
    this.task = this._taskService.createTask(this.myForm.value);
    console.log({resp: this.task});
    this.router.navigate([ '/list-task'])
  }


  enviar()
  {
    let task: ICreateTasks = { 
      title: this.myForm.value.title,
      description: this.myForm.value.description,
      isCompleted: this.myForm.value.isCompleted
    };

    this._taskService.addTask(task).subscribe({
      next:data=>{
        /* console.log({data: data}); */

        Swal.fire({
          title: "Ok",
          timer: 2000,
          text: "Tarea creada correctamente.",
          icon: "success"
        });

        this.myForm.reset();

       /*  this.router.navigate(['/list-task']).then(()=>{
          window.location.reload();
        }) */
        
      },
      error:error=>{
        console.log({error: error});

        Swal.fire({
          title: "Ops...",
          text: "Algo salio mal!! intentelo mas tarde.",
          icon: "error"
        });
        this.router.navigate(['/home']).then(()=>{
          window.location.reload();
        })
      }
    });
  }
  


}
