import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  @Input() taskList: Task[] = [];
  displayedColumns = ['title', 'description', 'status', 'actions'];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
    ) {}

  ngOnInit() {
    this.loadAllTasks();
  }

  loadAllTasks() {
    this.taskService.getAllTasks()
      .pipe(
        catchError((error) => {
          console.error('Error fetching tasks:', error);
          return throwError('Failed to fetch tasks.');
        })
      )
      .subscribe(tasks => {
        this.taskList = tasks;
      });
  }

  openAddTaskModal() {
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      width: '400px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadAllTasks();
    });
  }

  markComplete(task: Task) {
    task.status = !task.status;
    this.updateTask(task);
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task)
      .pipe(
        catchError((error) => {
          console.error('Error updating task:', error);
          return throwError('Failed to update task.');
        })
      )
      .subscribe();
  }

  deleteTask(task: Task) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(task.id)
        .pipe(
          catchError((error) => {
            console.error('Error deleting task:', error);
            return throwError('Failed to delete task.');
          })
        )
        .subscribe(() => {
          // Remove the task from the taskList array
          this.taskList = this.taskList.filter(t => t.id !== task.id);
        });
    }
  }
}
 