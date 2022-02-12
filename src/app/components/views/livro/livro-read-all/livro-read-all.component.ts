import { LivroService } from './../livro.service';
import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  livros: Livro[] = [];

  id_cat:String = '';

  displayedColumns: string[] = ['id', 'titulo', 'livros', 'acoes'];

  constructor(private service:LivroService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cat = this.activateRoute.snapshot.paramMap.get('id_cat')!;
    this.findAll();
  }

  findAll():void{
    this.service.findAll(this.id_cat).subscribe((response) =>{
      this.livros = response;
      console.log(this.livros);
    })
  }

}
