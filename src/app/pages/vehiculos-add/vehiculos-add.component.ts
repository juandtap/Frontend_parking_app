import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/model/ticket';
import { Vehiculo } from 'src/app/model/vehiculo';
import { TicketService } from 'src/app/services/ticket.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';


@Component({
  selector: 'app-vehiculos-add',
  templateUrl: './vehiculos-add.component.html',
  styleUrls: ['./vehiculos-add.component.css']
})
export class VehiculosAddComponent {


  vehiculo: Vehiculo = new Vehiculo
  ticket: Ticket = new Ticket

  isEditing = false
  durationInSeconds = 5;
  
  constructor(private vehiculoService : VehiculoService, private ticketService: TicketService, private router: Router , private _snackBar: MatSnackBar){
    let params = this.router.getCurrentNavigation()?.extras.queryParams
    if(params){
      console.log("parametros recibidos: "+params)
      this.vehiculo = params['vehiculoToEdit']
      this.isEditing = params['flag']
    }

    if (this.isEditing){
      console.log("modo edit")
    } else{
      console.log("modo save")
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

    // Si el valor no cumple con el formato, lo formateamos
    const placaFormatted = this.vehiculo.placa.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (placaFormatted.length > 3) {
      // Insertamos un guion después de las primeras tres letras mayúsculas
      const letters = placaFormatted.substring(0, 3);
      const numbers = placaFormatted.substring(3, 7); // Limitamos a 4 dígitos
      this.vehiculo.placa = `${letters}-${numbers}`;
    } else {
      // Si no hay al menos tres letras, solo formateamos en mayúsculas
      this.vehiculo.placa = placaFormatted;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    // Limitar el numero de caracteres a 8 (3 letras + 1 guion + 4 dígitos)
    if (this.vehiculo.placa.length >= 8 && event.key !== 'Backspace' && event.key !== 'Tab') {
      event.preventDefault();
    }
    
  }

  save(){
    
    console.log("agregar nuevo vehiculo "+this.vehiculo.placa)
    this.ticket.vehiculo = this.vehiculo
    this.ticketService.save(this.ticket).subscribe(data =>{
    console.log("resultado POST: ",data)
    this.router.navigate(["pages/parqueadero"])
    })
    this.vehiculo = new Vehiculo
  }


  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}

