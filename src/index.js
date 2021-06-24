import store from "./store";

store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug 1",
  },
});

console.log(store.getState()); // [{id: 1, description: 'Bug 1', resolve: false}]

store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1,
  },
});

console.log(store.getState()); // []
