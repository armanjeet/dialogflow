import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentflowComponent } from './agentflow.component';

describe('AgentflowComponent', () => {
  let component: AgentflowComponent;
  let fixture: ComponentFixture<AgentflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
