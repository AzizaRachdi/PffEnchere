import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCommentsComponent } from './manage-comments.component';

describe('ManageCommentsComponent', () => {
  let component: ManageCommentsComponent;
  let fixture: ComponentFixture<ManageCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
