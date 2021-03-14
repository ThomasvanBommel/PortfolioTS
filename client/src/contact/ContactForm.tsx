/*
 * File: ContactForm.tsx
 * Created: Saturday March 13th 2021
 * Author: Thomas vanBommel
 * 
 * Last Modified: Saturday March 13th 2021 11:07pm
 * Modified By: Thomas vanBommel
 * 
 * CHANGELOG:
 */

import style from "./ContactForm.module.css";
import React from 'react';

class ContactForm extends React.Component {

    render(){
        return (
            <form action="#" className={ style.container }>
                <Input label="name" />
                <Input label="email" />
                <Input label="subject" />

                <div>
                    <label htmlFor="message">Message: </label>
                </div>
                
                <div>
                    <textarea id="message" name="message" cols={30} rows={5}></textarea>
                </div>

                <input type="submit" value="Submit" />
                <button>Cancel</button>
            </form>
        );
    }
}

class Input extends React.Component<{ label: string }, {}> {

    render(){
        let label = this.props.label;
        let Label = label.charAt(0).toUpperCase() + label.slice(1);

        return (
            <div className={ style.input }>
                <label htmlFor={ label }>{
                    Label.padEnd(10, "\u00a0")
                }</label>
                <input id={ label } name={ label } type="text" />
            </div>
        );
    }
}

export default ContactForm;