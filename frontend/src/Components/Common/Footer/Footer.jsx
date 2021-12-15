import React from 'react';
import logo from './../../../Logo.png'
import "./footer.css"
import Swal from 'sweetalert2'
import { useState, useContext } from 'react'
import axios from 'axios';
import { AuthProvider } from '../../../App'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader';


axios.defaults.withCredentials = true
const Footer = () => {

    let gitURL = 'https://github.com/HarjasSodhi'
    let linkedInURL = 'https://www.linkedin.com/in/harjas-sodhi-ab985317a/'

    let store = useContext(AuthProvider);

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    return (
        <div className="container-fluid text-white footer">
            <div className="row justify-content-between">
                <div className="col-md-5 mt-3 ps-5">
                    {
                        loading ? <Loader /> :
                            <>
                                <div className="row display-6">Contact Us</div>
                                <div className="row mt-4 mb-5">
                                    <div className='h5'>Email</div>
                                    <div className="row">
                                        <div className="input-group mb-3 col-3">
                                            <input type="email" className="form-control" value={email} aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => {
                                                setEmail(e.currentTarget.value);
                                            }} />
                                        </div>
                                    </div>
                                    <div className='h5'>Name</div>
                                    <div className="row">
                                        <div className="input-group mb-3 col-3">
                                            <input type="text" className="form-control" aria-label="Recipient's username" value={name} aria-describedby="button-addon2" onChange={(e) => {
                                                setName(e.currentTarget.value);
                                            }} />
                                        </div>
                                    </div>
                                    <div className='h5'>Message</div>
                                    <div className="row">
                                        <div className="input-group mb-3 col-3">
                                            <input type="text" className="form-control" aria-label="Recipient's username" value={message} aria-describedby="button-addon2" onChange={(e) => {
                                                setMessage(e.currentTarget.value);
                                            }} />
                                        </div>
                                    </div>
                                    <div className="btn btn-outline-primary col-3 mt-3" onClick={() => {
                                        if (name === '' || message === '' || email === '') {
                                            return Swal.fire({
                                                title: 'Error!',
                                                text: 'Please Enter All Details',
                                                icon: 'error',
                                                confirmButtonText: 'Try Again'
                                            })
                                        }
                                        setLoading(true);
                                        axios.post('/api/contact', { name, email, message })
                                            .then((res) => {
                                                setEmail('');
                                                setMessage('');
                                                setName('');
                                                setLoading(false);
                                                return res.data
                                            }).then((data) => {
                                                Swal.fire({
                                                    title: 'Success!',
                                                    text: 'Query Received!! We Will contact you shortly',
                                                    icon: 'success',
                                                    confirmButtonText: 'OK !'
                                                })
                                            }).catch((err) => {
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'Some error occured, Sorry!',
                                                    icon: 'error',
                                                    confirmButtonText: 'Try Again'
                                                })
                                            })
                                    }}>Submit</div>
                                </div>
                            </>
                    }
                </div>
                <div className="col-md-5 mt-3">
                    <div className="row justify-content-center mt-5">
                        <img src={logo} alt="logo" className='col-4 ' />
                    </div>
                    <div className="row  mt-5 justify-content-center">
                        <div className="col-md-2 text-center mt-md-0 mt-1">
                            <Link to='/' className="text-muted">Home</Link>
                        </div>
                        <div className="col-md-2 text-center mt-md-0 mt-1">
                            <Link to='/plans' className="text-muted">Plans</Link>
                        </div>
                        <div className="col-md-2 text-center mt-md-0 mt-1">
                            {store.user !== undefined ? <Link to='/orders' className="text-muted">Orders</Link> : ""}
                            {store.user === undefined ? <Link to='/login' className="text-muted">Login</Link> : ""}
                        </div>
                    </div>
                    <div className="row  mt-5 justify-content-center">
                        <div href='' className="col-2 text-center" onClick={() => {
                            window.open(linkedInURL, '_blank');
                        }}>
                            <i className="fab fa-linkedin"></i>
                        </div>
                        <div className="col-2 text-center" onClick={() => {
                            window.open(gitURL, '_blank');
                        }}>
                            <i className="fab fa-github"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 pb-2">
                <div className="col text-center text-muted">
                    © 2021 Harjas Sodhi , All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Footer;