import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Tarifa } from 'src/app/model/tarifa';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TarifaService } from 'src/app/services/tarifa.service';
import { async } from 'rxjs';

@Component({
  selector: 'app-tarifas-list',
  templateUrl: './tarifas-list.component.html',
  styleUrls: ['./tarifas-list.component.css'],
  
})
export class TarifasListComponent {

  tarifaList: any
  displayedColumns: string[] = ['id', 'Tarifa', 'Precio/Hora', 'Descripcion'];

  

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private tarifaService: TarifaService, private router: Router){
      this.tarifaList =  this.tarifaService.getAll()
    
     
  }

 
      
  



  
}

// ejemplo completo en : https://material.angular.io/components/table/examples#table-overview