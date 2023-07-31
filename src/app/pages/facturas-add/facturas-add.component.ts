import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/model/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculo.service';


@Component({
  selector: 'app-facturas-add',
  templateUrl: './facturas-add.component.html',
  styleUrls: ['./facturas-add.component.css']
})
export class FacturasAddComponent {
  vehiculo: Vehiculo = new Vehiculo();
  isEditing = true;

  @ViewChild('vehiculoForm') vehiculoForm!: NgForm;

  constructor(private vehiculoService: VehiculoService, private router: Router) {
    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if (params) {
      console.log('parametros recibidos: ' + params);
      console.log(this.vehiculo);
      this.vehiculo = params['vehiculoToEdit'];
      //this.isEditing = params['flag'];
    }

    if (this.isEditing) {
      console.log('modo edit');
    } else {
      console.log('modo save');
    }
  }

  checkDataForm() {
    if (this.vehiculoForm.valid) {
      this.save();
    } else {
      alert('Complete todos los campos requeridos.');
    }
  }

  save() {
    if (!this.isEditing) {


      this.vehiculoService.save(this.vehiculo).subscribe((data) => {
        console.log('resultado POST: ', data);

        this.router.navigate(['pages/tarifas-list']);
      });
      this.vehiculo = new Vehiculo();
    } else {
      console.log('actualizar tarifa ' + this.vehiculo);
      this.vehiculoService.update(this.vehiculo).subscribe((data) => {
        console.log('resultado PUT: ', data);
        this.router.navigate(['pages/tarifas-list']);
      });
    }
  }

  formatPlaca() {
    // Expresión regular para validar el formato deseado (tres letras mayúsculas seguidas de un guion y cuatro dígitos)
    const placaRegex = /^[A-Z]{3}-\d{4}$/;

    // Verificar si el valor actual cumple con el formato deseado
    if (this.vehiculo.placa && placaRegex.test(this.vehiculo.placa.toUpperCase())) {
      // Si el valor cumple con el formato, lo dejamos como está
      return;
    }

}

onKeyDown(event: KeyboardEvent) {
  // Limitar el numero de caracteres a 8 (3 letras + 1 guion + 4 dígitos)
  if (this.vehiculo.placa.length >= 8 && event.key !== 'Backspace' && event.key !== 'Tab') {
    event.preventDefault();
  }
  
}
}
