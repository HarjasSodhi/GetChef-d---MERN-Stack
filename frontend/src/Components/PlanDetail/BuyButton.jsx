import React from 'react';
import { AuthProvider } from '../../App'
import { useContext, useState } from 'react'
import useRazorpay from "react-razorpay";
import axios from 'axios'
import Swal from 'sweetalert2';
import Loader from '../Common/Loader/Loader'

axios.defaults.withCredentials = true
const Buybutton = (props) => {
    const [loading, setLoading] = useState(false)

    let store = useContext(AuthProvider);
    const Razorpay = useRazorpay();
    return (
        <>
            {loading ? <Loader /> :
                <>
                    <div className="btn btn-lg btn-outline-danger" onClick={async () => {
                        setLoading(true);
                        let options = await axios.post('/api/booking', { userId: store.user['_id'], planId: props.planId, buyingPrice: Number(props.buyingPrice * 75.60) })
                        options = options.data;
                        let booking = options.booking
                        store.setUser(options.updatedUser);
                        options = options.orderOptions;
                        options = {
                            ...options,
                            handler: function (response) {
                                // console.log(response.razorpay_payment_id);
                                // console.log(response.razorpay_order_id);
                                // console.log(response.razorpay_signature);
                                axios.post('/api/verification', { id: booking["_id"], email: store.user.email })
                                    .then((res) => {
                                        return res.data
                                    }).then((data) => {
                                        if (data.newBooking) {
                                            Swal.fire({
                                                title: 'Success!',
                                                text: 'Booking Confirmed. We Have Sent You a Confirmation mail. Your Order will be delivered Soon',
                                                icon: 'success',
                                                confirmButtonText: 'Ok!!'
                                            })
                                        }
                                        else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'Booking Failed!! Please contact me using the Form at the bottom',
                                                icon: 'error',
                                                confirmButtonText: 'Try Again'
                                            })
                                        }
                                    }).catch((err) => {
                                        console.log(err)
                                        setLoading(false);
                                        Swal.fire({
                                            title: 'Error!',
                                            text: 'Booking Failed!! Please contact me using the Form at the bottom',
                                            icon: 'error',
                                            confirmButtonText: 'Try Again'
                                        })
                                    })
                            }
                        }
                        const rzp1 = new Razorpay(options);

                        rzp1.on("payment.failed", function (response) {
                            axios.delete(`/api/booking/${booking['_id']}`).then((res) => {
                                return res.data
                            }).then((data) => {
                                if (data.updatedUser) {
                                    store.setUser(data.updatedUser);
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
                        });

                        setLoading(false);
                        rzp1.open();

                    }} > Buy Now</div >

                </>
            }
        </>
    );
}

export default Buybutton;