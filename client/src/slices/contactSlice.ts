/*
 * File: contactSlice.ts
 * Created: Saturday April 3rd 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 3rd 2021 8:18pm
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
    API.submitContactForm
);

/** Slice --------------------------------------------------------------------------------------- */

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        loading: false,
        validated: false,
        response: "",
        form: {
            name: "",
            email: "",
            subject: "",
            message: ""
        }
    },
    reducers: {
        updateInput(state, { payload }: { payload: { target: string, value: string } }){
            const validate = () => {
                state.validated = !!state.form.name &&
                                  !!state.form.email &&
                                  !!state.form.subject &&
                                  !!state.form.message;
            };
            
            if(payload){
                switch(payload.target){
                    case "name":
                        state.form.name = payload.value;
                        return validate();

                    case "email":
                        state.form.email = payload.value;
                        return validate();

                    case "subject":
                        state.form.subject = payload.value;
                        return validate();

                    case "message":
                        state.form.message = payload.value;
                        return validate();
                }
            }
        },
        setLoading(state, { payload }: { payload: boolean }){
            if(payload != undefined)
                state.loading = payload;
        },
        clearResponse(state, { payload }: { payload?: string }){
            state.response = "";
        }
    },
    extraReducers: builder => {
        builder
            .addCase(submitForm.fulfilled, (state, action) => {
                state.response = "Fulfilled: " + action.payload;
                console.log("submitForm Fulfilled:", action.payload);
                state.loading = false;

                state.form.name = "";
                state.form.email = "";
                state.form.subject = "";
                state.form.message = "";
            })
            .addCase(submitForm.rejected, (state, action) => {
                state.response = "Rejected: " + action.error.message;
                console.log("submitForm Rejected:", action.error.message);
                state.loading = false;
            })
    }
});

/** Exports ------------------------------------------------------------------------------------- */

// Selectors 
export const getIsLoading = (state: RootState) => state.contact.loading;
export const getIsValidated = (state: RootState) => state.contact.validated;
export const getForm = (state: RootState) => state.contact.form;
export const getResponse = (state: RootState) => state.contact.response;

// Actions
export const { updateInput, setLoading, clearResponse } = contactSlice.actions;

// Reducers
export default contactSlice.reducer;