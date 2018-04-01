import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodosComponent } from '../todos/todos.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  email: string;
  inscricao: Subscription;
  constructor(
    private route: ActivatedRoute,
    private obj: TodosComponent 
  ) {
    
   }
  
  ngOnInit() {
     // person seria a tela "filha" da listagem da rotas que receberia a lsita de candidatos e faria a chamada pelo email
  }

}
