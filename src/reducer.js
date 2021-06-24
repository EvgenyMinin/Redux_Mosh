let lastId = 0;
const initialState = [];

function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "bugAdded":
      return [
        ...state,
        {
          id: ++lastId,
          description: payload.description,
          resolve: false,
        },
      ];
    case "bugAdded":
      return state.filter((bug) => bug.id !== payload.id);
    default:
      return state;
  }
}