import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, PreloadAllModules, Routes, CanActivate } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './components/01-login/login/login.component';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './components/02-Home/home/home.component';
import  {MatCurrencyFormatModule} from 'mat-currency-format';

import { MatTabsModule } from '@angular/material/tabs';

import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { UsuarioGuard } from './guards/usuario.guard';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ListaprogramasComponent } from './components/03-Programas/listaprogramas/listaprogramas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaonlyprogramaComponent } from './components/03-Programas/listaonlyprograma/listaonlyprograma.component';
import { ListaonlyrubrosComponent } from './components/04-Rubros/listaonlyrubros/listaonlyrubros.component';
import { ListarubrospucsComponent } from './components/04-Rubros/listarubrospucs/listarubrospucs.component';
import { PrincipalpresupuestoComponent } from './components/05-Presupuesto/principalpresupuesto/principalpresupuesto.component';
import { ListapresupuestoprogramaComponent } from './components/05-Presupuesto/listapresupuestoprograma/listapresupuestoprograma.component';
import { ListausuariosComponent } from './components/06-Usuarios/listausuarios/listausuarios.component';
import { AgregarusuarioComponent } from './components/06-Usuarios/agregarusuario/agregarusuario.component';
import { ProgramatipoComponent } from './components/06-TipoProgramas/programatipo/programatipo.component';
import { ListacargosComponent } from './components/07-Cargos/listacargos/listacargos.component';
import { CrearprogramaComponent } from './components/03-Programas/crearprograma/crearprograma.component';
import { ListaFinanciadoresComponent } from './components/08-Financiadores/lista-financiadores/lista-financiadores.component';
import { GestionarprogramasComponent } from './components/05-Presupuesto/Gestion/gestionarprogramas/gestionarprogramas.component';
import { VeritemspresupuestonioComponent } from './components/05-Presupuesto/Gestion/veritemspresupuestonio/veritemspresupuestonio.component';
import { AsociaritemspresupuestoComponent } from './components/05-Presupuesto/Gestion/asociaritemspresupuesto/asociaritemspresupuesto.component';
import { MatStepperModule } from '@angular/material/stepper';


const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'Home', component: HomeComponent, pathMatch: 'full', canActivate: [UsuarioGuard],
    canLoad: [UsuarioGuard]
  },
  {
    path: 'Cargos', component: ListacargosComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  },
  { path: 'logout/:sure', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'TipoProgramas', component: ProgramatipoComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  },
  {
    path: 'Programas', component: ListaprogramasComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  },
  {
    path: 'OnlyProgramas', component: ListaonlyprogramaComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  }
  ,
  {
    path: 'OnlyCategorias', component: ListaonlyrubrosComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  }
  ,
  {
    path: 'CategoriasPucs', component: ListarubrospucsComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  }
  ,
  {
    path: 'GenerarPresupuesto', component: PrincipalpresupuestoComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  }
  ,
  {
    path: 'VerPresupuesto/:id', component: ListapresupuestoprogramaComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  }

  
  // rutas usuarios
  ,
  {
    path: 'VerUsuarios', component: ListausuariosComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  }
  ,
  {
    path: 'AgregarUsuario', component: AgregarusuarioComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  }

  /**creacion de programas */

  ,
  {
    path: 'CrearPrograma', component: CrearprogramaComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  }
  ,
  {
    path: 'Financiadores', component: ListaFinanciadoresComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  }
/**Gestion presupuesto */
  ,
  {
    path: 'GestionProgramas', component: GestionarprogramasComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  }
  ,
  {
    path: 'GestionProgramas/PresupuestoAnio/:id', component: VeritemspresupuestonioComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  }
  ,
  {
    path: 'VerDetallePresupuesto/:id', component: AsociaritemspresupuestoComponent, pathMatch: 'full',
    canActivate: [UsuarioGuard], canLoad: [UsuarioGuard]
  }



];
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    MatToolbarModule,
    MatDatepickerModule,
    MatIconModule,
    MatGridListModule,
    BrowserModule,//.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ComponentsModule,
    MatTabsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserAnimationsModule,
    NgbModule,
    MatCurrencyFormatModule,
    MatStepperModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
