import React from 'react';
import { useState, useContext } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, Redirect } from 'react-router-dom'
import { AuthProvider } from '../../App';
import Loader from '../Common/Loader/Loader'

axios.defaults.withCredentials = true
const Loginform = () => {
    let store = useContext(AuthProvider);

    const [loading, setLoading] = useState(false);
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    return (
        <>
            {store.user !== undefined ? <Redirect to='/' /> :
                <div className='container-md login rounded mt-5 mb-5 text-dark'>
                    <div className="row justify-content-center align-items-center">
                        <div className='col-md-5 col-10 loginBox mt-5 pb-4'>
                            <div className="h1 Mygradient">Login</div>
                            {loading ? <Loader /> : <>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label fw-bold mt-1 Mygradient">Email Address</label>
                                    <input type="email" className="form-control" value={Email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => {
                                        setEmail(e.currentTarget.value);
                                    }} />
                                    <div id="emailHelp" className="form-text Mygradient">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label fw-bold Mygradient">Password</label>
                                    <input type="password" className="form-control" value={Password} id="exampleInputPassword1" onChange={(e) => {
                                        setPassword(e.currentTarget.value);
                                    }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-check-label justify-content-end Mygradient" for="exampleCheck1"><Link to='/forgotPassword'>Forgot Password?</Link></label>
                                </div>
                                <button type="submit" className="btn btn-outline-primary fw-bold" onClick={() => {
                                    if (Email === '' || Password === '') {
                                        return Swal.fire({
                                            title: 'Error!',
                                            text: 'Please enter all details',
                                            icon: 'error',
                                            confirmButtonText: 'Try Again'
                                        })
                                    }
                                    setLoading(true);
                                    axios.post('/api/auth/login', { email: Email, password: Password })
                                        .then((res) => {
                                            setEmail('');
                                            setPassword('');
                                            setLoading(false)
                                            return res.data;
                                        }).then((data) => {
                                            if (data.user) {
                                                store.setUser(data.user);
                                            }
                                            else {
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'In-correct Login Details',
                                                    icon: 'error',
                                                    confirmButtonText: 'Try Again'
                                                })
                                            }
                                        }).catch(() => {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'Some error occured, Sorry!',
                                                icon: 'error',
                                                confirmButtonText: 'Try Again'
                                            })
                                        })
                                }}>Submit</button>
                            </>}
                        </div>
                    </div>

                </div>
            }
        </>
    );
}

export default Loginform;