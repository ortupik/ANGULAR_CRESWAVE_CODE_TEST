import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskForm!: FormGroup;
  task!: Task;

  loadingTasks = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadingTasks = true;
    const taskId = this.route.snapshot.paramMap.get('id');
    this.taskService.getTaskById(taskId+"")
      .subscribe(task => {
        this.task = task;
        this.taskForm.patchValue(task);
        this.loadingTasks = false;
      });
  }

  private initForm() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: [false],
      id: ['', Validators.required],
      dueDate: [new Date],
      important: [false]
    });
  }

  saveTask() {
    if (this.taskForm.invalid) {
      return;
    }
    this.loadingTasks = true;
    const updatedTask = this.taskForm.value as Task;
    this.taskService.updateTask(updatedTask)
      .subscribe(() => {
        this.router.navigate(['']);
        this.loadingTasks = false;
        this.snackBar.open('Task updated successfully!', 'Close', { duration: 3000 });
      });
  }

  cancel() {
    this.loadingTasks = false;
    this.router.navigate(['']);
  }
}
