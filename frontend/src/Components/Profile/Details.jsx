import React from 'react';
import { useState, useContext } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { AuthProvider } from '../../App'
import Loader from '../Common/Loader/Loader'

axios.defaults.withCredentials = true
const Details = () => {
    let store = useContext(AuthProvider);

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(!store.user ? '' : store.user.name);
    const [email, setEmail] = useState(!store.user ? '' : store.user.email);
    const [age, setAge] = useState(!store.user ? '' : store.user.age);
    const [address, setAddress] = useState(!store.user ? '' : store.user.address);

    return (
        <div className='col-md-5 col-10 passBox deetBox mt-5 pb-4'>
            <div className="h1 Mygradient">My Profile</div>
            {loading ? <Loader /> : <>
                <div className="mb-3">
                    <label className="form-label fw-bold mt-1 Mygradient">Name</label>
                    <input type="text" className="form-control" value={name} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => {
                        setName(e.currentTarget.value);
                    }} />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold Mygradient">Email</label>
                    <input type="email" className="form-control" value={email} id="exampleInputPassword1" onChange={(e) => {
                        setEmail(e.currentTarget.value);
                    }} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label fw-bold Mygradient">Age</label>
                    <input type="number" className="form-control" value={age} id="exampleInputPassword1" onChange={(e) => {
                        setAge(Number(e.currentTarget.value));
                    }} />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold mt-1 Mygradient">Address</label>
                    <input type="text" className="form-control" value={address} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => {
                        setAddress(e.currentTarget.value);
                    }} />
                </div>
                <button type="submit" className="btn btn-outline-primary fw-bold" onClick={() => {
                    if (age < 16) {
                        return Swal.fire({
                            title: 'Error!',
                            text: 'Only People above 16 can apply',
                            icon: 'error',
                            confirmButtonText: 'Try Again'
                        })
                    }
                    if (email === '' || name === "" || address === '') {
                        return Swal.fire({
                            title: 'Error!',
                            text: 'Please enter all details',
                            icon: 'error',
                            confirmButtonText: 'Try Again'
                        })
                    }

                    let obj = { name, email, age, address }

                    for (let key in obj) {
                        if (store.user[key] === obj[key])
                            delete obj[key];
                    }
                    setLoading(true);
                    axios.patch(`/api/user/${store.user['_id']}`, { ...obj })
                        .then((res) => {
                            setLoading(false);
                            return res.data;
                        }).then((data) => {
                            if (data.newElement) {
                                Swal.fire({
                                    title: 'Success!',
                                    text: "Detail(s) Updated!",
                                    icon: 'success',
                                    confirmButtonText: 'OK'
                                })
                                store.setUser(data.newElement);
                                setName(data.newElement.name);
                                setEmail(data.newElement.email);
                                setAge(Number(data.newElement.age));
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

export default Details;
