import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasAddComponent } from './tarifas-add.component';

describe('TarifasAddComponent', () => {
  let component: TarifasAddComponent;
  let fixture: ComponentFixture<TarifasAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarifasAddComponent]
    });
    fixture = TestBed.createComponent(TarifasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
