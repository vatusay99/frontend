import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICreateTasks, TaskService, Tasks } from '../../services/task.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { networkInterfaces } from 'os';
import { error, log } from 'console';

@Component({
  selector: 'app-edit-task',
  standalone: false,
  
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {

  public titleForms: string = "Formilario de edicion de tareas.";
  public btnEdit:string = "Guardar cambios";
  formularioEdit!: FormGroup;
  id:any;
  datos:any; 

  form = {
    id: 0,
    title: '',
    description: "",
    isCompleted: false,
  };

  constructor(private _taskService: TaskService, 
              private router: Router, 
              private route: ActivatedRoute 
            )
  {}

  ngOnInit(): void {
    let params:any = this.route.snapshot.params;
    this.id = params.id;
    this.hacerPeticion(this.id);
    this.formularioEdit = new FormGroup({
      title: new FormControl(
        this.form.title,  
        [
          Validators.required
        ]
      ),
      description: new FormControl(
        this.form.description,
        [
          Validators.minLength(5)
        ]
      ),
      isCompleted:new FormControl(
        this.form.isCompleted,
        [

        ]
      )      

    })
  }

  get title() { return this.formularioEdit.get('title')!;}

  hacerPeticion(id:any)
  {
    this._taskService.getTaskById(id).subscribe({
      next:data=>{
        
        this.datos = data;
        console.log({datos: this.datos});
        this.form.id = this.datos.id;
        this.form.title = this.datos.title;
        this.form.description = this.datos.description;
        this.form.isCompleted = this.datos.isCompleted;
        
      },
      error:error=>{
        console.log({error: error});
        let message = error.message;
        this.router.navigate(['/error/message']).then(()=>{
          window.location.reload();
        })
      }
    });
  }

  /* public myFormEdit: FormGroup = new FormGroup({
    title: new FormControl('titulo',[ Validators.required],[]),
    description: new FormControl('',[Validators.minLength(5)],[]),
    isCompleted: new FormControl(true,[],[]),
  }) */

  enviar(){
    
    let task = this.formularioEdit.value;
    task.id = this.id;
    task.createAt = this.datos.createAt;
 /*    console.log({task: task}); */

    this._taskService.edittask(task, this.id ).subscribe({
      next:data=>{

        Swal.fire({
          icon: 'success',
          timer: 2500,
          title: 'OK',
          text: 'la tarea se modifico con exito.'
        });

        this.formularioEdit.reset();

      },
      error:error=>{

        console.log({error: error});
        let message = error.message;
        this.router.navigate(['/error/message']).then(()=>{
          window.location.reload();
        })
        

      }
    })

  }

}
