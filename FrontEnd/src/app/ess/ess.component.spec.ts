import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssComponent } from './ess.component';

describe('EssComponent', () => {
  let component: EssComponent;
  let fixture: ComponentFixture<EssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
