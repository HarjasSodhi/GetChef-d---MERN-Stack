import React from 'react';
import Details from '../../Components/Profile/Details'
import UpdatePassword from '../../Components/Profile//UpdatePassword'
import { useState, useContext } from 'react'
import './profile.css'
import { Redirect } from 'react-router-dom'
import { AuthProvider } from '../../App';

const ProfilePage = () => {

    let store = useContext(AuthProvider);

    const [showPass, setshowPass] = useState(false);
    
    return (
        <>
            {store.user === undefined ? <Redirect to='/login' /> :
                <>
                    <div className='container-md pass rounded mt-5 mb-5 text-dark profBox'>
                        <div className="row justify-content-center align-items-center">
                            {
                                showPass ? <UpdatePassword /> : <Details />
                            }
                        </div>
                        <div className="row justify-content-end mt-3">
                            <div className="col-md-3">
                                <div className="btn btn-lg btn-outline-primary" onClick={() => {
                                    setshowPass(!showPass);
                                }}>{showPass ? "Update Profile Details" : "Update Password"}</div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default ProfilePage;