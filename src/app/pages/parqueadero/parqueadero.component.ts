import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NavigationExtras, Router } from '@angular/router';
import { Ticket } from 'src/app/model/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { DialogAnimationsExampleComponent } from '../../components/dialog-animations-example/dialog-animations-example.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
@Component({
  selector: 'app-parqueadero',
  templateUrl: './parqueadero.component.html',
  styleUrls: ['./parqueadero.component.css'],
})
export class ParqueaderoComponent {
  ticketList: any;

  displayedColumns: string[] = [
    'Placa',
    'Marca',
    'Color',
    'Descripción',
    'Entrada',
    'Salida',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ticketService: TicketService,
    private router: Router,
    public dialogo: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.ticketList = this.ticketService.getAll();
  }

  goToFacture(ticket: Ticket) {
    // actualiza el ticket con la hora de salida y el tiempo total

    this.dialogo
      .open(DialogAnimationsExampleComponent, {
        data: `Seguro desea Marcar la Salida del Vehiculo ? Esta accion no puede deshacerse`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          console.log('Marcar salida del ticket:' + ticket.id);
          this.ticketService.updateEndTime(ticket).subscribe((data) => {
            ticket = data;
            let params: NavigationExtras = {
              queryParams: {
                ticketToEdit: ticket,
              },
            };
            console.log('ticket actualizado');
            this.router.navigate(['pages/facturas-add'], params);
            
          });
        } else {
          console.log('se cancelo la accion de marcar salida');
        }
      });
  }

  // metedod para formatear  las fechas, se llama desde el .html
  formatDateTime(fechaHoraString: any): string {
    const fechaHora = new Date(fechaHoraString);

    const fechaFormateada = `${fechaHora.getFullYear()}-${String(
      fechaHora.getMonth() + 1
    ).padStart(2, '0')}-${String(fechaHora.getDate()).padStart(2, '0')}`;

    const horaFormateada = `${String(fechaHora.getHours()).padStart(
      2,
      '0'
    )}:${String(fechaHora.getMinutes()).padStart(2, '0')}:${String(
      fechaHora.getSeconds()
    ).padStart(2, '0')}`;

    return `${fechaFormateada} - ${horaFormateada}`;
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 4 * 1000,
      data: 'Se ha marcado la salida del vehiculo',
    });
  }
}
