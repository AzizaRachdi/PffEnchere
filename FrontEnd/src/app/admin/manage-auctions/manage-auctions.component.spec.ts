import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAuctionsComponent } from './manage-auctions.component';

describe('ManageAuctionsComponent', () => {
  let component: ManageAuctionsComponent;
  let fixture: ComponentFixture<ManageAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageAuctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
