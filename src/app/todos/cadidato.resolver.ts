import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ApiCandidatosService } from '../api-candidatos.service';
import { ObjCandidatos } from "../objCandidato";
//resolver construido para carregamento dos dados antes do component
@Injectable()
 export class candidatoResolver implements Resolve<ObjCandidatos>{
constructor(private candidatoService: ApiCandidatosService){}

resolve(
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot
): Observable<any>|Promise<any>|any{

    
    return this.candidatoService.listarCandidatos().subscribe(res => res);
}


}