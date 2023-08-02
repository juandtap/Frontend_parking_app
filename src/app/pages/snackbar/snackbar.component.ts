import { Component, Inject, inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
  mensaje: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string){
    this.mensaje = data;
  }
  
  snackBarRef = inject(MatSnackBarRef);

}
