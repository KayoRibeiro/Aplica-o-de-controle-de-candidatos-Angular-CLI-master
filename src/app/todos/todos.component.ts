import { Component, OnInit } from '@angular/core';
import { ApiCandidatosService } from '../api-candidatos.service';
import { ObjCandidatos } from '../objCandidato';
import { AppComponent } from '../app.component';
//declara o Jquery (usado por motivos de tempo para desenvolvimento, rotas para todos os filtros seria mais elegante)
declare var $:any;
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  candidatos : Array<ObjCandidatos>;
  //contrutor da api
  constructor(private candidatoService: AppComponent) { }

  ngOnInit() {}  

  ngAfterViewInit(){
    //controle basico de dados via Jquery
    $(document).ready(function() {
      BotoesEventos();
      Paginar();
      EventosPag();
      IniciarPag();
      Candidato();

      
     });
     let flag = false;
     let element ="";
     //metodo de controle para os detalhes do candidato
     function Candidato(){
      $('[name=chamardetalhe]').click(function(event) {
        event.preventDefault();
        if(flag==false || element ==  $(this).closest('[data-index]').attr('data-index')){
        $('#wrapper').toggleClass('toggled');
        element =  $(this).closest('[data-index]').attr('data-index');
        if(flag==false)
        flag=true;
        else
        flag=false;

        //atribuição das informações do candidato
        $('#cadidatoNome').text($(this).find('[name=candidatoNome]').text());
        $('#imagemCandidato').attr('src',$(this).find('[name=imagemCandidato]').attr('id'));
        $('#local').text($(this).find('[name=candidatoLocal]').text());
        $('#candidatoEmail').text($(this).find('[name=candidatoEmail]').text()).hide();
        $('#candidatoDob').text($(this).find('[name=candidatoEmail]').attr('id')).hide();
        }
      });
      //botão informação email
       $('#email').on('click', function(event){

        CamposDetalhe(1);
       });
       //botão informação
       $('#dob').on('click', function(event){

        CamposDetalhe(2);
       });
       // botão de fechar a side bar
       $('#fecharDetalhe').on('click', function(event){
        event.preventDefault();
        $('#wrapper').toggleClass('toggled');
        flag=false;

       });
     }
     //campo que mostra a informação detalhe do candidato parametro botão
     function CamposDetalhe(index){
      $('[name=tabelaDetalhesCandidato]').find('div').each(function(){

        if($(this).attr('data-index')!= index )
        $(this).hide();
        else
        $(this).show();
      });


     }
     function BotoesEventos(){
        //alteração da linha para todos(pendente).
      $('[name^=btn_todos]').on('click',function(event){
        $(this).closest('[data-index]').attr('data-status','pendente').find('#status').attr('class','pendente').text('(Pendente)');
        irParaOutroFiltro(this, 0);
        
      });

      //alteração da linha para atendido.
      $('[name^=btn_atendido]').on('click',function(event){
        $(this).closest('[data-index]').attr('data-status','atendido').find('#status').attr('class','atendido').text('(Atendido)');
        irParaOutroFiltro(this, 1);
       
      });

      //alteração da linha para lixo.
      $('[name^=btn_lixo]').on('click',function(event){
        $(this).closest('[data-index]').attr('data-status','lixo').find('#status').attr('class','lixo').text('(Deletado)');
        irParaOutroFiltro(this, 2);
        
      });
    
      //Filtro de exibição  de Atendidos.
      $('[name=atendido]').on('click', function(event){
        //efeito de fade por elegancia.
        $('[data-status="atendido"]').attr('name','show').css('display', 'none').fadeIn('slow').show();
        //esconde os campos que não foram  atendidos.
        $('[data-status="lixo"],[data-status="pendente"]').attr('name','hide').hide();
        //altera o controle da tabela.
        $('[name=tabela]').attr('id','1');
        // reset do filtro de paginação
        $('[name=tabela]').attr('data-pag','1');
        // reset da paginação
        Paginar();
        IniciarPag();
      });

    

       //Filtro de exibição  de lixo.
       $('[name=lixeira]').on('click', function(event){
         //efeito de fade por elegancia.
        $('[data-status="lixo"]').attr('name','show').css('display', 'none').fadeIn('slow').show();
        //esconde os campos que não foram deletados
        $('[data-status="atendido"],[data-status="pendente"]').attr('name','hide').hide();
        //altera o controle da tabela.
        $('[name=tabela]').attr('id','2');
         // reset do filtro de paginação
        $('[name=tabela]').attr('data-pag','1');
        // reset da paginação
        Paginar();
        IniciarPag();
      });
     }

     function irParaOutroFiltro(elemento, end){
      //redireciona a linha para outro filtro.
      if($('[name=tabela]').attr('id') != end && $('[name=tabela]').attr('id') !=0){
      $(elemento).closest('[data-index]').attr('name','hide').hide();
      Paginar();
      IniciarPag();
      }
    }

    
    
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

        

          
          if(i ==6 && $('[name=show]').length> i){
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
            $(this).show();
      });  
    }
  }
  ngAfterContentChecked(){
    //chamada da lista estatica que esta no APPcomponent.
    this.listar(); 
   
  }
  listar(){
    this.candidatos= Object.assign(this.candidatoService.Tranferirlista());    
        
  }
}
