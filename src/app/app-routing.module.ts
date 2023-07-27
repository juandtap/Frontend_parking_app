import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarifasListComponent } from './pages/tarifas-list/tarifas-list.component';
import { TarifasAddComponent } from './pages/tarifas-add/tarifas-add.component';
import { ParqueaderoComponent } from './pages/parqueadero/parqueadero.component';
import { VehiculosListComponent } from './pages/vehiculos-list/vehiculos-list.component';
import { VehiculosAddComponent } from './pages/vehiculos-add/vehiculos-add.component';
import { AcercadeComponent } from './pages/acercade/acercade.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';

const routes: Routes = [
  {path: "pages/tarifas-list", component: TarifasListComponent},
  {path: "pages/tarifas-add", component: TarifasAddComponent},
  {path: "pages/listaVehiculos", component: VehiculosListComponent},
  {path: "pages/vehiculos-add", component: VehiculosAddComponent},
  {path: "pages/acercade", component: AcercadeComponent},
  {path: "pages/ayuda", component: AyudaComponent},
  {path: "pages/parqueadero", component: ParqueaderoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
