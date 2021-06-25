import configureStore from "./store/configureStore";
import * as actions from "./store/bugs";

const store = configureStore();

store.subscribe(() => {
  console.log("Store changed!");
});

store.dispatch(actions.bugAdded("Bug 1"));
store.dispatch(actions.bugAdded("Bug 2"));
store.dispatch(actions.bugAdded("Bug 3"));

console.log(store.getState()); // [{id: 1, description: 'Bug 1', resolved: false}]

store.dispatch(actions.bugResolved(1));

console.log(store.getState()); // [{id: 1, description: 'Bug 1', resolved: true}]

store.dispatch(actions.bugRemoved(1));

console.log(store.getState()); // []
