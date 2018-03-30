import {ModuleWithProviders, NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { TodosComponent } from './todos/todos.component';

import { PersonComponent } from './person/person.component';


const APP_ROUTES: Routes = [
    //rotas base
          
            {path: 'todos', component: TodosComponent},
            {path: 'todos/:email', component: PersonComponent}


];


export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);