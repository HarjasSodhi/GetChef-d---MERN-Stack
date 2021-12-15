import React from 'react';
import { Redirect } from 'react-router-dom'
import { AuthProvider } from '../../App';
import { useParams } from 'react-router-dom';
import Overview from '../../Components/PlanDetail/Overview';
import './plansDeets.css'
import { useContext } from 'react';

const PlanDetailpage = () => {
    let { id } = useParams();
    let store = useContext(AuthProvider);
    return (
        <>
            {store.user === undefined ? <Redirect to='/login' /> : <Overview id={id} user={store.user} />}
        </>
    );
}

export default PlanDetailpage;