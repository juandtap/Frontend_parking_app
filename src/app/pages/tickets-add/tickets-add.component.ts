import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/model/vehiculo';
import { TarifaService } from 'src/app/services/tarifa.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { KeyValuePipe } from '@angular/common';
import { Factura } from 'src/app/model/factura';
import { Tarifa } from 'src/app/model/tarifa';

@Component({
  selector: 'app-tickets-add',
  templateUrl: './tickets-add.component.html',
  styleUrls: ['./tickets-add.component.css']
})
export class TicketsAddComponent {
  vehiculo: Vehiculo = new Vehiculo();
  isEditing = true;
  tarifaList: Tarifa[] = [];
 
  displayedColumns: string[] = ['id', 'Tarifa', 'Precio/Hora'];

  tarifaSeleccionada : Tarifa = new Tarifa()
  @ViewChild('vehiculoForm') vehiculoForm!: NgForm;

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router,
    private tarifaService: TarifaService
  ) {
    this.tarifaService.getAll().subscribe(
      (data : Tarifa[])=>{
        this.tarifaList = data
        // la primera tarifa recueperada es la que se muestra por defecto en el mat-select
        this.tarifaSeleccionada = this.tarifaList[0]
      }
      
    )

   

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
    if (
      this.vehiculo.placa &&
      placaRegex.test(this.vehiculo.placa.toUpperCase())
    ) {
      // Si el valor cumple con el formato, lo dejamos como está
      return;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    // Limitar el numero de caracteres a 8 (3 letras + 1 guion + 4 dígitos)
    if (
      this.vehiculo.placa.length >= 8 &&
      event.key !== 'Backspace' &&
      event.key !== 'Tab'
    ) {
      event.preventDefault();
    }
  }

}
