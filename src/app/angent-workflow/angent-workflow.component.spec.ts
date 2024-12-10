import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngentWorkflowComponent } from './angent-workflow.component';

describe('AngentWorkflowComponent', () => {
  let component: AngentWorkflowComponent;
  let fixture: ComponentFixture<AngentWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngentWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngentWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
