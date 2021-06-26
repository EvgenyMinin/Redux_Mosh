import configureStore from "./store/configureStore";
import { bugAdded, bugResolved, unresolvedBugsSelector } from "./store/bugs";
import { projectAdded } from "./store/projects";

const store = configureStore();

store.subscribe(() => {
  console.log("Store changed!");
});

store.dispatch(projectAdded({ name: "Project 1" }));

store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));

console.log(store.getState()); // [{id: 1, description: 'Bug 1', resolved: false}]

store.dispatch(bugResolved({ id: 1 }));

console.log(store.getState()); // [{id: 1, description: 'Bug 1', resolved: true}]

// store.dispatch(actions.bugRemoved({ id: 1 }));

const unresolvedBugs = unresolvedBugsSelector(store.getState());

console.log(`unresolvedBugs`, unresolvedBugs);

console.log(store.getState());

