import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOfferComponent } from './add-offer.component';

describe('AddOfferComponent', () => {
  let component: AddOfferComponent;
  let fixture: ComponentFixture<AddOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
