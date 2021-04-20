/*
 * File: ContactForm.tsx
 * Created: Saturday March 13th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday April 20th 2021 4:16pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-04-20	TvB	Added react helmet support
 * 2021-04-03	TvB	Updated to use the new contactSlice
 * 2021-03-15   TvB	Refactored to use react function components
 */

import { 
    getIsValidated, 
    clearResponse,
    getIsLoading, 
    updateInput, 
    getResponse,
    setLoading, 
    submitForm, 
    getForm
} from "../slices/contactSlice";
import React, { useState } from 'react';
import Spinner from "../spinner/Spinner";
import style from "./ContactForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

type InputTarget= { target: HTMLInputElement | HTMLTextAreaElement };

/** Contact form */
function ContactForm(){
    useDispatch()(clearResponse());

    return (
        <div>
            <Helmet>
                <title>Contact: vanbommel.ca</title>
                <meta name="description" content="Get in touch! Contact form." />
            </Helmet>
            <Element />
        </div>   
    );
}

function Element(){
    const loading = useSelector(getIsLoading);
    const response = useSelector(getResponse);

    return (
        <div>
            { !!response ? (
                <div className={ style.response }>{ response }</div>
            ) : ("") }
            { !loading ? (
                <div>
                    <Form />
                    <address className={ style.address }>
                        <p>Alternatively send an email to:</p>
                        <a href="mailto:thomas@vanbommel.ca">thomas@vanbommel.ca</a>
                    </address>
                </div>
            ) : (
                <div className={ style.spinner }>
                    <Spinner />
                    <p>Awaiting server response...</p>
                </div>
            ) }
        </div>
    );
}

function Form(){
    const dispatch = useDispatch();
    const validated = useSelector(getIsValidated);
    const form = useSelector(getForm);

    // Handle input change
    const handleInputChange = ({ target }: InputTarget) => {
        switch(target.name){
            case "name":
            case "email":
            case "subject":
            case "message":
                dispatch(updateInput({
                    target: target.name, 
                    value: target.value
                }));
        }
    }

    // Handle form submission
    const handleFormSubmission = (event: React.FormEvent) => {
        event.preventDefault();

        dispatch(setLoading(true));
        dispatch(submitForm(form));
    }

    return (
        <div>
            <form className={ style.container } onSubmit={ handleFormSubmission }>
                <h1 className={ style.title }>Message me</h1>
                <Input label="name" value={ form.name } onChange={ handleInputChange } />
                <Input label="email" value={ form.email } onChange={ handleInputChange } pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                <Input label="subject" value={ form.subject } onChange={ handleInputChange } />

                <label htmlFor="message">Message</label>
                <textarea 
                    className={ !!form.message ? null : style.invalid }
                    onChange={ handleInputChange } 
                    value={ form.message } 
                    name="message" 
                    id="message" 
                    cols={ 30 } 
                    rows={ 5 } 
                    required
                ></textarea>

                <input type="submit" value="Submit" disabled={ !validated } />
            </form>
            
        </div>
    );
}

/** Form 'text' input elements */
function Input({ label, value, onChange, pattern=".*" }
    : { label: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement>, pattern?: string } ){

    // Copy label, capitalize the first letter, and pad with spaces
    const paddedLabel = (label.charAt(0).toUpperCase() + label.slice(1)).padEnd(10, "\u00a0");

    return (
        <div className={ style.input }>
            <label htmlFor={ label }>{ paddedLabel }</label>
            <input 
                pattern={ pattern }
                className={ !!value ? null : style.invalid }
                onChange={ onChange }
                value={ value }
                name={ label } 
                id={ label } 
                type="text" 
                required 
            />
        </div>
    );
}

export default ContactForm;