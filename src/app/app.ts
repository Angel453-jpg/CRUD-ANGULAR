import {Component, OnInit} from '@angular/core';
import {Products} from './components/products/products';
import {Product} from './models/product';
import {Form} from './components/form/form';
import Swal from 'sweetalert2';
import {ProductService} from './services/product.service';

@Component({
  selector: 'app-root',
  imports: [
    Products,
    Form
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  constructor(private service: ProductService) {
  }

  products: Product[] = [];
  productSelected: Product = new Product();

  ngOnInit(): void {
    this.service.findAll().subscribe(products => this.products = products)
  }

  addProduct(product: Product): void {

    if (product.id > 0) {

      this.service.update(product).subscribe(productUpdated => {
        this.products = this.products.map(prod => {
          if (prod.id == product.id) {
            return {...productUpdated}
          }
          return prod;
        });

        Swal.fire({
          title: "Producto actualizado correctamente!",
          text: `Producto ${productUpdated.name} Actualizado con exito!`,

          icon: "success"
        });
      })


    } else {
      this.service.create(product).subscribe(productNew => {
        this.products = [...this.products, {...productNew}];

        Swal.fire({
          title: "Producto Creado!",
          text: `Producto ${productNew.name} Actualizado con exito!`,
          icon: "success"
        });
      });

    }

  }

  onUpdateProductEvent(product: Product): void {
    this.productSelected = {...product};
  }

  onRemoveProductEvent(id: number): void {

    Swal.fire({
      title: "Seguro que quieres eliminar?",
      text: "Cuidado se eliminara el producto del sistema!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.remove(id).subscribe(productDeleted => {

          this.products = this.products.filter(product => product.id != id);

          Swal.fire({
            title: "Producto Eliminado!",
            text: `Producto ${productDeleted.name} eliminado con exito!`,
            icon: "success"
          });
        });
      }
    });

  }

}
