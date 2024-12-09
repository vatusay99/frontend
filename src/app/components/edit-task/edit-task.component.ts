import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-task',
  standalone: false,
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {

  public titleForms: string = "Formilario de edicion de tareas.";
  public btnEdit:string = "Guardar cambios";
  /* formularioEdit!: FormGroup; */
  id:any;
  datos:any; 
  task:any;
  public myFormEdit: FormGroup = new FormGroup({
    id: new FormControl(0,[ Validators.required],[]),
    title: new FormControl('titulo',[ Validators.required],[]),
    description: new FormControl('',[Validators.required, Validators.minLength(5)],[]),
    isCompleted: new FormControl(false,[],[]),
  })

  /* form = {
    id: 0,
    title: '',
    description: "",
    isCompleted: false,
  }; */

  
  constructor(
    private fb: FormBuilder,
    private _taskService: TaskService, 
    private router: Router, 
    private route: ActivatedRoute,
  ){ }

  ngOnInit(): void {

    this.myFormEdit = this.fb.group({
      id: [0, Validators.required],
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      isCompleted: [false, []]
    });

    let params:any = this.route.snapshot.params;
    this.id = params.id;
    this.hacerPeticion(this.id);
    this.myFormEdit.reset(this.datos);
    /* this.formularioEdit = new FormGroup({
      id: new FormControl(
        this.form.id,  
        [
          Validators.required
        ]
      ),
      title: new FormControl(
        this.form.title,  
        [
          Validators.required
        ]
      ),
      description: new FormControl(
        this.form.description,
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ),
      isCompleted:new FormControl(
        this.form.isCompleted,
      )    
    }) */
  }

  /* get id() { return this.formularioEdit.get('id')!;} */
  /* get title() { return this.formularioEdit.get('title')!;}
  get description() { return this.formularioEdit.get('description')!;}
  get isCompleted() { return this.formularioEdit.get('isCompleted')!;}
 */
  hacerPeticion(id:any)
  {
    this._taskService.getTaskById(id).subscribe({
      next:data=>{
        
        this.datos = data;
        console.log({datos: this.datos});
        return this.datos;
       /*  this.myFormEdit.id = this.
        this.myFormEdit.id( this.datos.title);
        this.myFormEdit.setValue(this.datos.description);
        this.myFormEdit.setValue(this.datos.isCompleted); 
        console.log({myform: this.myFormEdit.value}); */


        /* this.formularioEdit.value.title = this.datos.title;
        this.formularioEdit.value.description = this.datos.description;
        this.formularioEdit.value.isCompleted = this.datos.isCompleted;
        this.formularioEdit.value.id = this.datos.id; */
        
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
    
    console.log(this.myFormEdit.value);
    /* if(this.myFormEdit.invalid) return 'disable'; */
    let task = this.myFormEdit.value;
    task.id = this.id;
    /*
    task.createAt = this.datos.createAt;
    console.log({task: this.formularioEdit.value.title});
    console.log({id: this.formularioEdit.value.id}); */

    this._taskService.edittask(task, this.id ).subscribe({
      next:data=>{

        Swal.fire({
          icon: 'success',
          timer: 2500,
          title: 'OK',
          text: 'la tarea se modifico con exito.'
        });
        
        this.myFormEdit.reset();
        setTimeout(()=>{
          this.router.navigate(['/list-task']).then(()=>{
            window.location.reload();
          })

        },2300)

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

  isValidFile(field: string){
    return this.myFormEdit.controls[field].errors 
    && this.myFormEdit.controls[field].touched;
  }

}
