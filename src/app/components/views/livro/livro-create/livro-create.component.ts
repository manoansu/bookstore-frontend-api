import { LivroService } from './../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from './../livro-model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  titulo = new FormControl("", [Validators.minLength(3)]);
  autor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  id_cat:String = '';

  livro: Livro ={
    id: '',
    titulo: '',
    autor:'',
    texto: ''
  }

  constructor(private router:Router, private service: LivroService, private activatreRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cat = this.activatreRoute.snapshot.paramMap.get('id_cat')!;
  }

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe((response) =>{
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Livro registrado com sucesso!");
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Erro ao criar novo livro! Tente mais tarde");
    });
  }

  getMessage() {
    if(this.titulo.invalid){
      return "O campo TITULO de conter entre 3 e 100 caracteres";
    }
     if(this.autor.invalid){
      return "O campo NOME DO AUTOR de conter entre 3 e 100 caracteres";
    }
     if(this.texto.invalid){
      return "O campo TEXTO de conter entre 10 e 100 caracteres";
    }
    return false;
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
