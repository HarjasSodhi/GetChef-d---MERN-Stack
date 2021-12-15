import React from 'react';
import Card from './Card'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../Common/Loader/Loader'

axios.defaults.withCredentials = true
const PlansContainer = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [Len, setLen] = useState(0);
    const [Plans, setPlans] = useState([]);

    useEffect(() => {
        axios.get('/api/plan/getLength')
            .then((res) => {
                return res.data;
            }).then((data) => {
                setLen(Math.ceil((Number(data.length)) / 3));
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        axios.get(`/api/plan/?page=${page}`)
            .then((res) => {
                setLoading(false);
                return res.data
            }).then((data) => {
                setPlans(data.plans);
            })
    }, [page]);

    let arr = [];
    for (let i = 1; i <= Len; i++) {
        arr.push(i);
    }

    return (
        <div className='container-fluid plansBox mt-5 mb-5'>
            <div className="row justify-content-center display-2 pt-3 gradient">Explore Plans</div>
            <div className="row mt-3 justify-content-center">
                {
                    loading ? <Loader /> : Plans.map((el, idx) => {
                        return <Card key={idx} data={el} col={3} />
                    })
                }
            </div>
            <div className="row justify-content-center mt-3">
                <nav aria-label="Page navigation example ">
                    <ul className="pagination justify-content-center">
                        <li className="page-item border border-primary "><div className="page-link" onClick={() => {
                            if (page > 1) {
                                setPage(page - 1);
                            }
                        }} >Previous</div></li>
                        {
                            arr.map((el) => {
                                return <li className="page-item border border-primary" onClick={() => {
                                    setPage(el);
                                }}><div className="page-link" >{el}</div></li>
                            })
                        }
                        <li className="page-item border border-primary "><div className="page-link" onClick={() => {
                            if (page < Len) {
                                setPage(page + 1);
                            }
                        }}>Next</div></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default PlansContainer;