import { LivroService } from './../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from './../livro-model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {
 
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

  delete():void{
    this.service.delete(this.livro.id!).subscribe(() => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Livro deletado com sucesso!");
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Falha ao deletar livro! Tente mais tarde..");
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

}
