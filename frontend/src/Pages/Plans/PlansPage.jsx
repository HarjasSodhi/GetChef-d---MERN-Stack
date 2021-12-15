import React from 'react';
import './plans.css'
import { AuthProvider } from '../../App'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import PlansContainer from '../../Components/Plans/PlansContainer';

const PlansPage = () => {

    let store = useContext(AuthProvider);

    return (
        <>
            {store.user === undefined ? <Redirect to='/login' /> : <PlansContainer />}
        </>
    );
}

export default PlansPage;