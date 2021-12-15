import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import BuyButton from './BuyButton'
import MyReview from './MyReview'
import AllReviews from './AllReviews'
import Loader from '../Common/Loader/Loader';

axios.defaults.withCredentials = true
const Overview = (props) => {
    const [loading, setLoading] = useState(false)
    const [Plan, setPlan] = useState({ image: [], reviews: [] })

    useEffect(() => {
        setLoading(true);
        axios.get(`/api/plan/${props.id}`)
            .then((res) => {
                setLoading(false);
                return res.data;
            }).then((data) => {
                setPlan(data.plan);
            })
    }, [props.id]);

    return (
        <div className='container-md planDeets mt-5 mb-5'>
            {loading ? <Loader /> : <>
                <div className="row justify-content-center h1 pt-3 gradient">{Plan.name}</div>
                <div className="row pt-4 justify-content-center">
                    <div className="col-10 col-md-7 text-center justify content-center">
                        <img src={Plan.image[0]} alt="img" className='img-fluid rounded' />
                    </div>
                    <div className="col-10 col-md-5">
                        <div className="row h3 gradient mt-4 mt-md-0">Description</div>
                        <div className="row bold">{Plan.description}</div>
                        <div className="row">
                            <div className="h5 gradient mt-3">Duration -</div>
                            <div className='bold'>{Plan.duration} weeks</div>
                            <div className="h5 gradient mt-3">Rating -</div>
                            <div className='bold'>{(Plan.rating + '').substring(0, 3)} <i className="fas fa-star" style={{ color: "yellow" }}></i></div>
                        </div>
                        <div className="row justify-content-center mt-4 align-items-center align-content-center">
                            <div className="col text-center">
                                <span className="gradient h3">Price - </span>
                                <span className='text-decoration-line-through text-primary h5'>${Plan.price}</span>
                                <span className="display-5 text-danger">
                                    ${Number(Plan.price) - Number(Plan.discount)}
                                </span>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-4">
                            <div className="col-10 text-center">
                                <BuyButton planId={props.id} buyingPrice={Number(Plan.price) - Number(Plan.discount)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="row justify-content-md-center h1 gradient ms-md-1 ms-0">Reviews</div>
                    <MyReview planId={props.id} setPlan={setPlan} />
                </div>
                <div className="row mt-5 justify-content-center">
                    <AllReviews reviews={Plan.reviews} setPlan={setPlan} />
                </div>
            </>}
        </div >
    );
}

export default Overview;