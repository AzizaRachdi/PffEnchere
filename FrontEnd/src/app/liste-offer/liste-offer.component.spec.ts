import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOfferComponent } from './liste-offer.component';

describe('ListeOfferComponent', () => {
  let component: ListeOfferComponent;
  let fixture: ComponentFixture<ListeOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
