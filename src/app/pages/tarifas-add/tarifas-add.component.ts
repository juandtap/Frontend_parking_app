import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tarifa } from 'src/app/model/tarifa';
import { TarifaService } from 'src/app/services/tarifa.service';

@Component({
  selector: 'app-tarifas-add',
  templateUrl: './tarifas-add.component.html',
  styleUrls: ['./tarifas-add.component.css']
})
export class TarifasAddComponent {
  tarifa: Tarifa = new Tarifa

  constructor(private tarifaService : TarifaService ,private router: Router){

  }

  save(){
    console.log("agregar nueva tarifa "+this.tarifa)
    
    
  
    this.tarifaService.save(this.tarifa).subscribe(data =>{
      console.log("resultado POST: ",data)
      this.router.navigate(["pages/tarifas-list"])
    })
    this.tarifa = new Tarifa
  }
}
