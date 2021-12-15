import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Common/Loader/Loader';

axios.defaults.withCredentials = true
const CustomerReview = (props) => {
    const [loading, setLoading] = useState(false);
    const [review, setReview] = useState({ userId: {} })

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/review/${props.id}`)
            .then((res) => {
                setLoading(false);
                return res.data
            }).then((data) => {
                setReview(data.review);
            })
    }, [props.id])

    return (
        <div className="list-group-item list-group-item-action border-danger" aria-current="true">
            {loading ? <Loader /> : <>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1 gradient">{review.userId.name}</h5>
                    <small>{review.userId._id === props.userId ? <i className="fas fa-trash" onClick={() => {
                        setLoading(true);
                        axios.delete(`/api/review/${review['_id']}`)
                            .then((res) => {
                                setLoading(false);
                                return res.data
                            }).then((data) => {
                                if (data.updatedPlan) {
                                    props.setPlan(data.updatedPlan);
                                }
                            })
                    }}></i> : ""}</small>
                </div>
                <p className="mb-1 text-primary">{review.text} </p>
                <div className="d-flex w-100 justify-content-between">
                    <small className='fw-bold'> {review.rating} <i className="fas fa-star" style={{ color: "yellow" }}></i></small>
                    <small className='text-muted'>{review.createdAt}</small>
                </div>
            </>}
        </div>
    );
}

export default CustomerReview