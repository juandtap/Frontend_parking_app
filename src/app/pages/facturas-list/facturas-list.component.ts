import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-facturas-list',
  templateUrl: './facturas-list.component.html',
  styleUrls: ['./facturas-list.component.css']
})
export class FacturasListComponent {
  facturaList: any
  displayedColumns: string[] = ['Numero','Placa', 'Cedula', 'Nombre','Entrada', 'Salida', 'Tiempo Parqueo','Tarifa' ,'Total'];

  

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private facturaService: FacturaService, private router: Router){
      this.facturaList =  this.facturaService.getAll()
    
     
  }


   // metedod para formatear  las fechas, se llama desde el .html 
   formatDateTime( fechaHoraString: any): string{
    const fechaHora = new Date(fechaHoraString);
  
    const fechaFormateada = `${fechaHora.getFullYear()}-${String(fechaHora.getMonth() + 1).padStart(2, '0')}-${String(fechaHora.getDate()).padStart(2, '0')}`;
  
    const horaFormateada = `${String(fechaHora.getHours()).padStart(2, '0')}:${String(fechaHora.getMinutes()).padStart(2, '0')}:${String(fechaHora.getSeconds()).padStart(2, '0')}`;
  
    return `${fechaFormateada} - ${horaFormateada}`
    }

    convertirAMinutosYHoras(minutos: number): string {
      const horas = Math.floor(minutos / 60);
      const minutosRestantes = minutos % 60;
  
      if (horas > 0) {
        return `${horas} h ${minutosRestantes} min`;
      } else {
        return `${minutos} min`;
      }
    }

}
