import React from 'react';
import './orders.css'
import OrdersContainer from '../../Components/Orders/OrdersContainer';
import { AuthProvider } from '../../App'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';

const Orderspage = () => {

    let store = useContext(AuthProvider);

    return (
        <>
            {store.user === undefined ? <Redirect to='/login' /> : <OrdersContainer store={store} />}
        </>
    );
}

export default Orderspage;