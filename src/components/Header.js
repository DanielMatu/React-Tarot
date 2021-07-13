import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import AppRouter, { history } from '../routers/AppRouter'
import { UserContext } from '../contexts/user-context'
import { firebase, googleAuthProvider } from '../firebase/firebase'

export const Header = () => {
    const [ state, login, logout ] = useContext(UserContext)


    const [dropdownActive, setDropdownActive] = useState(false)
    firebase.auth().onAuthStateChanged((user) => {
        if (user){
        } else {
            logout()
            history.push('/')
        }
    })
    return (
        <header className="header">
            <div className = "content-container">
                <div className="header__content">
                    <div className='hamburger' onClick={() => setDropdownActive(!dropdownActive)}>
                        <div className='hamburger-line'></div>
                        <div className='hamburger-line'></div>
                        <div className='hamburger-line'></div>
                    </div>
                    <Link className="header__title main-nav" to="/dashboard">
                        <h1>HOME</h1> 
                    </Link>
                    <Link className='header__title main-nav' to='/journal'>
                        <h2>JOURNAL</h2>
                    </Link>
                    <Link className='header__title main-nav' to='/fortunes'>
                        <h2>FORTUNES</h2>
                    </Link>
                    <button className="button button--link main-nav" onClick={() => firebase.auth().signOut()}>LOG OUT</button>
                </div>
            </div>

            {
                dropdownActive
                &&
                <div className='hamburger-dropdown'>
                <Link className="header__title hamburger-dropdown-item" to="/dashboard">
                    <h1>HOME</h1> 
                </Link>
                <Link className='header__title hamburger-dropdown-item' to='/journal'>
                    <h2>JOURNAL</h2>
                </Link>
                <Link className='header__title hamburger-dropdown-item' to='/fortunes'>
                    <h2>FORTUNES</h2>
                </Link>
                <button 
                    className="button button--link hamburger-dropdown-item" 
                    onClick={() => firebase.auth().signOut()}
                    >
                    <h3>LOG OUT</h3>
                </button>
            </div>
            }


        </header>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);
