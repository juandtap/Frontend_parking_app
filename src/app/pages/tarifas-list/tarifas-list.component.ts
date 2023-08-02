import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { NavigationExtras, Router } from '@angular/router';
import { Tarifa } from 'src/app/model/tarifa';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TarifaService } from 'src/app/services/tarifa.service';
import { async } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogAnimationsExampleComponent } from '../dialog-animations-example/dialog-animations-example.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-tarifas-list',
  templateUrl: './tarifas-list.component.html',
  styleUrls: ['./tarifas-list.component.css'],
})
export class TarifasListComponent  implements OnInit{
  tarifaList: Tarifa[] = []
  displayedColumns: string[] = [
    'id',
    'Tarifa',
    'Precio/Hora',
    'Descripcion',
    'Fraccion Hora (minutos)',
    'Acciones',
  ];

  // para filtros y ordenamientos de la tabla
  // @ViewChild(MatPaginator) paginator!: MatPaginator
  // @ViewChild(MatSort) sort!: MatSort

  constructor(
    private tarifaService: TarifaService,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialogo: MatDialog,
    private _snackBar: MatSnackBar
  ) {

    this.tarifaService.getAll().subscribe(
      (data: Tarifa[]) =>{
        this.tarifaList = data
      }
    )

    // Importa los iconos "edit" y "delete" desde los recursos de Material Icons
    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/delete.svg'
      )
    );
  }

  editTarifa(tarifa: Tarifa) {
    console.log('editar: ' + tarifa);
    //const tarifaJson = JSON.stringify(tarifa);
    let params: NavigationExtras = {
      queryParams: {
        tarifaToEdit: tarifa,
        flag: true,
      },
    };

    this.router.navigate(['pages/tarifas-add'], params);
  }

  deleteTarifa(tarifa: Tarifa) {

    this.dialogo.open(DialogAnimationsExampleComponent, {
      data: `Seguro que desea eliminar ? Esta accion no puede deshacerse`
    })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          console.log('Eliminar tarifa con ID:', tarifa.id);
          this.tarifaService.delete(tarifa).subscribe(
            () => {
              this.ngOnInit()
              this.openSnackBar()
            }
          )


        } else {
     
        }
      });

  }


  ngOnInit(): void {
    this.tarifaService.getAll().subscribe(
      (data: Tarifa[]) =>{
        this.tarifaList = data
      }
    )
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 4 * 1000,
      data : "Tarifa Eliminada Correctamente"
    });
  }

}


// ejemplo completo en : https://material.angular.io/components/table/examples#table-overview