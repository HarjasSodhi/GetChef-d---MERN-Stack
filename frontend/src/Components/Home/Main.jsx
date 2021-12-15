import React from 'react';
import { useHistory } from 'react-router-dom'

const Main = () => {
    const history = useHistory();
    return (
        <div className='homeMain container-lg mt-md-0 mt-5 pt-3'>
            <div className="display-2 text-center text-white mt-5 tag1">
                Are You Stressed By Cooking ?
            </div>
            <div className="display-2 text-center text-white mt-3 tag2">
                Are You Unable To Eat Healthy ?
            </div>
            <div className="display-2 text-center text-white mt-3 tag3">
                Then <span className="display-2 text-danger tag4 tag3 brand">GetChef'd</span> Now !!
            </div>
            <div className="row mt-5 pt-3 btrow">
                <div className="col text-center">
                    <button type="button" className="btn btn-lg btn-outline-primary" onClick={() => {
                        history.push('/plans');
                    }}>Browse Plans</button>
                </div>
            </div>
        </div>
    );
}

export default Main;