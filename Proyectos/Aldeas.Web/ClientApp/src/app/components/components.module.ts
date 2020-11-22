import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './01-login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './02-Home/home/home.component';
import { HeaaderComponent } from './00-Headers/heaader/heaader.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { InformacionComponent } from './03-InfoGeneral/informacion/informacion.component';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { FechasComponent } from './00-Comunes/fechas/fechas.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio'
import { ColaboradorComponent } from './04-Colaboradores/colaborador/colaborador.component';
import { RegistroparticipantesComponent } from './05-Registro/registroparticipantes/registroparticipantes.component';
import { CheckboxComponent } from './00-Comunes/checkbox/checkbox.component';
import { ListcheckComponent } from './00-Comunes/listcheck/listcheck.component';
import { ListcentroscostosComponent } from './00-Comunes/listcentroscostos/listcentroscostos.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RegistrarindicadorComponent } from './05-Registro/registrarindicador/registrarindicador.component';
import { SinocheckpreguntaComponent } from './00-Comunes/sinocheckpregunta/sinocheckpregunta.component';
import { ComplementocheckpreguntaComponent } from './00-Comunes/complementocheckpregunta/complementocheckpregunta.component';
import { RegistroExitosoComponent } from './00-Comunes/registro-exitoso/registro-exitoso.component';
import { RegistroNoexitosoComponent } from './00-Comunes/registro-noexitoso/registro-noexitoso.component';
import { VerindicadorparticipanteComponent } from './05-Registro/verindicadorparticipante/verindicadorparticipante.component';
import { PipesModule } from '../pipes/pipes.module';
import { VerproyectosComponent } from './03-InfoGeneral/verproyectos/verproyectos.component';
import { DetalleproyectosComponent } from './03-InfoGeneral/detalleproyectos/detalleproyectos.component';
import { ListafechasComponent } from './00-Comunes/listafechas/listafechas.component';
import { CecoseditComponent } from './00-Comunes/cecosedit/cecosedit.component';
import { VerproyectosparticipantesComponent } from './05-Registro/verproyectosparticipantes/verproyectosparticipantes.component';
@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    HeaaderComponent,
    InformacionComponent,
    FechasComponent,
    ColaboradorComponent,
    RegistroparticipantesComponent,
    CheckboxComponent,
    SinocheckpreguntaComponent,
    ListcheckComponent,
    ListcentroscostosComponent,
    RegistrarindicadorComponent,
    ComplementocheckpreguntaComponent,
    RegistroExitosoComponent,
    RegistroNoexitosoComponent,
    VerindicadorparticipanteComponent,
    VerproyectosComponent,
    DetalleproyectosComponent,
    ListafechasComponent,
    CecoseditComponent,
    VerproyectosparticipantesComponent],
  imports: [

    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    RouterModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDividerModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTableModule,
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatMenuModule,
    MatSnackBarModule,
    PipesModule,
    MatPaginatorModule,
    MatTabsModule

  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    MatDatepickerModule
  ],
  exports: [
    HeaaderComponent
  ]
})
export class ComponentsModule { }
