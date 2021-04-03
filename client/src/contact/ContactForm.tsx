/*
 * File: ContactForm.tsx
 * Created: Saturday March 13th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday April 3rd 2021 1:22pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-15   TvB	Refactored to use react function components
 */

import React, { useState } from 'react';
import Spinner from "../spinner/Spinner";
import style from "./ContactForm.module.css";

type InputTarget= { target: HTMLInputElement | HTMLTextAreaElement };

/** Contact form */
function ContactForm(){
    const [ loading, setLoading ] = useState(false);
    const [ validated, setValidation ] = useState(false);
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ subject, setSubject ] = useState("");
    const [ message, setMessage ] = useState("");

    // Update an inputs value and check form validation
    const update = (func: React.Dispatch<React.SetStateAction<string>>, val: string) => {
        func(val);
        
        setValidation(!!name && !!email && !!subject && !!message);
    };

    // Change handlers for each input
    const handleNameChange    = ({ target }: InputTarget) => update(setName,    target.value);
    const handleEmailChange   = ({ target }: InputTarget) => update(setEmail,   target.value);
    const handleSubjectChange = ({ target }: InputTarget) => update(setSubject, target.value);
    const handleMessageChange = ({ target }: InputTarget) => update(setMessage, target.value);

    const handleFormSubmission = (event: React.FormEvent) => {
        console.log(event);
        event.preventDefault();
        setLoading(true);
    }

    return (
        <div className={ style.disabled } onSubmit={ handleFormSubmission }>
            { !loading ? (
                <div>
                    <form className={ style.container }>
                        <h1 className={ style.title }>Message me</h1>
                        <Input label="name" value={ name } onChange={ handleNameChange } />
                        <Input label="email" value={ email } onChange={ handleEmailChange } pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                        <Input label="subject" value={ subject } onChange={ handleSubjectChange } />

                        <label htmlFor="message">Message</label>
                        <textarea 
                            className={ !!message ? null : style.invalid }
                            onChange={ handleMessageChange } 
                            value={ message } 
                            name="message" 
                            id="message" 
                            cols={ 30 } 
                            rows={ 5 } 
                            required
                        ></textarea>

                        <input type="submit" value="Submit" disabled={ !validated } />
                    </form>
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