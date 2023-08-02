import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Tarifa } from 'src/app/model/tarifa';
import { TarifaService } from 'src/app/services/tarifa.service';
import { TarifasListComponent } from '../../pages/tarifas-list/tarifas-list.component';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-animations-example',
  templateUrl: './dialog-animations-example.component.html',
  styleUrls: ['./dialog-animations-example.component.css']
})
export class DialogAnimationsExampleComponent {



  constructor(public dialogo: MatDialogRef<DialogAnimationsExampleComponent>, @Inject(MAT_DIALOG_DATA) public mensaje:string) {
  }
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }

  }

  

