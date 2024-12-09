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
    private respCreate: Observable<Tasks>=new Observable();

    headers1 = new HttpHeaders({ 
        'content-type': 'application/json',
        'accept': 'text/plain'
     });

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

    // la metodo que se esta utilizando en la ultima version
    getTasks():Observable<any>{
        return this.http.get(`${this.urlRequest}s`, { headers: this.headers1});
    }

    addTask(modelo: ICreateTasks):Observable<any>
    {
        return this.http.post(`${this.urlRequest}s`, modelo ,{ headers: this.headers1});
    }
   
    getTaskById(id: any):Observable<any>{
        return this.http.get(`${this.urlRequest}s/${id}`, {headers: this.headers1});
    }

    edittask(modelo: ICreateTasks, id: number):Observable<any>{
        return this.http.put(`${this.urlRequest}s/${id}`, modelo ,{ headers: this.headers1});
    }

    getTaskIsComplete(isCompleted: boolean):Observable<any>{
        return this.http.get(`${this.urlRequest}s/GetIsCompleted/${isCompleted}`)

    }

    deleteTask(id:number): Observable<any>{
        return this.http.delete(`${this.urlRequest}s/${id}`)
    }
}


export interface Tasks {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    createAt?: Date;
}

export interface ICreateTasks {
    title: string;
    description: string;
    isCompleted: boolean;
}