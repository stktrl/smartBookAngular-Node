import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebookinformationComponent } from './updatebookinformation.component';

describe('UpdatebookinformationComponent', () => {
  let component: UpdatebookinformationComponent;
  let fixture: ComponentFixture<UpdatebookinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatebookinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatebookinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
