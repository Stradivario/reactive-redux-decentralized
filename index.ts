import { of, Subject, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  Action,
  AsyncType,
  createStore
} from '@reactive-redux/store';

//Counter example
type State = number;
 
class Stop extends Action {}
 
class Start extends Action {}
 
type ActionsUnion = Stop | Start;
 
const actionQ = new Subject<AsyncType<ActionsUnion>>();
 
const initialState = 0;
 
const start = (state: State, action: Stop) => state + 1;
 
const stop = (state: State, action: Start) => state - 1;
 
const initialState$ = of(initialState);
const actions$ = actionQ.asObservable();
const actionMap$ = of({
  ['Start']: start,
  ['Stop']: stop
});
 
const { state$ } = createStore<State, AsyncType<ActionsUnion>>({
  initialState$,
  actions$,
  actionMap$ 
});
 
const add1 = new Start();
 
const add1times = n => interval(200).pipe(
  map(() => add1),
  take(n)
);
 
//dispaching an observable action
actionQ.next(add1times(10));
 
state$.subscribe(console.log);