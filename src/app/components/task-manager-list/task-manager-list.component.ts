import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-manager-list',
  standalone: false,
  templateUrl: './task-manager-list.component.html',
  styleUrls: ['./task-manager-list.component.scss']
})
export class TaskManagerListComponent {
  @Input() tasks: Task[] = [];
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();

  // Pagination variables
  currentPage = 1;
  itemsPerPage = 5;

  // Safe reference to Math
  readonly Math = Math;

  get paginatedTasks(): Task[] {
    if (!this.tasks) return [];
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tasks.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return this.tasks ? Math.ceil(this.tasks.length / this.itemsPerPage) : 0;
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getDisplayRange(): string {
    if (!this.tasks || this.tasks.length === 0) return 'No tasks found';
    
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.tasks.length);
    return `Showing ${start} to ${end} of ${this.tasks.length} tasks`;
  }

  onEdit(task: Task) {
    this.editTask.emit(task);
  }

  onDelete(id: number) {
    this.deleteTask.emit(id);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}