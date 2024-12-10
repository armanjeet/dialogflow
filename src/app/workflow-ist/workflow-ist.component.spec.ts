import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowIstComponent } from './workflow-ist.component';

describe('WorkflowIstComponent', () => {
  let component: WorkflowIstComponent;
  let fixture: ComponentFixture<WorkflowIstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkflowIstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowIstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
