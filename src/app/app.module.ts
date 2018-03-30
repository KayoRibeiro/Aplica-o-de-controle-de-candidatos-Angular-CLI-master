import { routing } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { FormsModule } from '@angular/forms';
import {ApiCandidatosService} from './api-candidatos.service';
import { HttpClientModule} from '@angular/common/http';
import { PersonComponent } from './person/person.component';
import { candidatoResolver } from './todos/cadidato.resolver';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,    
    PersonComponent
    
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  
  ],
  providers: [ApiCandidatosService, candidatoResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
