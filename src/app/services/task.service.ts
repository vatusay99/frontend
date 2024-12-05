import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private urlRequest:string ="http://localhost:5130/api/Tarea";
    TaskList: Tasks[] = [];
    private TaskId: any[]=[];


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
    }

    getTaskList():Tasks[]{
        this.http.get(this.urlRequest+"s")
            .subscribe( (data: any) => {
                this.TaskList = data
            })
        return this.TaskList;
    }

    getTask(id: number):any{
        this.http.get(`http://localhost:5130/api/Tareas/${id}`).subscribe((data:any)=>{
            this.TaskId = data
        })
        return this.TaskId;
    }

    createTask(task: ICreateTasks): Observable<any> 
    { 
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const body = JSON.stringify(task); 
        return this.http.post(this.urlRequest, body, { headers })
        
    }
}


export interface Tasks {
    id: number;
    title: string;
    description: string;
    IsCompleted: boolean;
    createAt?: Date;
}

export interface ICreateTasks {
    title: string;
    description: string;
    IsCompleted: boolean;
}