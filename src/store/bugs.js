import { createAction } from "@reduxjs/toolkit";

// Action types
const BUG_ADDED = "BUG_ADDED";
const BUG_REMOVED = "BUG_REMOVED";
const BUG_RESOLVED = "BUG_RESOLVED";

// Action Creators
export const bugAdded = createAction("bugAdded");
export const bugResolved = createAction("bugResolved");
export const bugRemoved = createAction("bugRemoved");

// Reducer
let lastId = 0;
const initialState = [];

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastId,
          description: payload.description,
          resolved: false,
        },
      ];
    case bugResolved.type:
      return state.map((bug) =>
        bug.id !== payload.id ? bug : { ...bug, resolved: true }
      );
    case bugRemoved.type:
      return state.filter((bug) => bug.id !== payload.id);
    default:
      return state;
  }
}
