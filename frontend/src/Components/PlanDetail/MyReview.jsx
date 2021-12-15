import React from 'react';
import { useState, useContext } from 'react';
import ReactStars from "react-rating-stars-component";
import Swal from 'sweetalert2'
import axios from 'axios';
import { AuthProvider } from '../../App'
import Loader from '../Common/Loader/Loader'

axios.defaults.withCredentials = true
const MyReview = (props) => {
    let store = useContext(AuthProvider);

    const ratingChanged = (newRating) => {
        setRating(Number(newRating));
    };

    const [loading, setLoading] = useState(false);
    const [Rating, setRating] = useState(0);
    const [Review, setReview] = useState('');

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <div className="row justify-content-center mt-3 align-items-center">
                        <div className="col-10 col-md-5 justify-content-center">
                            <input type="text" className="form-control" value={Review} placeholder='Enter Your Review' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onChange={(e) => {
                                setReview(e.currentTarget.value);
                            }} />
                        </div>
                        <div className="col-10 col-md-5 d-flex justify-content-center">
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={40}
                                activeColor="#ffd700"
                            />
                        </div>
                        <div className="row justify-content-center mt-4">
                            <div className="col-8 col-md-5 text-center btn btn-outline-primary btn-lg" onClick={() => {
                                if (Rating === 0) {
                                    return Swal.fire({
                                        title: 'Error!',
                                        text: 'Please Give a rating',
                                        icon: 'error',
                                        confirmButtonText: 'Try Again'
                                    })
                                }
                                if (Review === '') {
                                    return Swal.fire({
                                        title: 'Error!',
                                        text: 'Please give a review',
                                        icon: 'error',
                                        confirmButtonText: 'Try Again'
                                    })
                                }
                                setLoading(true);
                                axios.post('/api/review', { userId: store.user['_id'], planId: props.planId, rating: Rating, text: Review })
                                    .then((res) => {
                                        setLoading(false)
                                        return res.data;
                                    }).then((data) => {
                                        console.log(data);
                                        if (data.updatedPlan) {
                                            console.log(data.updatedPlan);
                                            Swal.fire({
                                                title: 'Success!',
                                                text: "Review Posted",
                                                icon: 'success',
                                                confirmButtonText: 'Ok!!'
                                            })
                                            setReview('');
                                            props.setPlan(data.updatedPlan);
                                        }
                                    }).catch((err) => {
                                        Swal.fire({
                                            title: 'Error!',
                                            text: "Some error occured. Sorry!",
                                            icon: 'error',
                                            confirmButtonText: 'Try Again'
                                        })
                                    })
                            }}>Submit Review</div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default MyReview;