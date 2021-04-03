/*
 * File: contactSlice.ts
 * Created: Saturday April 3rd 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 3rd 2021 1:49pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import { 
    createSlice, 
    createAsyncThunk, 
    createEntityAdapter 
} from "@reduxjs/toolkit";
import * as API from "../serverApi";
import { RootState } from "../store";

/** Thunks -------------------------------------------------------------------------------------- */

export const submitForm = createAsyncThunk(
    "contact/submit",
    async () => {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                if(Math.random() > 0.8){
                    return reject("Issue with the form content");
                }

                resolve("Successful!");
            }, 3000);
        });
    }
);

/** Slice --------------------------------------------------------------------------------------- */

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        loading: false,
        validated: false,
        form: {
            name: "",
            email: "",
            subject: "",
            message: ""
        }
    },
    reducers: {
        updateInput(state, { payload }: { payload: { target: string, value: string } }){
            if(payload){
                switch(payload.target){
                    case "name":
                        state.form.name = payload.value;
                        break;

                    case "email":
                        state.form.email = payload.value;
                        break;

                    case "subject":
                        state.form.subject = payload.value;
                        break;

                    case "message":
                        state.form.message = payload.value;
                        break;
                }
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(submitForm.fulfilled, (state, action) => {
                console.log("submitForm Fulfilled:", action.payload);
            })
            .addCase(submitForm.rejected, (state, action) => {
                console.log("submitForm Rejected:", action.payload);
            })
    }
});

/** Exports ------------------------------------------------------------------------------------- */

// Selectors 
export const getIsLoading = (state: RootState) => state.contact.loading;
export const getIsValidated = (state: RootState) => state.contact.validated;
export const getForm = (state: RootState) => state.contact.form;

// Actions
export const { updateInput } = contactSlice.actions;

// Reducers
export default contactSlice.reducer;