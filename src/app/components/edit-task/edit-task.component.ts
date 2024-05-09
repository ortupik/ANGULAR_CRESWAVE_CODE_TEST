import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    status: false,
    id: "",
    dueDate: new Date,
    important: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    this.taskService.getTaskById(taskId+"")
      .subscribe(task => {
        this.task = task;
      });
  }

  saveTask() {
    this.taskService.updateTask(this.task)
      .subscribe(() => {
        this.router.navigate(['']);
        this.snackBar.open('Task updated successfully!', 'Close', { duration: 3000 });
      });
  }

  cancel() {
    this.router.navigate(['']);
  }
}
