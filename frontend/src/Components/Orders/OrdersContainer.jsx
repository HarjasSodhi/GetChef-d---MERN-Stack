import React from 'react';
import { Redirect } from 'react-router-dom';
import Order from './Order';

const OrdersContainer = (props) => {
    return (
        <>
            {props.store.user === undefined ? <Redirect to='/login' /> :
                <div className='container-md mt-5 mb-5 ordersBox'>
                    <div className="row justify-content-center gradient pt-3 display-2">My Orders</div>
                    <div className="row mt-5 justify-content-center">
                        <div className="col-10 justify-content-center mb-5">
                            <div className="list-group">
                                {
                                    props.store.user !== undefined ? Number(props.store.user.bookings.length) === 0 ? <h1>You Do Not Have Any Orders</h1> : props.store.user.bookings.map((el) => {
                                        return <Order id={el} store={props.store} />
                                    }) : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default OrdersContainer;