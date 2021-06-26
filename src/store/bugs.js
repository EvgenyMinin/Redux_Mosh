import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const initialState = [];

const slice = createSlice({
  name: "bugs",
  initialState,
  reducers: {
    // actions => actions handler
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
  },
});

export const { bugAdded, bugResolved } = slice.actions;
export default slice.reducer;

// selector
export const unresolvedBugsSelector = (state) =>
  state.entities.bugs.filter((bug) => !bug.resolved);
