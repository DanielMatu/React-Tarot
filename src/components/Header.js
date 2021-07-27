import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import AppRouter, { history } from '../routers/AppRouter'
import { UserContext } from '../contexts/user-context'
import { firebase, googleAuthProvider } from '../firebase/firebase'
import { DateContext } from '../contexts/date-context';

export const Header = () => {
    const [ state, login, logout ] = useContext(UserContext)

    const { setCalendar } = useContext(DateContext)


    const [dropdownActive, setDropdownActive] = useState(false)

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
                        <h2>HOME</h2> 
                    </Link>
                    <Link className='header__title main-nav' to='/journal'>
                        <h2>CALENDAR</h2>
                    </Link>
                    <button className="button button--link main-nav" 
                            onClick={() => firebase.auth().signOut().then(() => {logout()})}
                            ><h3>LOG OUT</h3></button>
                </div>
            </div>

            {
                dropdownActive
                &&
                <div className='hamburger-dropdown'>
                <Link className="header__title hamburger-dropdown-item" to="/dashboard">
                    <h2>HOME</h2> 
                </Link>
                <Link className='header__title hamburger-dropdown-item' to='/journal'>
                    <h2>CALENDAR</h2>
                </Link>
                <button 
                    className="button button--link hamburger-dropdown-item dropdown-logout" 
                    onClick={() => firebase.auth().signOut().then(() => {logout()})}
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
