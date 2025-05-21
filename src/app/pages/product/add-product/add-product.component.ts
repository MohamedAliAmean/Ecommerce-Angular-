import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.interface';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  isEditMode = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.*')]],
      category: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (product: Product) => {
        this.productForm.patchValue(product);
      },
      error: (error: Error) => {
        console.error('Error loading product:', error);
        this.router.navigate(['/product/manage']);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      if (this.isEditMode && this.productId) {
        this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
          next: () => {
            this.router.navigate(['/product/manage']);
          },
          error: (error: Error) => {
            console.error('Error updating product:', error);
          }
        });
      } else {
        this.productService.addProduct(this.productForm.value).subscribe({
          next: () => {
            this.router.navigate(['/product/manage']);
          },
          error: (error: Error) => {
            console.error('Error adding product:', error);
          }
        });
      }
    }
  }

  navigateToManage() {
    this.router.navigate(['/product/manage']);
  }

  get f() {
    return this.productForm.controls;
  }
}
