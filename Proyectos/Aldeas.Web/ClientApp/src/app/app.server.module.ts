import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
    imports: [AppModule, ServerModule, ModuleMapLoaderModule, ComponentsModule],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
