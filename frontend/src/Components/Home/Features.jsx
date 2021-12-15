import React from 'react';
import Delivery from '../../Assets/delivery.jpg'
import Customers from '../../Assets/customer.png'
import reviews from '../../Assets/reviewsImg.png'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

const Features = () => {

    const { ref, inView } = useInView({threshold: 0.2});

    useEffect(() => {
        if(inView){
            document.querySelector('.why').classList.add('whyHead');
        }
    }, [inView]);

    const [photo, setphoto] = useState(reviews);

    return (
        <div  ref={ref} className='container-fluid main'>
            <div className="row display-2 text-center justify-content-center pt-4 heading text-decoration-underline why">Why Trust Us ?</div>
            <div className="row justify-content-center justify-content-md-between mt-5">
                <div className="col-5 d-none d-md-block text-center justify-content-center align-align-items-center ms-4">
                    <img src={photo} alt='img' className="img-fluid rounded" />
                </div>
                <div className="col-md-5 me-md-4 col-11 ms-2 mt-2 mt-md-0">
                    <div className="list-group">
                        <div className="list-group-item list-group-item-action active this" onClick={(e) => {
                            let item = document.querySelector('.this');
                            console.log(item);
                            item.classList.remove('active');
                            item.classList.remove('this');
                            e.currentTarget.classList.add("active");
                            e.currentTarget.classList.add("this");
                            setphoto(reviews);
                        }} aria-current="true">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Over 5000 Happy Customers</h5>
                            </div>
                            <p className="mb-1">We Have Served Over 5000 fully satisfied customers. One you Start You Won't be Able To Stop</p>
                            <small>Average Rating- 4.5 out of 5500 reviews</small>
                        </div>
                        <div className="list-group-item list-group-item-action" onClick={(e) => {
                            let item = document.querySelector('.this');
                            console.log(item);
                            item.classList.remove('active');
                            item.classList.remove('this');
                            e.currentTarget.classList.add("active");
                            e.currentTarget.classList.add("this");
                            setphoto(Delivery);
                        }}>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Great Customer Support</h5>
                            </div>
                            <p className="mb-1">Our International Support Team Of Dieticians Will Help You Get in The Best Shape Of Your Life</p>
                            <small>Included In The Meal Plans</small>
                        </div>
                        <div className="list-group-item list-group-item-action" onClick={(e) => {
                            let item = document.querySelector('.this');
                            item.classList.remove('active');
                            item.classList.remove('this');
                            e.currentTarget.classList.add("active");
                            e.currentTarget.classList.add("this");
                            setphoto(Customers);
                        }}>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">On-Time Deliveries</h5>
                            </div>
                            <p className="mb-1">Never will you have to wait for a meal ever again. Get upto 10 meals delivered at once</p>
                            <small>Shipping Charge is Extra Depending on your Area.</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;