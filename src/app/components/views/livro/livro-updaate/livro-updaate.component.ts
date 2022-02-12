import { LivroService } from './../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from './../livro-model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-updaate',
  templateUrl: './livro-updaate.component.html',
  styleUrls: ['./livro-updaate.component.css']
})
export class LivroUpdaateComponent implements OnInit {

  titulo = new FormControl("", [Validators.minLength(3)]);
  nome_autor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  id_cat:String = '';

  livro: Livro ={
    id: '',
    titulo: '',
    nome_autor:'',
    texto: ''
  }

  constructor(private router:Router, private service: LivroService, private activatreRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cat = this.activatreRoute.snapshot.paramMap.get('id_cat')!;
    this.livro.id = this.activatreRoute.snapshot.paramMap.get('id')!;
    this.findBiId();
  }

  findBiId(): void {
    this.service.findById(this.livro.id!).subscribe((response) => {
      this.livro = response;
    })
  }

  update(): void {
    this.service.update(this.livro).subscribe((responde) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Livro atualizado com sucesso!");
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Falha ao atualizarlivro! Tente mais tarde..");
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessage() {
    if(this.titulo.invalid){
      return "O campo TITULO de conter entre 3 e 100 caracteres";
    }
     if(this.nome_autor.invalid){
      return "O campo NOME_AUTOR de conter entre 3 e 100 caracteres";
    }
     if(this.texto.invalid){
      return "O campo TEXTO de conter entre 10 e 100 caracteres";
    }
    return false;
  }

 

}
