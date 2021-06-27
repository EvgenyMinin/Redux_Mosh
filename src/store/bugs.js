import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import moment from "moment";

import { apiCallBegan } from "./api";

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
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
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

export const {
  bugAdded,
  bugResolved,
  bugToUserAssigned,
  bugsRequested,
  bugsRequestFailed,
  bugsReceived,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/bugs";
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");

  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

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
