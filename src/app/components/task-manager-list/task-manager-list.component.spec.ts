import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagerListComponent } from './task-manager-list.component';

describe('TaskManagerListComponent', () => {
  let component: TaskManagerListComponent;
  let fixture: ComponentFixture<TaskManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskManagerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
