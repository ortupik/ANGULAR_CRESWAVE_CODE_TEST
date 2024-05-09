import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent {
  task: Task = {
    title: '',
    description: '',
    status: false,
    id: Math.random()*1000+"",
    dueDate: new Date,
    important: false
  };

  constructor(
    public dialogRef: MatDialogRef<AddTaskModalComponent>,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  saveTask() {
    this.taskService.addTask(this.task)
      .subscribe(() => {
        this.dialogRef.close();
        this.snackBar.open('Task added successfully!', 'Close', { duration: 3000 });
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
