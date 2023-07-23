import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosAddComponent } from './vehiculos-add.component';

describe('VehiculosAddComponent', () => {
  let component: VehiculosAddComponent;
  let fixture: ComponentFixture<VehiculosAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiculosAddComponent]
    });
    fixture = TestBed.createComponent(VehiculosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
