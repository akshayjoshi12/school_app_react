import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../UI/Card';

const Dashboard = (props) => {
    //const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    return (
        <Card>
            {(isAuth && isAdmin) && <div>Welcome to admin dashboard.</div>}
            {(isAuth && !isAdmin) && <div>Welcome to user dashboard.</div>}
        </Card>
    )
}

export default Dashboard;