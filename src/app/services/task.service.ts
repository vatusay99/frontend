import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    datos: Tasks[] = [
        {
            id: 1,
            title: "titulo uno",
            description: "Descripcion uno",
            isCompleted: false,
            createAt: new Date(),
        },
        {
            id: 2,
            title: "titulo dos",
            description: "Descripcion dos",
            isCompleted: true,
            createAt: new Date(),
        },
        {
            id: 3,
            title: "titulo tres",
            description: "Descripcion tres",
            isCompleted: true,
            createAt: new Date(),
        },
    ];

    constructor(){
        console.log("Servicio listo para usarse"); 
    }

    getTaskList():Tasks[]{
        return this.datos;
    }

    getTask(id: number){
        /* if(id < 0 || typeof id !== 'number') return "no encontrado"; */
        return this.datos.filter(d=> d.id == id);
    }
}


export interface Tasks {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createAt?: Date;
}