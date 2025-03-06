import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice/userSlice";
import appSlice from "./appSlice/appSlice";

const store=configureStore({
    reducer:{
        user:userSlice,
        app:appSlice,
    }
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch
export default store