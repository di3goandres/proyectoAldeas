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

const routes: Routes = [ 
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'Home', component: HomeComponent, pathMatch: 'full',  canActivate:[UsuarioGuard], canLoad: [UsuarioGuard] },
  { path: 'logout/:sure', component: LoginComponent, pathMatch: 'full' },
  { path: 'Informacion', component: InformacionComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },
  { path: 'Colaborador', component: ColaboradorComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },
  { path: 'RegistroParticipantes', component: RegistroparticipantesComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },
  { path: 'RegistroIndicador', component: RegistrarindicadorComponent, pathMatch: 'full', canActivate:[UsuarioGuard], canLoad: [UsuarioGuard]  },

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
    MatMenuModule,
    NgxSpinnerModule,
  
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
