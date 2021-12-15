import React from 'react';
import Card from '../Plans/Card'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Common/Loader/Loader'
import { useInView } from 'react-intersection-observer';

axios.defaults.withCredentials = true
const Bestsellers = () => {

    const { ref, inView } = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            document.querySelector('.bestSellersHead').classList.add('whyHead');
        }
    }, [inView]);

    const [Plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetch = () => {
            setLoading(true);
            axios.get('/api/plan/getBestsellers')
                .then((res) => {
                    return res.data
                }).then((data) => {
                    let arr = data.plans
                    let temp = arr[0];
                    arr[0] = arr[1];
                    arr[1] = temp;
                    setPlans(arr);
                    setLoading(false);
                })
        }
        fetch();
    }, [])

    return (
        <>
            {loading ? <Loader /> :
                <div ref={ref} className="container-fluid bestSellersBox mb-5">

                    <div className="row display-2 text-center justify-content-center pt-4 heading text-decoration-underline bestSellersHead mt-4 mb-4 ">Our Bestsellers</div>
                    <div className="row mt-5 align-items-center justify-content-center">
                        {
                            Plans.map((el, idx) => {
                                if (Number(idx) === 1) {
                                    return <Card key={idx} data={el} col={4} />
                                }
                                else {
                                    return <Card key={idx} data={el} />
                                }
                            })
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default Bestsellers;