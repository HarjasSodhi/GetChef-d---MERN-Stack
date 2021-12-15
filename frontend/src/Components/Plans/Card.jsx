import React from 'react';
import { Link } from 'react-router-dom'

const Card = (props) => {
    let col = props.col ? props.col : 3;
    return (
        <div className={`col-10 col-lg-${col} my-4`}>
            <div className="card">
                <img src={props.data.image[0]} className="card-img-top img-fluid" alt="..." />
                <div className="card-body text-center">
                    <h5 className="card-title">{props.data.name}</h5>
                    <p className="card-text">
                        <span className='text-decoration-line-through me-2 text-primary h5'>${props.data.price}</span>
                        <span className="display-5 text-danger">
                            ${Number(props.data.price) - Number(props.data.discount)}
                        </span></p>
                    <Link to={`/plans/${props.data['_id']}`} className="btn btn-outline-primary">Learn More</Link>
                </div>
            </div>
        </div>
    );
}

export default Card;