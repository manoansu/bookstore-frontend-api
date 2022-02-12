import { Livro } from './livro-model';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAll(id_cat:String):Observable<Livro[]>{
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.http.get<Livro[]>(url); 
  }
}
