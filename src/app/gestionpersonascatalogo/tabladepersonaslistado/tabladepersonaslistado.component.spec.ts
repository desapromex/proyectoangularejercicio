import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabladepersonaslistadoComponent } from './tabladepersonaslistado.component';

describe('TabladepersonaslistadoComponent', () => {
  let component: TabladepersonaslistadoComponent;
  let fixture: ComponentFixture<TabladepersonaslistadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabladepersonaslistadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabladepersonaslistadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
