import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TarifaService } from 'src/app/services/tarifa.service';
import { Factura } from 'src/app/model/factura';
import { Tarifa } from 'src/app/model/tarifa';
import { Vehiculo } from 'src/app/model/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Ticket } from 'src/app/model/ticket';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
@Component({
  selector: 'app-facturas-add',
  templateUrl: './facturas-add.component.html',
  styleUrls: ['./facturas-add.component.css'],
})
export class FacturasAddComponent {
 
  factura : Factura = new Factura()
  ticket: Ticket = new Ticket()
  tarifaList: Tarifa[] = []
 

  tarifaSeleccionada : Tarifa = new Tarifa()
  @ViewChild('vehiculoForm') vehiculoForm!: NgForm;

  constructor(
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
     
      this.ticket = params['ticketToEdit'];
      
      console.log("tiempo de parqueo del ticket "+this.ticket.id+" : "+this.ticket.tiempoParqueo)
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
  
  }

  formatPlaca() {
    // Expresión regular para validar el formato deseado (tres letras mayúsculas seguidas de un guion y cuatro dígitos)
    const placaRegex = /^[A-Z]{3}-\d{4}$/;

    // Verificar si el valor actual cumple con el formato deseado
    if (
      this.ticket.vehiculo.placa &&
      placaRegex.test(this.ticket.vehiculo.placa.toUpperCase())
    ) {
      // Si el valor cumple con el formato, lo dejamos como está
      return;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    // Limitar el numero de caracteres a 8 (3 letras + 1 guion + 4 dígitos)
    if (
      this.ticket.vehiculo.placa.length >= 8 &&
      event.key !== 'Backspace' &&
      event.key !== 'Tab'
    ) {
      event.preventDefault();
    }
  }
  // el servidor devuelve el tiempo de parqueo en minutos, esta funcion devuelve un string
  // que muestra ese tiempo en en hora y minutos 
  convertirAMinutosYHoras(minutos: number): string {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    if (horas > 0) {
      return `${horas} hora${horas > 1 ? 's' : ''} con ${minutosRestantes} minuto${minutosRestantes > 1 ? 's' : ''}`;
    } else {
      return `${minutos} minuto${minutos > 1 ? 's' : ''}`;
    }
  }

  calcularPrecioParqueo(tiempoenminutos: number, precioHora: number, fraccionHora: number): number {
    const horasCompletas = Math.floor(tiempoenminutos / 60);
    const minutosRestantes = tiempoenminutos % 60;

    let precioTotal = 0;
    
    // Cálculo de las horas completas
    if (horasCompletas > 0) {
      precioTotal += horasCompletas * precioHora;
    }

    // Cálculo de los minutos restantes
    if (minutosRestantes > 0) {
      precioTotal += precioHora * (minutosRestantes <= fraccionHora ? 1 : Math.ceil(minutosRestantes / fraccionHora));
    }

    return precioTotal;
  }
  
}
