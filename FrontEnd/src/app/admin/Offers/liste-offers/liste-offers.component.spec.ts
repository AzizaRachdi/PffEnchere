import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOffersComponent } from './liste-offers.component';

describe('ListeOffersComponent', () => {
  let component: ListeOffersComponent;
  let fixture: ComponentFixture<ListeOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
