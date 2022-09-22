import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOffersComponent } from './add-offers.component';

describe('AddOffersComponent', () => {
  let component: AddOffersComponent;
  let fixture: ComponentFixture<AddOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
