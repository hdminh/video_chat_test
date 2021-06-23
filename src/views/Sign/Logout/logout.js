import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';

export default function Logout(props) {
    useEffect(() => {
        let typeSignIn = localStorage.getItem("typeSignIn");
        if (typeSignIn === "facebook") {
            firebase.auth().signOut().then(() => {
                
            }).catch((error) => {
            
            });
        }
        localStorage.clear();
    });
    return (
        <div className="App"> 
            You have been logout
            <Link to="/login"> Click to login </Link>
        </div>
    )
}