import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok" 
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <div *ngIf="!((pizzas$ | async)?.length)">
          No pizzas, add one to get started.
        </div>
        <pizza-item
          *ngFor="let pizza of (pizzas$ |async)"
          [pizza]="pizza">
        </pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  pizzas: Pizza[];
  pizzas$: Observable<Pizza[]>

  //we can only select things from the store that correspong to the ProductState type
  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    //'products' corresponds to the name we gave our feature store (products.module.ts)
    // StoreModule.forFeature('products', productsReducer)
    //we can also pass in a selector to get a specific slice of the state (getAllPizzas)
    this.pizzas$ = this.store.select(fromStore.gettAllPizzas)
  }
}
