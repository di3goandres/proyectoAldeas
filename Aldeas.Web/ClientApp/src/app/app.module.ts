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



import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { UsuarioGuard } from './guards/usuario.guard';
import { InformacionComponent } from './components/03-InfoGeneral/informacion/informacion.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';


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
    // RouterModule.forRoot([
    //   { path: '', component: LoginComponent, pathMatch: 'full' },
      
    //   { path: 'Home', component: HomeComponent, pathMatch: 'full',   canLoad: [UsuarioGuard] },
    //   { path: 'logout/:sure', component: LoginComponent, pathMatch: 'full' },

    //   {
    //     path: '**',
    //     redirectTo: '',
    //     pathMatch: 'full'
    //   }


    // ]),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
