import { Pizza } from '../../models/pizza.model';
import * as actions from '../actions/pizzas.actions';

export interface PizzaState {
    loaded: boolean;
    loading: boolean;
    data: Pizza[];
}

 //our reducer binds its initial state object to the store when it's first initialized
export const initialState: PizzaState = {
    loaded: false,
    loading: false,
    data: []
}

export function pizzasReducer(state = initialState, action: actions.PizzasAction): PizzaState {

    switch(action.type) {
        //we'll call this when the component loads [ngOninit]
        case actions.LOAD_PIZZAS: {
            return {
                ...state, 
                loading: true,
            }
        }
        //expect to get this action event from the effect if the pizzaService gets us back a successful response from the server
        case actions.LOAD_PIZZAS_SUCCESS: {
            const data = action.payload;
            return {
                ...state, 
                loading: false,
                loaded: true,
                data
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
