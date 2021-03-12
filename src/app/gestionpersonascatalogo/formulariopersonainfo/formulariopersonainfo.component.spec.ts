import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariopersonainfoComponent } from './formulariopersonainfo.component';

describe('FormulariopersonainfoComponent', () => {
  let component: FormulariopersonainfoComponent;
  let fixture: ComponentFixture<FormulariopersonainfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulariopersonainfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariopersonainfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
