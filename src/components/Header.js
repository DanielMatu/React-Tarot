import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'


export const Header = ({ startLogout }) => {

    // const [test1, test2] = useState(0)
    return (
        <header className="header">
            <div className = "content-container">
                <div className="header__content">
                    <div className='hamburger'>
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
                    <button className="button button--link main-nav" onClick={startLogout}>LOG OUT</button>
                </div>
            </div>

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
            </div>

        </header>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header);
