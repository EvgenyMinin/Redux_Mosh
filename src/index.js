import store from "./store";
import { bugAdded, bugRemoved, bugResolved } from "./actions";

store.dispatch(bugAdded("Bug 1"));

console.log(store.getState()); // [{id: 1, description: 'Bug 1', resolved: false}]

store.dispatch(bugResolved(1));

console.log(store.getState()); // [{id: 1, description: 'Bug 1', resolved: true}]

store.dispatch(bugRemoved(1));

console.log(store.getState()); // []
