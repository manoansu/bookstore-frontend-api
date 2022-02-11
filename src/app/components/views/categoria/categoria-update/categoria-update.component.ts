import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from './../categoria.service';
import { Categoria } from './../categoria-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {
 
  categoria: Categoria ={
    id:'',
    nome:'',
    descricao:''
  }

  constructor(private service: CategoriaService, private router: Router, private routeActivate: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoria.id = this.routeActivate.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById():void{
    this.service.findById(this.categoria.id!).subscribe((response) =>{
      this.categoria = response;
    })
  }

  update():void{
    this.service.update(this.categoria).subscribe((response) =>{
      this.router.navigate(['categorias']);
      this.service.mensagem('Categoria atualizado com sucesso!');
    }, err =>{
      this.service.mensagem('Validar se todos os campos estao preenchido!!');
    })
  }

  cancel():void{
    this.router.navigate(['categorias'])
  }
}
