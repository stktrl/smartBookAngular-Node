import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentbooklistComponent } from './rentbooklist.component';

describe('RentbooklistComponent', () => {
  let component: RentbooklistComponent;
  let fixture: ComponentFixture<RentbooklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentbooklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentbooklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
