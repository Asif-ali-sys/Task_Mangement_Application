import { Component, OnInit } from '@angular/core';
import { Task } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone : false,
  template: `
    <div class="container mt-4">
      <app-task-form [task]="selectedTask" (save)="onSave($event)"></app-task-form>
      <app-task-manager-list [tasks]="tasks" (editTask)="onEdit($event)" (deleteTask)="onDelete($event)"></app-task-manager-list>
    </div>
  `
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
  }

  onSave(task: Task) {
    if (task.id) {
      this.taskService.updateTask(task).subscribe(() => this.getTasks());
    } else {
      this.taskService.addTask(task).subscribe(() => this.getTasks());
    }
    this.selectedTask = null;
  }

  onEdit(task: Task) {
    this.selectedTask = { ...task };
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => this.getTasks());
    }
  }
}
