import React from 'react';
import egg from '../../Assets/egg.png'
import './NotFound.css'

const PageNotFound = () => {
    return (
        <div className="container-lg Container404 mt-5 mb-5">
            <div className="row display-1 fw-bold justify-content-center text-danger gradient pt-5">
                <div className="col-10 text-center">
                    Oops!! Page Not Found.
                </div>
            </div>
            <div className="row display-1 gap-0 fw-bold justify-content-center text-danger text-decoration-underline align-items-center gradient mt-5 pb-5">
                <span className="col-1 h1 gradient display-1 fw-bold text-center align-items-center ">4</span>
                <span className="col-3 text-center align-items-center"><img src={egg} className='img-fluid' alt='0' /></span>
                <span className="col-1 h1 gradient display-1 fw-bold text-center align-items-center">4</span>
            </div>
        </div>
    );
}

export default PageNotFound;