import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProposalsComponent } from './manage-proposals.component';

describe('ManageProposalsComponent', () => {
  let component: ManageProposalsComponent;
  let fixture: ComponentFixture<ManageProposalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProposalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
