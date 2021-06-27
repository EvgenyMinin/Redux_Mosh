import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugToUserAssigned,
  bugsByUserSelector,
} from "./store/bugs";
import { userAdded } from "./store/users";
import { projectAdded } from "./store/projects";

const store = configureStore();

store.subscribe(() => {
  console.log("Store changed!");
});

// store.dispatch(projectAdded({ name: "Project 1" }));

// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugAdded({ description: "Bug 3" }));

store.dispatch(userAdded({ name: "User 1" }));
// store.dispatch(userAdded({ name: "User 2" }));

// store.dispatch(bugToUserAssigned({ bugId: 1, userId: 1 }));

// store.dispatch(bugResolved({ id: 1 }));

const bugsByUser = bugsByUserSelector(1)(store.getState());

console.log(`bugsByUser`, bugsByUser)

console.log(store.getState());
