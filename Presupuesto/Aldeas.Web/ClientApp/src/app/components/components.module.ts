import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './01-login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './02-Home/home/home.component';
import { HeaaderComponent } from './00-Headers/heaader/heaader.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import  {MatCurrencyFormatModule} from 'mat-currency-format';


import { MatMomentDateModule, MomentDateAdapter } from "@angular/material-moment-adapter";
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { FechasComponent } from './00-Comunes/fechas/fechas.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio'
import { CheckboxComponent } from './00-Comunes/checkbox/checkbox.component';
import { ListcheckComponent } from './00-Comunes/listcheck/listcheck.component';
import { ListcentroscostosComponent } from './00-Comunes/listcentroscostos/listcentroscostos.component';
import { ListaprogramasComponent } from './03-Programas/listaprogramas/listaprogramas.component';
import { MatMenuModule } from '@angular/material/menu';
import { CrearprogramaComponent } from './03-Programas/crearprograma/crearprograma.component';
import { RegistroexitosoComponent } from './00-Comunes/registroexitoso/registroexitoso.component';
import { ActualizarprogramaComponent } from './03-Programas/actualizarprograma/actualizarprograma.component';
import { ListaonlyprogramaComponent } from './03-Programas/listaonlyprograma/listaonlyprograma.component';
import { ActualizarcecoComponent } from './03-Programas/actualizarceco/actualizarceco.component';
import { ListaonlyrubrosComponent } from './04-Rubros/listaonlyrubros/listaonlyrubros.component';
import { ActualizarcategoriaComponent } from './04-Rubros/actualizarcategoria/actualizarcategoria.component';
import { ListarubrospucsComponent } from './04-Rubros/listarubrospucs/listarubrospucs.component';
import { ActualizarpucsComponent } from './04-Rubros/actualizarpucs/actualizarpucs.component';
import { CrearcategoriaComponent } from './04-Rubros/crearcategoria/crearcategoria.component';
import { AgregarpucarubroComponent } from './04-Rubros/agregarpucarubro/agregarpucarubro.component';
import { AgregarcecoaprogramaComponent } from './03-Programas/agregarcecoaprograma/agregarcecoaprograma.component';
import { PrincipalpresupuestoComponent } from './05-Presupuesto/principalpresupuesto/principalpresupuesto.component';
import { PrerubrospucsComponent } from './05-Presupuesto/prerubrospucs/prerubrospucs.component';
import { AgregarpresupuestoComponent } from './05-Presupuesto/agregarpresupuesto/agregarpresupuesto.component';
import { ListapresupuestoprogramaComponent } from './05-Presupuesto/listapresupuestoprograma/listapresupuestoprograma.component';
import { DetallepresupuestoprogramaComponent } from './05-Presupuesto/detallepresupuestoprograma/detallepresupuestoprograma.component';
import { DetalleFamiliarpresupuestoprogramaComponent } from './05-Presupuesto/detalle-familiarpresupuestoprograma/detalle-familiarpresupuestoprograma.component';
import { DetalleOtrospresupuestoprogramaComponent } from './05-Presupuesto/detalle-otrospresupuestoprograma/detalle-otrospresupuestoprograma.component';
import { GenerarPresupuestoComponent } from './05-Presupuesto/generar-presupuesto/generar-presupuesto.component';
import { ActualizarPresupuestoComponent } from './05-Presupuesto/actualizar-presupuesto/actualizar-presupuesto.component';
import { ActualizardetalleComponent } from './05-Presupuesto/actualizardetalle/actualizardetalle.component';
import { ListausuariosComponent } from './06-Usuarios/listausuarios/listausuarios.component';
import { AgregarusuarioComponent } from './06-Usuarios/agregarusuario/agregarusuario.component';
import { NoexitosoComponent } from './00-Comunes/noexitoso/noexitoso.component';
import { VerprogramasasociadosComponent } from './06-Usuarios/verprogramasasociados/verprogramasasociados.component';
import { AsociarprogramasComponent } from './06-Usuarios/asociarprogramas/asociarprogramas.component';
import { ProgramatipoComponent } from './06-TipoProgramas/programatipo/programatipo.component';
import { ListacargosComponent } from './07-Cargos/listacargos/listacargos.component';
import { ActualizarcargoComponent } from './07-Cargos/actualizarcargo/actualizarcargo.component';
import { AgregarcargoComponent } from './07-Cargos/agregarcargo/agregarcargo.component';
import { ListaFinanciadoresComponent } from './08-Financiadores/lista-financiadores/lista-financiadores.component';
import { GestionarprogramasComponent } from './05-Presupuesto/Gestion/gestionarprogramas/gestionarprogramas.component';
import { AsociarfinanciadoranioComponent } from './05-Presupuesto/Gestion/asociarfinanciadoranio/asociarfinanciadoranio.component';
import { FinanciadorfaltanteComponent } from './05-Presupuesto/Gestion/financiadorfaltante/financiadorfaltante.component';
import { AsociaritemspresupuestoComponent } from './05-Presupuesto/Gestion/asociaritemspresupuesto/asociaritemspresupuesto.component';
import { VeritemspresupuestonioComponent } from './05-Presupuesto/Gestion/veritemspresupuestonio/veritemspresupuestonio.component';
import { CargoselectComponent } from './07-Cargos/cargoselect/cargoselect.component';
import { BorrardetallepresupuestoComponent } from './05-Presupuesto/borrardetallepresupuesto/borrardetallepresupuesto.component';
import { RegistroNoexitosoComponent } from './00-Comunes/registro-noexitoso/registro-noexitoso.component';
import { ActualizarusuarioComponent } from './06-Usuarios/actualizarusuario/actualizarusuario.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeseacontinuarComponent } from './00-Comunes/deseacontinuar/deseacontinuar.component';

@NgModule({
  declarations: [LoginComponent, HomeComponent,
    HeaaderComponent,
    FechasComponent,

    CheckboxComponent, ListcheckComponent, ListcentroscostosComponent,
    ListaprogramasComponent, CrearprogramaComponent, RegistroexitosoComponent,
    ActualizarprogramaComponent, ListaonlyprogramaComponent, ActualizarcecoComponent,
    ListaonlyrubrosComponent, ActualizarcategoriaComponent, ListarubrospucsComponent,
    ActualizarpucsComponent, CrearcategoriaComponent, AgregarpucarubroComponent,
    AgregarcecoaprogramaComponent, PrincipalpresupuestoComponent, PrerubrospucsComponent,
    AgregarpresupuestoComponent, ListapresupuestoprogramaComponent,
    DetallepresupuestoprogramaComponent, DetalleFamiliarpresupuestoprogramaComponent,
    DetalleOtrospresupuestoprogramaComponent, GenerarPresupuestoComponent,
    ActualizarPresupuestoComponent, ActualizardetalleComponent, ListausuariosComponent,
    AgregarusuarioComponent, NoexitosoComponent, VerprogramasasociadosComponent, AsociarprogramasComponent,
    ProgramatipoComponent, ListacargosComponent, ActualizarcargoComponent, AgregarcargoComponent, 
    ListaFinanciadoresComponent, GestionarprogramasComponent, AsociarfinanciadoranioComponent, 
    FinanciadorfaltanteComponent, AsociaritemspresupuestoComponent, VeritemspresupuestonioComponent,
    CargoselectComponent, BorrardetallepresupuestoComponent, RegistroNoexitosoComponent, ActualizarusuarioComponent,
    DeseacontinuarComponent],
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
    MatPaginatorModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatCurrencyFormatModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    MatDatepickerModule
  ],
  exports: [
    HeaaderComponent,
    MatMenuModule,
    MatStepperModule

  ]
})
export class ComponentsModule { }
