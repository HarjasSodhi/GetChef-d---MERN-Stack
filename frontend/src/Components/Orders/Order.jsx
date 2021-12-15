import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'
import Loader from '../Common/Loader/Loader';

axios.defaults.withCredentials = true
const Order = (props) => {
    const [loading, setLoading] = useState(false);

    const [Order, setOrder] = useState({ planId: { image: [] } });
    useEffect(() => {
        setLoading(true);
        axios.get(`/api/booking/${props.id}`)
            .then((res) => {
                setLoading(false);
                return res.data;
            }).then((data) => {
                setOrder(data.booking);
            })
    }, [props.id])

    let cancelOrder = () => {
        axios.delete(`/api/booking/${props.id}`)
            .then((res) => {
                return res.data;
            }).then((data) => {
                console.log(data)
                if (data.updatedUser) {
                    props.store.setUser(data.updatedUser);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Order Cancelled',
                        icon: 'success',
                        confirmButtonText: 'Ok!!'
                    })
                }
                else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'order can not be cancelled now',
                        icon: 'error',
                        confirmButtonText: 'Try Again'
                    })
                }
            }).catch((err) => {
                console.log(err);
                Swal.fire({
                    title: 'Error!',
                    text: 'some error occurred. Sorry!! Please login in again',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                })
            })
    }

    return (
        <>
            {
                Order.status === "pending" ? "" :
                    <div className="list-group-item list-group-item-action rounded mt-3">
                        <div className="d-flex w-100 justify-content-center row">
                            {loading ? <Loader /> :
                                <>
                                    <div className="mb-1 col-10 col-md-6 ms-3 text-center text-md-start">
                                        <h5 className="row gradient mt-2">{Order.planId.name}</h5>
                                        <p className="mb-1 row mt-2">Order Id- {Order['_id']}</p>
                                        <small className="text-muted row mt-2">{Order.date}</small>
                                        <div className="btn btn-outline-danger btn-lg mt-4" onClick={cancelOrder}>Cancel Order</div>
                                    </div>
                                    <div className="col-10 col-md-4 mt-4 mt-md-0 mb-md-0 mb-2 text-center">
                                        <img src={Order.planId.image[0]} alt="img" className='img-fluid rounded' />
                                    </div>
                                </>}
                        </div>
                    </div>
            }
        </>
    );
}

export default Order;