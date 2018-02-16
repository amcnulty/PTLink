import React from 'react';
import {footer} from 'react-bootstrap';


const Footer = (props) => {
    return (
        <footer className='footer'>
            <div className='container'>
                <span className='text-muted'>{props.text}</span>
                {props.children}
            </div>
        </footer>
    )
}

export default Footer;