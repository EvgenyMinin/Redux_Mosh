import * as actions from "./actionTypes";

let lastId = 0;
const initialState = [];

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actions.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: payload.description,
          resolved: false,
        },
      ];
    case actions.BUG_RESOLVED:
      return state.map((bug) =>
        bug.id !== payload.id ? bug : { ...bug, resolved: true }
      );
    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== payload.id);
    default:
      return state;
  }
}
