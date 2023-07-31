import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Tarifa } from 'src/app/model/tarifa';
import { TarifaService } from 'src/app/services/tarifa.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tarifas-add',
  templateUrl: './tarifas-add.component.html',
  styleUrls: ['./tarifas-add.component.css'],
})
export class TarifasAddComponent {
  tarifa: Tarifa = new Tarifa();
  isEditing = false;

  @ViewChild('tarifaForm') tarifaForm!: NgForm;

  constructor(private tarifaService: TarifaService, private router: Router) {
    let params = this.router.getCurrentNavigation()?.extras.queryParams;
    if (params) {
      console.log('parametros recibidos: ' + params);
      this.tarifa = params['tarifaToEdit'];
      this.isEditing = params['flag'];
    }

    if (this.isEditing) {
      console.log('modo edit');
    } else {
      console.log('modo save');
    }
  }

  checkDataForm() {
    if (this.tarifaForm.valid) {
      this.save();
    } else {
      alert('Complete todos los campos requeridos.');
    }
  }

  save() {
    if (!this.isEditing) {
      console.log('agregar nueva tarifa ' + this.tarifa);

      this.tarifaService.save(this.tarifa).subscribe((data) => {
        console.log('resultado POST: ', data);

        this.router.navigate(['pages/tarifas-list']);
      });
      this.tarifa = new Tarifa();
    } else {
      console.log('actualizar tarifa ' + this.tarifa);
      this.tarifaService.update(this.tarifa).subscribe((data) => {
        console.log('resultado PUT: ', data);
        this.router.navigate(['pages/tarifas-list']);
      });
    }
  }
}
