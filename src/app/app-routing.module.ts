import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarifasListComponent } from './pages/tarifas-list/tarifas-list.component';
import { TarifasAddComponent } from './pages/tarifas-add/tarifas-add.component';
import { ParqueaderoComponent } from './pages/parqueadero/parqueadero.component';
import { VehiculosListComponent } from './pages/vehiculos-list/vehiculos-list.component';
import { VehiculosAddComponent } from './pages/vehiculos-add/vehiculos-add.component';

const routes: Routes = [
  {path: "pages/tarifas-list", component: TarifasListComponent},
  {path: "pages/tarifas-add", component: TarifasAddComponent},
  {path: "pages/parqueadero", component: VehiculosListComponent},
  {path: "pages/vehiculos-add", component: VehiculosAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
