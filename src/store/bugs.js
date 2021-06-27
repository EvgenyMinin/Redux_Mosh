import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;
const initialState = {
  list: [],
  loading: false,
  lastFetch: null,
};

const slice = createSlice({
  name: "bugs",
  initialState,
  reducers: {
    // actions => actions handler
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugToUserAssigned: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
  },
});

export const { bugAdded, bugResolved, bugToUserAssigned } = slice.actions;
export default slice.reducer;

// selector
export const unresolvedBugsSelector = createSelector(
  (state) => state.entities.bugs,
  (data) => data.filter((bug) => !bug.resolved)
);

export const bugsByUserSelector = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (data) => data.filter((bug) => bug.userId === userId)
  );
