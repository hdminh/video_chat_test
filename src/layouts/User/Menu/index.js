import React from 'react';
import { Link } from 'react-router-dom';
export default function Menu(props) {
    
    return (
        <div className="w3-third">
            <div className="w3-white w3-text-grey w3-card-4">
                <div className="w3-display-container mb-3">
                    <img src="https://www.w3schools.com/w3images/avatar_hat.jpg" className="user-avatar" alt="Avatar" />
                    <div className="w3-display-bottomleft w3-container w3-text-black">
                        <h2>Han Abc</h2>
                    </div>
                </div>
                <div className="w3-container">
                    <div className="flex-container sidebar-menu">
                        <Link to="/filters" className="sidebar-menu__item"> Filter </Link>
                        <Link to="/encounters" className="sidebar-menu__item is_active"> Lam quen </Link>
                        <Link to="/messages" className="sidebar-menu__item"> Tin nhan </Link>
                        <Link to="/friends" className="sidebar-menu__item"> Ban be </Link>
                    </div>
                    <hr></hr>
                    <p className="w3-large"><b><i className="fa fa-asterisk fa-fw w3-margin-right w3-text-teal"></i>Nha hang noi bat</b></p>
                </div>
            </div>
        </div>
    )
}