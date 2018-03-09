import  { Injectable, Inject } from '@angular/core';
//Actions - an observable, we can listen to the types of actions being dispatched and respond accordingly
import { Effect, Actions } from '@ngrx/effects'
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


import * as pizzaActions from '../actions/pizzas.actions';
import * as fromServices from '../../services'

@Injectable()
//effects are essentially a class with a few properties that happen to be observables
//Our observables get called by ngrx, and in a way, act like a reducer. It allows us to respond to different action events
export class PizzasEffects {
    constructor(private actions$: Actions, private pizzaService: fromServices.PizzasService) {}
        //listen for action event of type...
        
        @Effect() //mark loadPizzas$ as an effect. 
        //By default an effect will dispatch the returned action back to the reducer
        loadPizzas$ = this.actions$
        //subsribe to listen for dispatched 'load_pizzas' actions observable
        // when received, switch to a brand new observable/stream (line 24)
            .ofType(pizzaActions.LOAD_PIZZAS)
            .pipe(switchMap(()=> {
                return this.pizzaService.getPizzas().pipe(
                //getPizzas returns an observable of our http response/ array of pizzas
                //we use the response to create our new action which is an observable
/*success -map*/    map(pizzas =>  new pizzaActions.LoadPizzasSuccess(pizzas)),
/*fail -catchErr*/  catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
                )
            }));
    }