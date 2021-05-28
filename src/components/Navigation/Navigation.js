import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import classes from './Navigation.module.css';
import { authActions } from '../../store/auth';

const Navigation = (props) => {

    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    const userLogoutHandler = () => {
        dispatch(authActions.logout());
        props.onLogout();
    }
    
    return (
        <nav className={classes.nav}>
            {isAuth && (<ul>
                    <li>
                        <button onClick={userLogoutHandler}>Logout</button>
                    </li>
                </ul>
            )}
        </nav>
    )
}

export default Navigation;