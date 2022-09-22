import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOffersComponent } from './update-offers.component';

describe('UpdateOffersComponent', () => {
  let component: UpdateOffersComponent;
  let fixture: ComponentFixture<UpdateOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
