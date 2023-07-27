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

  constructor(private vehiculoService : VehiculoService,private router: Router){

  }

  save(){
    console.log("agregar nuevo Vehiculo "+this.vehiculo)
    
    
  
    // this.vehiculoService.save(this.vehiculo).subscribe(data =>{
    //   console.log("resultado POST: ",data)
    //   this.router.navigate(["pages/parqueadero"])
    // })
    this.vehiculo = new Vehiculo
  }
}
