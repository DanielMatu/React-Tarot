import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header'

const NotFoundPage = () => (
    <div>
        <Header />
        <div className='page-not-found_container'>
            <div className='page-not-found_box'>
                <div className='page-not-found_text'>
                    Sorry we couldn't find that page

                </div>
                <Link to="/"><button className='go-back-button'>Go back</button></Link>

            </div>
        </div>


    </div>
)

export default NotFoundPage;