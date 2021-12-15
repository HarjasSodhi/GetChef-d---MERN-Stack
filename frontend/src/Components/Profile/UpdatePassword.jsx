import React from 'react';
import { useState, useContext } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { AuthProvider } from '../../App';
import Loader from '../Common/Loader/Loader'

axios.defaults.withCredentials = true
const UpdatePassword = () => {
    let store = useContext(AuthProvider);

    const [loading, setLoading] = useState(false);
    const [CurrPass, setCurrPass] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [NewConfirmPassword, setNewConfirmPassword] = useState('');

    return (
        <div className='col-md-5 col-10 passBox mt-5 pb-4'>
            <div className="h1 Mygradient">Update Password</div>
            {loading ? <Loader /> :
                <>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label fw-bold mt-1 Mygradient">Current Password</label>
                        <input type="password" className="form-control" value={CurrPass} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => {
                            setCurrPass(e.currentTarget.value);
                        }} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label fw-bold Mygradient">New Password</label>
                        <input type="password" className="form-control" value={NewPassword} id="exampleInputPassword1" onChange={(e) => {
                            setNewPassword(e.currentTarget.value);
                        }} />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label fw-bold Mygradient">Confirm New Password</label>
                        <input type="password" className="form-control" value={NewConfirmPassword} id="exampleInputPassword1" onChange={(e) => {
                            setNewConfirmPassword(e.currentTarget.value);
                        }} />
                    </div>
                    <button type="submit" className="btn btn-outline-primary fw-bold" onClick={() => {
                        if (NewPassword !== NewConfirmPassword) {
                            return Swal.fire({
                                title: 'Error!',
                                text: 'Passwords Do Not Match',
                                icon: 'error',
                                confirmButtonText: 'Try Again'
                            })
                        }
                        if (CurrPass === '' || NewPassword === '' || NewConfirmPassword === "") {
                            return Swal.fire({
                                title: 'Error!',
                                text: 'Please enter all details',
                                icon: 'error',
                                confirmButtonText: 'Try Again'
                            })
                        }
                        if (NewPassword.length < 10) {
                            return Swal.fire({
                                title: 'Error!',
                                text: 'Password Needs to Be atleast 10 characters long',
                                icon: 'error',
                                confirmButtonText: 'Try Again'
                            })
                        }
                        setLoading(true);
                        axios.post('/api/auth/updatePassword', { email: store.user.email, newPassword: NewPassword, password: CurrPass })
                            .then((res) => {
                                setNewPassword('');
                                setCurrPass('');
                                setNewConfirmPassword('');
                                setLoading(false);
                                return res.data;
                            }).then((data) => {
                                if (data.newUser) {
                                    Swal.fire({
                                        title: 'Success!',
                                        text: "Password Updated",
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
    );
}

export default UpdatePassword;