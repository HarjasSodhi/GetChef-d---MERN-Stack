import React from 'react';
import { useState, useContext } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Redirect, Link } from 'react-router-dom'
import { AuthProvider } from '../../App';
import Loader from '../Common/Loader/Loader'

axios.defaults.withCredentials = true
const Signup = () => {
    let store = useContext(AuthProvider);

    const [loading, setLoading] = useState(false)
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [Age, setAge] = useState(16);
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('')

    return (
        <>
            {store.user !== undefined ? <Redirect to='/' /> :
                <div className='container-md signup rounded mt-5 mb-5 text-dark'>
                    <div className="row justify-content-center align-items-center">
                        <div className='col-md-5 col-10 signupBox mt-5 pb-4'>
                            <div className="h1 Mygradient">Register</div>
                            {loading ? <Loader /> : <>
                                <label className="form-label fw-bold Mygradient">Name</label>
                                <input type="text" className="form-control" value={Name} id="exampleInputPassword1" onChange={(e) => {
                                    setName(e.currentTarget.value);
                                }} />
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
                                    <label for="exampleInputPassword1" className="form-label fw-bold Mygradient">Confirm Password</label>
                                    <input type="password" className="form-control" value={ConfirmPassword} id="exampleInputPassword1" onChange={(e) => {
                                        setConfirmPassword(e.currentTarget.value);
                                    }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold Mygradient">Age</label>
                                    <input type="number" className="form-control" value={Age} id="exampleInputPassword1" onChange={(e) => {
                                        setAge(Number(e.currentTarget.value));
                                    }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold mt-1 Mygradient">Address</label>
                                    <input type="text" className="form-control" value={address} id="exampleInputPassword1" onChange={(e) => {
                                        setAddress(e.currentTarget.value);
                                    }} />
                                </div>
                                <div className="mb-1">
                                    <label className="form-check-label justify-content-end Mygradient" for="exampleCheck1"><Link to='/login'>Already have An Account?</Link></label>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-outline-primary fw-bold mt-3" onClick={() => {
                                        if (Number(Age) < 16) {
                                            return Swal.fire({
                                                title: 'Error!',
                                                text: 'You Have To Be Atleast 15 To Register',
                                                icon: 'error',
                                                confirmButtonText: 'Try Again'
                                            })
                                        }
                                        if (Password !== ConfirmPassword) {
                                            return Swal.fire({
                                                title: 'Error!',
                                                text: 'Passwords Do Not Match',
                                                icon: 'error',
                                                confirmButtonText: 'Try Again'
                                            })
                                        }
                                        if (Email === '' || Password === '' || Name === "" || address === '') {
                                            return Swal.fire({
                                                title: 'Error!',
                                                text: 'Please enter all details',
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
                                        setLoading(true);
                                        axios.post('/api/auth/signup', { email: Email, password: Password, name: Name, age: Number(Age), address })
                                            .then((res) => {
                                                setEmail('');
                                                setPassword('');
                                                setName('');
                                                setConfirmPassword('');
                                                setAge(16);
                                                setLoading(false);
                                                return res.data;
                                            }).then((data) => {
                                                if (data.user) {
                                                    store.setUser(data.user);
                                                }
                                                else {
                                                    Swal.fire({
                                                        title: 'Error!',
                                                        text: 'Email Already Exists',
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
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Signup;