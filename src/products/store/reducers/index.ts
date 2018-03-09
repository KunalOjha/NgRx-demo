import {ActionReducerMap, createSelector, createFeatureSelector} from '@ngrx/store';
import * as fromPizzas from './pizzas.reducer';

//product module's state tree interface; helps us visualize 
// what the state slice - reducer pair looks like
export interface ProductsState {
    pizzas: fromPizzas.PizzaState
}

// this is how we register our reducers for the products module's state tree
// a slice of state is managed by a reducer function
export const productsReducer: ActionReducerMap<ProductsState> = {

    //the key should match the key in the application state its managing
    pizzas: fromPizzas.pizzasReducer
}

// Selectors: The whole point of a Selector is that it allows us to seperate our app state with our component trees.
//We can simply pass the slices we need to a particular component

/* when ProductsModule is loaded, ngrx/store adds this + reducers dynamically to our state tree, wh
    we have one reducer currently (line 15)

const state = {
    products: {
        pizzas: {...}
    }
}
*/


// 'products' comes from 'StoreModule.forFeature('products', productsReducer)' in our module
// we have a storemodule, this particular feature module starts with an object property called 'products'
// all we're doing here is getting the base reference to the 'products' property on our feature state
export const getProductsState = createFeatureSelector<ProductsState>('products');


// pizzas state
// we're going down from 'products' to our 'pizzas' key/state. We can do this with createSelector instead of createFeatureSelector
//get a reference to the next step down a state tree, we pass the 'getProductState' selector to get the .product node
//2nd arg can be another selector or a function...
export const getPizzaState = createSelector(
    getProductsState, 
    (state:ProductsState) => state.pizzas
)

//you can use custom functions to 'jump' down the state tree to the targeted state property
//we do that here using the get functions defined in our reducer file.

// pizzas.reducer.ts:  export const getPizzas = (state:PizzaState) => state.data;
export const getAllPizzas = createSelector(getPizzaState, fromPizzas.getPizzas);
export const getAllPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getAllPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);