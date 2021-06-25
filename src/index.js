import store from "./store";
import * as actions from "./actionTypes";

const unsubscribe = store.subscribe(() => {
  console.log(`Store Changed`, store.getState());
});

store.dispatch({
  type: actions.BUG_ADDED,
  payload: {
    description: "Bug 1",
  },
});

console.log(store.getState()); // [{id: 1, description: 'Bug 1', resolve: false}]

unsubscribe();

store.dispatch({
  type: actions.BUG_REMOVED,
  payload: {
    id: 1,
  },
});

console.log(store.getState()); // []
