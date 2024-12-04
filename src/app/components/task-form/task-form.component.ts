import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: false,
  
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {

  public title: string = "Fromulario creacion nueva tareas";
  btnName: string = "Crear tarea";
  tarea = {
    title: '',
    description: "XXXXX",
    isCompleted: false,  
  };

  public myForm: FormGroup = new FormGroup({
    title: new FormControl('titulo',[ Validators.required],[]),
    description: new FormControl('',[Validators.minLength(10)],[]),
    isCompleted: new FormControl(true,[],[]),
  })


  /* public myForm: FormGroup = this.fb.group({

    title:[''],
    description:[''],
    isCompleted:[false],

  }); */
  constructor(private fb: FormBuilder){
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
    console.log(this.myForm);
    
  }


}
