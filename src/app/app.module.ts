import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { TarifasListComponent } from './pages/tarifas-list/tarifas-list.component';
import { VehiculosListComponent } from './pages/vehiculos-list/vehiculos-list.component';
import { VehiculosAddComponent } from './pages/vehiculos-add/vehiculos-add.component';
import { HomeComponent } from './pages/home/home.component';
import { MatButtonModule} from '@angular/material/button';
import { MatDividerModule} from '@angular/material/divider';
import { AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { TarifasAddComponent } from './pages/tarifas-add/tarifas-add.component';
import { HttpClientModule } from '@angular/common/http';
import { ParqueaderoComponent } from './pages/parqueadero/parqueadero.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'; // Importante: Asegúrate de tener esta importación
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAnimationsExampleComponent } from './pages/dialog-animations-example/dialog-animations-example.component';
import { AcercadeComponent } from './pages/acercade/acercade.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component'; // Importante: Asegúrate de tener esta importación
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    TarifasListComponent,
    VehiculosListComponent,
    VehiculosAddComponent,
    HomeComponent,
    TarifasAddComponent,
    ParqueaderoComponent,
    DialogAnimationsExampleComponent,
    AcercadeComponent,
    AyudaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
