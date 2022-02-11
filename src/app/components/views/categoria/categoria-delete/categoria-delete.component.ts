import { Categoria } from './../categoria-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById():void{
    this.service.findById(this.categoria.id!).subscribe((response) =>{
      this.categoria = response;
      console.log(response);
    })
  }
  
  delete():void{
    this.service.delete(this.categoria.id!).subscribe((Response) =>{
      this.router.navigate(['categorias']);
      this.service.mensagem('Categoria removido com sucesso!');
    }, err =>{
      this.service.mensagem(err.error.errorMessage);
    })
  }

  cancel():void{
    this.router.navigate(['categorias']);
  }
}
