import React from 'react';
import appPhoto from '../../Assets/appPhoto.png'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

const Steps = () => {

    const { ref, inView } = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            document.querySelector('.stepsHead').classList.add('whyHead');
        }
    }, [inView]);

    return (
        <div ref={ref} className="container-fluid stepsContainer">
            <div className="row display-2 text-center justify-content-center pt-4 heading text-decoration-underline stepsHead">Steps To Follow</div>
            <div className="row justify-content-center mt-5 pb-5">
                <div className="col-10 col-md-6 ms-4">
                    <div className="row align-content-center align-items-center">
                        <div className="col-2 col-md-1 display-6 border rounded-circle border-danger border-5 text-danger text-center">1</div>
                        <div className="col col-md-10 ms-3 h5">Browse And Choose The Subscription you Like</div>
                    </div>
                    <div className="row align-content-center align-items-center  mt-5">
                        <div className="col-2 col-md-1 display-6 border rounded-circle border-danger border-5 text-danger text-center">2</div>
                        <div className="col col-md-10 ms-3 h5">Enter your Details and Create an account</div>
                    </div>
                    <div className="row align-content-center align-items-center  mt-5">
                        <div className="col-2 col-md-1 display-6 border rounded-circle border-danger border-5 text-danger text-center">3</div>
                        <div className="col col-md-10 ms-3 h5">Place The Order And Never Feel the need to cook again</div>
                    </div>
                </div>
                <div className="col-12 mt-5 me-0 me-md-5 mt-md-0 col-md-3 text-center align-content-center align-items-center">
                    <img src={appPhoto} alt="appPhoto" className="img-fluid" />
                </div>
            </div>
        </div>
    );
}

export default Steps;