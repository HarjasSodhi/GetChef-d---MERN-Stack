import React from 'react';
import { useContext } from 'react'
import CustomerReview from './customerReview';
import { Redirect } from 'react-router-dom'
import { AuthProvider } from '../../App';

const Allreviews = (props) => {

    let store = useContext(AuthProvider);

    return (
        <>
            {store.user === undefined || store.user === null ? <Redirect to='/login' /> :
                <div className='col-10 justify-content-center mb-5'>
                    <div className="list-group">
                        {
                            props.reviews.map((el) => {
                                return <CustomerReview id={el} userId={store.user['_id']} setPlan={props.setPlan} />
                            })
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default Allreviews;