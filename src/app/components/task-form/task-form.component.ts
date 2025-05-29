import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() save = new EventEmitter<Task>();

  taskForm: FormGroup;
  submitted = false;
  showSuccessMessage = false;
  successMessage = 'Task created successfully!';

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      status: ['0', Validators.required],
      priority: ['0', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status.toString(),
        priority: this.task.priority.toString()
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const formValue = this.taskForm.value;
    const updatedTask: Task = {
      id: this.task?.id || 0,
      title: formValue.title,
      description: formValue.description,
      status: formValue.status,
      priority: formValue.priority,
      createdAt: this.task?.createdAt || new Date()
    };

    this.save.emit(updatedTask);
    
    // Show success message
    this.showSuccessMessage = true;
    this.successMessage = this.task?.id ? 'Task updated successfully!' : 'Task created successfully!';
    
    // Hide message after 3 seconds
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);

    this.taskForm.reset({ status: '0', priority: '0' });
    this.submitted = false;
  }

  get f() { return this.taskForm.controls; }
}