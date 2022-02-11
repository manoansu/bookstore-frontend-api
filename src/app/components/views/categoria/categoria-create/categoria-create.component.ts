import { Categoria } from './../categoria-model';
import { CategoriaService } from './../categoria.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  constructor(private route: Router, private service: CategoriaService) { }

  ngOnInit(): void {
  }

  create():void{
    this.service.create(this.categoria).subscribe(response =>{
      this.route.navigate(['categorias']);
      this.service.mensagem('Categoria registrado com sucesso!');
    }, err =>{
      for(let i = 0; i< err.error.errors.length; i++){
        this.service.mensagem(err.error.errors[i].message);
      }
    })
  }



}
