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
import { TicketService } from 'src/app/services/ticket.service';
import { FacturaService } from 'src/app/services/factura.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
@Component({
  selector: 'app-facturas-add',
  templateUrl: './facturas-add.component.html',
  styleUrls: ['./facturas-add.component.css'],
})
export class FacturasAddComponent {
  factura: Factura = new Factura();
  ticket: Ticket = new Ticket();
  tarifaList: Tarifa[] = [];
  vehiculo : Vehiculo = new Vehiculo()
  totalFactura: number = 0;

  actualizacionVehiculo = false;

  tarifaSeleccionada: Tarifa = new Tarifa();
  @ViewChild('vehiculoForm') vehiculoForm!: NgForm;

  constructor(
    private router: Router,
    private tarifaService: TarifaService,
    private ticketService: TicketService,
    private facturaService: FacturaService,
    private vehiculoService: VehiculoService,
    private _snackBar: MatSnackBar
  ) {
    this.tarifaService.getAll().subscribe((data: Tarifa[]) => {
      this.tarifaList = data;
      // la primera tarifa recuperada es la que se muestra por defecto en el mat-select
      this.tarifaSeleccionada = this.tarifaList[0];
    });

    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if (params) {
      console.log('parametros recibidos: ' + params);

      this.ticket = params['ticketToEdit'];

      console.log(
        'tiempo de parqueo del ticket ' +
          this.ticket.id +
          ' : ' +
          this.ticket.tiempoParqueo
      );
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
    console.log("Se agregan datos del cliente")
    // guardar factura con su ticket y tarifa seleccionada
    if (this.ticket.vehiculo.cedula !== "" && this.ticket.vehiculo.nombre !== "") {
      // servicio update del vehiculo + ticket + save de factura
      
      //  recupero el vehiculo
      this.vehiculoService.findVehiculoById(this.ticket.vehiculo.placa).subscribe(
        (data) =>{
          this.vehiculo = data
          this.vehiculo.cedula = this.ticket.vehiculo.cedula
          this.vehiculo.nombre = this.ticket.vehiculo.nombre
           // actualizo el vehiculo con los datos del cliente
          this.vehiculoService.update(this.vehiculo).subscribe(
            (data)=>{
              this.ticket.vehiculo = data;
              // actualizo  los datos del vehiculo en el ticket
              
              console.log('Servicio PUT ticket')
              this.ticketService.updateClientData(this.ticket).subscribe(() => {
                console.log('Se ha actualizado el vehiculo del ticket')
                this.saveFactura();
              })

            }
          )
        }
      )

      
    } else {
      // servicio save de factura
      console.log("No se agregan datos del cliente")
      this.saveFactura()
    }
  }

  saveFactura(){

    console.log('servicio post factura');
    this.factura.tarifa = this.tarifaSeleccionada;
    this.factura.ticket = this.ticket;
    this.factura.total = this.totalFactura;

    this.facturaService.save(this.factura).subscribe((facturanueva) => {
      console.log('factura guardada');
      // acutalizar la factura para agregar el numero
      this.facturaService.update(facturanueva).subscribe(() => {
        console.log('numero de factura agregado');
      });

      this.openSnackBar('Salida vehiculo registrada!');
      this.router.navigate(['pages/parqueadero']);
    });
  }

  openSnackBar(mensaje: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 4 * 1000,
      data: mensaje,
    });
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
      return `${horas} hora${
        horas > 1 ? 's' : ''
      } con ${minutosRestantes} minuto${minutosRestantes > 1 ? 's' : ''}`;
    } else {
      return `${minutos} minuto${minutos > 1 ? 's' : ''}`;
    }
  }

  calcularPrecioParqueo(
    tiempoenminutos: number,
    precioHora: number,
    fraccionHora: number
  ): number {
    if (tiempoenminutos < fraccionHora) {
      tiempoenminutos = fraccionHora;
    }

    const horasCompletas = Math.floor(tiempoenminutos / 60);
    const minutosRestantes = tiempoenminutos % 60;

    if (tiempoenminutos < fraccionHora) {
    }

    let precioTotal = 0;

    // Cálculo de las horas completas
    if (horasCompletas > 0) {
      precioTotal += horasCompletas * precioHora;
    }

    // Cálculo de los minutos restantes
    if (minutosRestantes > 0) {
      const fracciones = Math.floor(minutosRestantes / fraccionHora);
      precioTotal += fracciones * (precioHora * (fraccionHora / 60));
    }
    this.totalFactura = parseFloat(precioTotal.toFixed(2));
    return parseFloat(precioTotal.toFixed(2));
  }

  onKeyDown2(event: KeyboardEvent) {
    // Permitir solo teclas numéricas y algunas teclas especiales como Delete, Backspace, etc.
    if (
      (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'Backspace' || event.key === 'Delete' || event.key === 'Tab') ||
      // Permitir números del teclado numérico
      (event.key === '0' || event.key === '1' || event.key === '2' || event.key === '3' || event.key === '4' || event.key === '5' || event.key === '6' || event.key === '7' || event.key === '8' || event.key === '9')
    ) {
      // Permitir la tecla
      return true;
    } else {
      // Prevenir todas las demás teclas
      event.preventDefault();
      return false;
    }
  }
}
