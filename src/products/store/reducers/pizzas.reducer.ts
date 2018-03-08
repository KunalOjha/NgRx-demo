import { Pizza } from '../../models/pizza.model';
import * as actions from '../actions/pizzas.actions';

export interface PizzaState {
    data: Pizza[];
    loaded: boolean;
    loading: boolean;
    
}

 //our reducer binds its initial state object to the store when it's first initialized
export const initialState: PizzaState = {
    data: [  
        {
        "name": "Blazin' Inferno",
        "toppings": [
          {
            "id": 10,
            "name": "pepperoni"
          },
          {
            "id": 9,
            "name": "pepper"
          },
          {
            "id": 3,
            "name": "basil"
          },
          {
            "id": 4,
            "name": "chili"
          },
          {
            "id": 7,
            "name": "olive"
          },
          {
            "id": 2,
            "name": "bacon"
          }
        ],
        "id": 1
      }
    ],
    loaded: false,
    loading: false
}

export function pizzasReducer(state = initialState, action: actions.PizzasAction) :PizzaState {

    switch(action.type) {

        case actions.LOAD_PIZZAS: {
            return {
                ...state, 
                loading: true,
            }
        }

        case actions.LOAD_PIZZAS_SUCCESS: {
            return {
                ...state, 
                loading: false,
                loaded: true
            }
        }

        case actions.LOAD_PIZZAS_FAIL: {
            return {
                ...state, 
                loading: false,
                loaded: false
            }
        }
    }
    return state;
    //we need to return the state, this will help us when our reducer binds the initial state 
    //object to the store when it's first initialized
}

//these are functions that get passed the small level of the pizza state.
//we want to export these functions to 'createSelector' functions.
export const getPizzasLoading = (state:PizzaState) => state.loading;
export const getPizzasLoaded = (state:PizzaState) => state.loaded;
export const getPizzas = (state:PizzaState) => state.data;
