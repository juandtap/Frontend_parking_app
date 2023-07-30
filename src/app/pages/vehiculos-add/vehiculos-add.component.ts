import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/model/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-vehiculos-add',
  templateUrl: './vehiculos-add.component.html',
  styleUrls: ['./vehiculos-add.component.css']
})
export class VehiculosAddComponent {


  vehiculo: Vehiculo = new Vehiculo
  isEditing = false

  constructor(private vehiculoService : VehiculoService,private router: Router){
    let params = this.router.getCurrentNavigation()?.extras.queryParams
    if(params){
      console.log("parametros recibidos: "+params)
      this.vehiculo = params['vehiculoToEdit']
      this.isEditing = params['flag']
    }

    if (this.isEditing){
      console.log("modo edit")
    } else{
      console.log("modo save")
    }

  }

  save(){
    
    console.log("agregar nueva tarifa "+this.vehiculo)
    this.vehiculoService.save(this.vehiculo).subscribe(data =>{
    console.log("resultado POST: ",data)
    this.router.navigate(["pages/listaVehiculos"])
    })
    this.vehiculo = new Vehiculo
  }
}

