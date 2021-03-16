/*
 * File: ContactForm.tsx
 * Created: Saturday March 13th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Tuesday March 16th 2021 12:17am
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 * 2021-03-15   TvB	Refactored to use react function components
 */

import style from "./ContactForm.module.css";
import React, { useState } from 'react';

type InputTarget= { target: HTMLInputElement | HTMLTextAreaElement };

/** Contact form */
function ContactForm(){
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

    return (
        <div>
            <form action="/" className={ style.container }>
                <h1 className={ style.title }>Message me</h1>
                <Input label="name" value={ name } onChange={ handleNameChange } />
                <Input label="email" value={ email } onChange={ handleEmailChange } />
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
    );
}

/** Form 'text' input elements */
function Input({ label, value, onChange }
    : { label: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement> } ){

    // Copy label, capitalize the first letter, and pad with spaces
    const paddedLabel = (label.charAt(0).toUpperCase() + label.slice(1)).padEnd(10, "\u00a0");

    return (
        <div className={ style.input }>
            <label htmlFor={ label }>{ paddedLabel }</label>
            <input 
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