import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOffersComponent } from './detail-offers.component';

describe('DetailOffersComponent', () => {
  let component: DetailOffersComponent;
  let fixture: ComponentFixture<DetailOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
