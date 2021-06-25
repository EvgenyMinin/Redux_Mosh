// Action types
const BUG_ADDED = "BUG_ADDED";
const BUG_REMOVED = "BUG_REMOVED";
const BUG_RESOLVED = "BUG_RESOLVED";

// Action Creators
export const bugAdded = (description) => ({
  type: BUG_ADDED,
  payload: {
    description,
  },
});

export const bugRemoved = (id) => ({
  type: BUG_REMOVED,
  payload: {
    id,
  },
});

export const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: {
    id,
  },
});

// Reducer
let lastId = 0;
const initialState = [];

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: payload.description,
          resolved: false,
        },
      ];
    case BUG_RESOLVED:
      return state.map((bug) =>
        bug.id !== payload.id ? bug : { ...bug, resolved: true }
      );
    case BUG_REMOVED:
      return state.filter((bug) => bug.id !== payload.id);
    default:
      return state;
  }
}
