import { Component } from '@angular/core';
import { ApiCandidatosService } from './api-candidatos.service';
import { ObjCandidatos } from './objCandidato';
import {TodosComponent} from './todos/todos.component';
//declara o Jquery (usado por motivos de tempo para desenvolvimento, rotas para todos os filtros seria mais elegante)
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  candidatosAPP : Array<ObjCandidatos>
  constructor(private candidatoService: ApiCandidatosService,
  
  ) { }
  title = 'app';
  ngOnInit() {
    //lista candidados é chamada do serviço.
    this.candidatoService.listarCandidatos().subscribe(res => this.candidatosAPP = res);
    this.candidatoService.listarCandidatos().subscribe(res => console.log(res));
    
       
  }
  ngAfterViewInit(){
    $(document).ready(function() {
      BotaoEvento();
      Search();          
     });
     
     function Paginar(){
      //variaveis
      let i =0;
      let pag = 2;
      let index =1;
      let paginas='<td name="pag"><button class="btn btn-light  link" name="pagina" id="numero__1">1</button></td>';
       //criando paginação para cada elemento visivel
       $('[name=show]').each(function(){
           i++;
           $(this).attr('id',index);
 
         
 
           
           if(i ==7){
             //cria a lista de botões
             paginas= `${paginas}<td name="tdPag" class="link"><button class="btn btn-light  link" name="pagina" id="numero__${pag}">${pag}</button></td>`;
             index++;
             pag++;           
             i=0;
             
             
           } 
           SetPag(paginas);             
        });
        EventosPag();    
     }
     
 
     function EventosPag() {
       //prepara a listagem de botões para receber o evento click
       $('[name^=pagina]').on('click', function(event){
           //atualiza o index da pagina para a pagina correta     
         $('[name=tabela]').attr('data-pag',$(this).text());
         
         
         IniciarPag();
            
               
           
       });    
     }

     function SetPag(paginas){
       //removendo as paginações antigas e colocando as novas
       $('#paginas').empty();
       $('#tabelaPag').html('<tr class="col-md-5"  id="paginas"></tr>');
       $('#paginas').html(paginas);
     }

     //inicia o filtro da paginação das linhas
     function  IniciarPag(){
       $('[name=show]').each(function(){
           if( $('[name=tabela]').attr('data-pag')!=  $(this).attr('id') )
              $(this).hide();
           else
             $(this).css('display', 'none').fadeIn('slow').show();
       });  
     }
     
     function BotaoEvento(){
        //mostrar todos
        $('#todos').click(function(){
        //atualização do controle da tabela.
        $('[name=tabela]').attr('id','0');
        $('[name=tabela]').attr('data-pag','1');
        //reset dos filtros
        $('[data-status="lixo"],[data-status="pendente"],[data-status="atendido"]').attr('name','show').css('display', 'none').fadeIn('slow').show();
        Paginar();
        IniciarPag();
        });
      }

      function Search(){
        //metodo de busca da searchBar permite buscar pelo nome, email, cidade, sobrenome, estado e telefone
        $('#inputSearch').on('keyup', function() {
          var value = $(this).val().toLowerCase();
          $('[name=show]').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
           
          });
          if($(this).val()==""){
            Paginar();
            IniciarPag();
          }
        });
      }
  }
  // responsavel por retornar a lista estatica quando ela for chamada
  Tranferirlista(){ 
    
    return this.candidatosAPP;

    
  }

 
}
