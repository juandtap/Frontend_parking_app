import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Tarifa } from 'src/app/model/tarifa';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TarifaService } from 'src/app/services/tarifa.service';
import { async } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-tarifas-list',
  templateUrl: './tarifas-list.component.html',
  styleUrls: ['./tarifas-list.component.css'],
  
})
export class TarifasListComponent {

  tarifaList: any
  displayedColumns: string[] = ['id', 'Tarifa', 'Precio/Hora', 'Descripcion' , 'Acciones'];

  

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private tarifaService: TarifaService, private router: Router  , private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer,public dialog: MatDialog
){

      this.tarifaList =  this.tarifaService.getAll();

          // Importa los iconos "edit" y "delete" desde los recursos de Material Icons
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg')
    );



     
  }

 
  editTarifa(tarifa: any) {
    // Aquí puedes implementar la lógica para editar la tarifa con el ID de la tarifa proporcionada
    console.log('Editar tarifa con ID:', tarifa.id);
  }

  deleteTarifa(tarifa: any) {
    // Aquí puedes implementar la lógica para eliminar la tarifa con el ID de la tarifa proporcionada
    console.log('Eliminar tarifa con ID:', tarifa.id);
  }
  
  



  
}

// ejemplo completo en : https://material.angular.io/components/table/examples#table-overview