import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private urlRequest:string ="http://localhost:5130/api/Tarea";
    TaskList: Tasks[] = [];
    private TaskId: Tasks[] = [];

    /* datos: Tasks[] = [
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
    ]; */

    constructor(private http: HttpClient){
        console.log("Servicio listo para usarse"); 
    }

    getTaskList():Tasks[]{
        this.http.get(this.urlRequest+"s")
            .subscribe( (data: any) => {
                this.TaskList = data
            })
        return this.TaskList;
    }

    getTask(id: number):Tasks[]{
        /* this.http.get(this.urlRequest).subscribe((data: any) =>{
            console.log(data);
            this.TaskId = data 
        }) */

        return this.TaskId;
    }
}


export interface Tasks {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createAt?: Date;
}