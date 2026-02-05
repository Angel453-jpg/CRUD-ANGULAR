import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../models/product';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'product-form',
  imports: [
    FormsModule
  ],
  templateUrl: './form.html'
})
export class Form {

  @Input() product: Product = new Product();

  @Output() addProductEvent = new EventEmitter();

  onSubmit(productForm: NgForm): void {
    console.log(this.product);

    if (productForm.valid) {
      console.log(this.product);
      this.addProductEvent.emit(this.product);
      this.clearForm();
      productForm.reset();
      productForm.resetForm();
    }

  }

  clearForm(): void {
    this.product = new Product();
  }

}
