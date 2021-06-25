import configureStore from "./store/configureStore";
import * as actions from "./store/bugs";

const store = configureStore();

store.subscribe(() => {
  console.log("Store changed!");
});

store.dispatch(actions.bugAdded({ description: "Bug 1" }));
store.dispatch(actions.bugAdded({ description: "Bug 2" }));
store.dispatch(actions.bugAdded({ description: "Bug 3" }));

console.log(store.getState()); // [{id: 1, description: 'Bug 1', resolved: false}]

store.dispatch(actions.bugResolved({ id: 1 }));

console.log(store.getState()); // [{id: 1, description: 'Bug 1', resolved: true}]

store.dispatch(actions.bugRemoved({ id: 1 }));

console.log(store.getState()); // []
