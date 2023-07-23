import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarifasListComponent } from './pages/tarifas-list/tarifas-list.component';
import { TarifasAddComponent } from './pages/tarifas-add/tarifas-add.component';

const routes: Routes = [
  {path: "pages/tarifas-list", component: TarifasListComponent},
  {path: "pages/tarifas-add", component: TarifasAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
