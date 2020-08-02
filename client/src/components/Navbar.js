import React from 'react';
import './Bars.css';

export const Navbar = function () {
    return (
        <div className='top-navbar'>
            <ul className='navbar left'>
                <li><a className="top-icons" href="#proj">Project Name:</a></li>
                <li><a className="top-icons" href="#news">Board Name:</a></li>
            </ul>
            <ul className='navbar right'>
                <li><a className="top-icons" href="#proj">Collaborate</a></li>
                <li><a className="top-icons" href="#news">Download</a></li>
            </ul>
        </div>
    );
}
