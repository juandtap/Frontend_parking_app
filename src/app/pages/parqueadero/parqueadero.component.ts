import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NavigationExtras, Router } from '@angular/router';
import { Ticket } from 'src/app/model/ticket';
import { Vehiculo } from 'src/app/model/vehiculo';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-parqueadero',
  templateUrl: './parqueadero.component.html',
  styleUrls: ['./parqueadero.component.css'],
})
export class ParqueaderoComponent {
  ticketList: any;

  displayedColumns: string[] = ['Placa', 'Marca', 'Entrada', 'Salida'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ticketService: TicketService, private router: Router) {
    this.ticketList = this.ticketService.getAll()
  }

  goToFacture(ticket: Ticket) {
    // actualiza el ticket con la hora de salida y el tiempo total
    this.ticketService.updateEndTime(ticket).subscribe(
      (data) =>{
        ticket = data
        let params: NavigationExtras = {
          queryParams: {
            ticketToEdit: ticket,
          },
        };
        console.log("ticket actualizado")
        this.router.navigate(['pages/facturas-add'], params)
      }
    )
    
  }
}
