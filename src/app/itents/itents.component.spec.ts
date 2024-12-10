import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItentsComponent } from './itents.component';

describe('ItentsComponent', () => {
  let component: ItentsComponent;
  let fixture: ComponentFixture<ItentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
