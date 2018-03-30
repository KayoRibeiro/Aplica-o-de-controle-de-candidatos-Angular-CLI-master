import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubjectSubscriber } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import { ObjCandidatos } from './objCandidato';


@Injectable()
export class ApiCandidatosService {

  candidatosUrl ='https://randomuser.me/api/?results=70';
  constructor(private http :HttpClient) {    }

  //chama a api e retorna um objeto any  com todos os candidados requeridos
  listarCandidatos()
  {

  
    
    return this.http.get<any>(`${this.candidatosUrl}`);
    
  }

  
}
