import { LivroService } from './../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from './../livro-model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

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
    this.livro.id = this.activatreRoute.snapshot.paramMap.get('id')!;
    this.findBiId();
  }

  findBiId(): void {
    this.service.findById(this.livro.id!).subscribe((response) => {
      this.livro = response;
    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

}
