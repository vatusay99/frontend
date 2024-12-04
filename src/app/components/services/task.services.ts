import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Tasks } from '../interfsces/task.interface';


@Injectable({providedIn: 'root'})
export class TasksService {

  private apiUrl = 'http://localhost:5130/api/Tarea'; // URL del backend


  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'s');
  }

  getTaskById(id: number): Observable<Tasks>{
    return this.http.get<Tasks>(`${this.apiUrl}/${id}`);
  }

  addTask(task: Tasks): Observable<Tasks>{
    return this.http.post<Tasks>(this.apiUrl, task);
  }

  UpdateTask(task: Tasks): Observable<Tasks>{
    if(!task.id) throw Error("Task id is required");
    return this.http.post<Tasks>(`${this.apiUrl}/${task.id}`, task);
  }
  

  deleteTask(id: number): Observable<boolean>{
    return this.http.delete(`${this.apiUrl}/${id}`)
        .pipe(
            catchError( err => of(false)),
            map(resp => true)
        )
  }
}