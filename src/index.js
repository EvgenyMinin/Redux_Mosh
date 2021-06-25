import store from "./store";
import { bugAdded, bugRemoved } from "./actions";

const unsubscribe = store.subscribe(() => {
  console.log(`Store Changed`, store.getState());
});

store.dispatch(bugAdded("Bug 1"));

console.log(store.getState()); // [{id: 1, description: 'Bug 1', resolve: false}]

unsubscribe();

store.dispatch(bugRemoved(1));

console.log(store.getState()); // []
