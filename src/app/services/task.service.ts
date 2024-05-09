import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private httpClient: HttpClient, private config: ConfigService) {}

  addTask(task: Task): Observable<Task> {
    if (!task.title.trim()) {
      return throwError('Task title cannot be empty');
    }
    return this.httpClient.post<Task>(`${this.config.apiBaseUrl}/tasks`, task)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(`Failed to add task: ${error.message}`))
      );
  }

  getTaskById(id: string): Observable<Task> {
    return this.httpClient.get<Task>(`${this.config.apiBaseUrl}/tasks/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(`Failed to fetch task: ${error.message}`))
      );
  }
  
  getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.config.apiBaseUrl}/tasks`)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(`Failed to fetch tasks: ${error.message}`))
      );
  }

  updateTask(task: Task): Observable<Task> {
    if (!task.id || typeof task.id !== 'string') {
      return throwError('Invalid task ID for update.');
    }
    return this.httpClient.put<Task>(`${this.config.apiBaseUrl}/tasks/${task.id}`, task)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(`Failed to update task: ${error.message}`))
      );
  }

  deleteTask(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.config.apiBaseUrl}/tasks/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(`Failed to delete task: ${error.message}`))
      );
  }
}
