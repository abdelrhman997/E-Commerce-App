import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { CommonModule } from '@angular/common';
import { Icategory } from '../../models/icategory';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule,FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements AfterViewInit {
  products:Iproduct[];
  categories:Icategory[];
  totalOrderPrice:number =0;
  selectedCategoryId:number=0;
  filteredProducts:Iproduct[];

  @ViewChild('countInput') countInput! :ElementRef

  constructor(){
    this.products = [
      {id:100 , name:'huawei',price: 500 ,quantity: 20 , imgUrl :'data:image/jpeg;base64,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',categoryId: 1},
      {id:200 , name:'samsung',price: 700 ,quantity: 0 , imgUrl :'https://2b.com.eg/media/catalog/product/cache/45bcba66b667d1ca52af48b101a5f0cb/s/a/samsung-galaxy-a06-blue-1.jpg',categoryId: 1},
      {id:300 , name:'dell',price: 22500 ,quantity: 25 , imgUrl :'https://5.imimg.com/data5/KU/QR/MY-10167030/dell-laptops.jpg',categoryId:2},
      {id:400 , name:'lenovo',price: 18550 ,quantity: 0 , imgUrl :'https://egyptlaptop.com/images/detailed/59/Lenovo_ThinkPad_E14_Gen_5.webp',categoryId: 2},
      {id:500 , name:'optiplex',price: 9250 ,quantity: 25 , imgUrl :'https://m.media-amazon.com/images/I/51Fa1jH0zaL._UF894,1000_QL80_.jpg',categoryId:3},
      {id:600 , name:'lenovo',price: 8750 ,quantity: 15 , imgUrl :'https://m.media-amazon.com/images/I/61lhW+242-L._AC_SL1080_.jpg',categoryId:3}
    ]
    this.categories = [
      {id:1,name:"mob"},
      {id:2,name:"laptops"},
      {id:3,name:"computors"}
    ]
    this.filteredProducts = this.products
      
    
  }
  ngAfterViewInit(): void {
    console.log(this.countInput)
  }
  buy(count:string, prod:Iproduct) {

    this.totalOrderPrice +=  Number(count) * prod.price;
    prod.quantity = prod.quantity - +count;

    
  };
filterCategory(){

  if(this.selectedCategoryId == 0){

  this.filteredProducts == this.products
  }else
  this.filteredProducts = this.products.filter((prd)=>prd.categoryId == this.selectedCategoryId);
}
}
