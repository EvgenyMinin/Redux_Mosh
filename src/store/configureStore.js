import { configureStore } from "@reduxjs/toolkit";

import logger from "./middleware/logger";
import func from "./middleware/func";
import toast from "./middleware/toast";

import reducer from "./reducer";

export default function () {
  return configureStore({
    reducer,
    middleware: [logger({ destination: "console" }), func, toast],
  });
}
