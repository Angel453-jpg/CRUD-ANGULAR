import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private url: string = "http://localhost:8080/api/products";

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, product);
  }

  update(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.url}/${product.id}`, product);
  }

  remove(id:number):Observable<Product>{
    return this.httpClient.delete<Product>(`${this.url}/${id}`);
  }

}
