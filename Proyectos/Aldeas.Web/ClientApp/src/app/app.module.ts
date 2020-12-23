import { BrowserModule } from '@angular/platform-browser';
import { forwardRef, NgModule } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, PreloadAllModules, Routes, CanActivate } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './components/01-login/login/login.component';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './components/02-Home/home/home.component';
import { MatMenuModule } from '@angular/material/menu';



import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { UsuarioGuard } from './guards/usuario.guard';
import { InformacionComponent } from './components/03-InfoGeneral/informacion/informacion.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ColaboradorComponent } from './components/04-Colaboradores/colaborador/colaborador.component';
import { RegistroparticipantesComponent } from './components/05-Registro/registroparticipantes/registroparticipantes.component';
import { RegistrarindicadorComponent } from './components/05-Registro/registrarindicador/registrarindicador.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VerindicadorparticipanteComponent } from './components/05-Registro/verindicadorparticipante/verindicadorparticipante.component';
import { PipesModule } from './pipes/pipes.module';
import { VerproyectosComponent } from './components/03-InfoGeneral/verproyectos/verproyectos.component';
import { DetalleproyectosComponent } from './components/03-InfoGeneral/detalleproyectos/detalleproyectos.component';
import { VerproyectosparticipantesComponent } from './components/05-Registro/verproyectosparticipantes/verproyectosparticipantes.component';
import { ListacolaboradoresComponent } from './components/04-Colaboradores/listacolaboradores/listacolaboradores.component';
import { DescargarbasedatosComponent } from './components/06-Descargas/descargarbasedatos/descargarbasedatos.component';
import { ChecklistComponent } from './components/00-Comunes/checklist/checklist.component';
import { UsuariosComponent } from './components/07-Admin/usuarios/usuarios.component';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [ 
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'Home', component: HomeComponent, pathMatch: 'full',  canActivate:[UsuarioGuard], canLoad: [UsuarioGuard] },
  { path: 'logout/:sure', component: LoginComponent, pathMatch: 'full' },
  { path: 'Informacion', component: InformacionComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },
  { path: 'Colaborador', component: ColaboradorComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },
  { path: 'RegistroParticipantes', component: RegistroparticipantesComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },
  { path: 'RegistroIndicador', component: RegistrarindicadorComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },
  { path: 'VerIndicadorParticipante', component: VerindicadorparticipanteComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },
  { path: 'VerProyectos', component: VerproyectosComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },
  { path: 'VerDetalleProyectos/:id', component: DetalleproyectosComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },
  { path: 'VerParticipantesProyectos/:id', component: VerproyectosparticipantesComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },
  { path: 'VerColaboradoresProyectos/:id', component: ListacolaboradoresComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },

  { path: 'DescargarDatos', component: DescargarbasedatosComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },
  { path: 'AdminUsuarios', component: UsuariosComponent, pathMatch: 'full', canActivate:[AdminGuard], canLoad: [AdminGuard]  },

];
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    FetchDataComponent,

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
    MatMenuModule,
    NgxSpinnerModule,
  
    // RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserAnimationsModule,
    NgbModule,
    PipesModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
