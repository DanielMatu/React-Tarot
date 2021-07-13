import React from 'react';
import Header from './Header'
import TarotAlert from './TarotAlert'
import { history } from '../routers/AppRouter'

const NotFoundPage = () => (
    <div>
        <Header />
        <TarotAlert alertText={"Sorry we couldn't find that page"} goBackHandler={() => history.push('/dashboard')}/>


    </div>
)

export default NotFoundPage;