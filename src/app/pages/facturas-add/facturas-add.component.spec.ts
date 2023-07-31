import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasAddComponent } from './facturas-add.component';

describe('FacturasAddComponent', () => {
  let component: FacturasAddComponent;
  let fixture: ComponentFixture<FacturasAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturasAddComponent]
    });
    fixture = TestBed.createComponent(FacturasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
