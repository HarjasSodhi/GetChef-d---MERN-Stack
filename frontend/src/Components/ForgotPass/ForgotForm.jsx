import React from 'react';
import { useState, useContext } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { AuthProvider } from '../../App';
import Loader from '../Common/Loader/Loader'

axios.defaults.withCredentials = true
const ForgotForm = () => {

    let store = useContext(AuthProvider);

    const [loading, setLoading] = useState(false);
    const [OTPrequested, setOTPrequested] = useState(false);
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [OTP, setOTP] = useState('');

    return (
        <>
            {store.user !== undefined ? <Redirect to='/' /> :
                <div className='container-md forgot rounded mt-5 mb-5 text-dark'>
                    <div className="row justify-content-center align-items-center">
                        <div className='col-md-5 col-10 forgotBox mt-5 pb-5'>
                            <div className="h1 Mygradient mb-4">Reset Password</div>
                            {loading ? <Loader /> : !OTPrequested ?
                                <>
                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label fw-bold mt-1 Mygradient">Email Address</label>
                                        <input type="email" className="form-control" value={Email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => {
                                            if (!OTPrequested) {
                                                setEmail(e.currentTarget.value);
                                            }
                                        }} />
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-outline-primary fw-bold" onClick={() => {
                                            let type = 'error'
                                            let title = "Error !"
                                            if (Email === '') {
                                                return Swal.fire({
                                                    title: 'Error!',
                                                    text: 'Please enter Email',
                                                    icon: 'error',
                                                    confirmButtonText: 'Try Again'
                                                })
                                            }
                                            setLoading(true);
                                            axios.post('/api/auth/forgotPass', { email: Email })
                                                .then((res) => {
                                                    setLoading(false);
                                                    return res.data;
                                                }).then((data) => {
                                                    if (data.message === 'Mail Sent') {
                                                        type = 'success'
                                                        setOTPrequested(true);
                                                        title = 'Success !'
                                                    }
                                                    return Swal.fire({
                                                        title,
                                                        text: data.message,
                                                        icon: type,
                                                        confirmButtonText: 'OK'
                                                    })
                                                })
                                        }} >Request OTP</button>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="mb-3">
                                        <label for="exampleInputPassword1" className="form-label fw-bold Mygradient">Password</label>
                                        <input type="password" className="form-control" value={Password} id="exampleInputPassword1" onChange={(e) => {
                                            setPassword(e.currentTarget.value);
                                        }} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleInputPassword1" className="form-label fw-bold Mygradient">Confirm Password</label>
                                        <input type="password" className="form-control" value={ConfirmPassword} id="exampleInputPassword1" onChange={(e) => {
                                            setConfirmPassword(e.currentTarget.value);
                                        }} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold Mygradient">OTP</label>
                                        <input type="text" className="form-control" value={OTP} id="exampleInputPassword1" onChange={(e) => {
                                            setOTP(e.currentTarget.value);
                                        }} />
                                    </div>
                                    <button type="submit" className="btn btn-outline-primary fw-bold" onClick={() => {
                                        if (!OTPrequested) {
                                            return Swal.fire({
                                                title: 'Error!',
                                                text: 'Please request a OTP first',
                                                icon: 'error',
                                                confirmButtonText: 'Try Again'
                                            })
                                        }
                                        if (Password.length < 10) {
                                            return Swal.fire({
                                                title: 'Error!',
                                                text: 'Password Needs to Be atleast 10 characters long',
                                                icon: 'error',
                                                confirmButtonText: 'Try Again'
                                            })
                                        }
                                        if (Password === '') {
                                            return Swal.fire({
                                                title: 'Error!',
                                                text: 'Please enter all details',
                                                icon: 'error',
                                                confirmButtonText: 'Try Again'
                                            })
                                        }
                                        if (Password !== ConfirmPassword) {
                                            return Swal.fire({
                                                title: 'Error!',
                                                text: 'Passwords do not match',
                                                icon: 'error',
                                                confirmButtonText: 'Try Again'
                                            })
                                        }
                                        setLoading(true);
                                        axios.post(`/api/auth/forgotPass/${OTP}`, { email: Email, newPassword: Password })
                                            .then((res) => {
                                                setEmail('');
                                                setPassword('');
                                                setConfirmPassword('')
                                                setOTP('')
                                                setOTPrequested(false)
                                                setLoading(false);
                                                return res.data;
                                            }).then((data) => {
                                                if (data.newUser) {
                                                    Swal.fire({
                                                        title: 'Success!',
                                                        text: 'Password Changed. Login To Access Your Account',
                                                        icon: 'success',
                                                        confirmButtonText: 'OK'
                                                    })
                                                }
                                                else {
                                                    Swal.fire({
                                                        title: 'Error!',
                                                        text: data.message,
                                                        icon: 'error',
                                                        confirmButtonText: 'Try Again'
                                                    })
                                                }
                                            }).catch((err) => {
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'Some error occured, Sorry!',
                                                    icon: 'error',
                                                    confirmButtonText: 'Try Again'
                                                })
                                            })
                                    }}>Submit</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ForgotForm;
