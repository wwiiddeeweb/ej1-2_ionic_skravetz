import { Component, OnInit } from '@angular/core';
import { productDB } from '../../data/productdb.data';
import { Product } from '../../login/model/product.model';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.page.html',
  styleUrls: ['./productlist.page.scss'],
})
export class ProductlistPage implements OnInit {
  public productList: Product[] = [];

  constructor() {
    this.productList = productDB;
  }

  ngOnInit() {
  }
}
