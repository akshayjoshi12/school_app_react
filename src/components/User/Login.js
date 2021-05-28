import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './Login.module.css';
import userList from '../../json/user-json';
import { authActions } from '../../store/auth';

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState('');

    const dispatch = useDispatch();
    let userEmailArray = [];

    for (const key in userList) {
        userEmailArray.push(userList[key].email);
    }

    const emailChangeHandler = (event) => {
		setEmail(event.target.value);
	}

    const passwordChangeHandler = (event) => {
	    setPassword(event.target.value);
	    setFormIsValid(
	      event.target.value.trim().length > 6
	    );
  	};

    const validatePasswordHandler = () => {
        setPasswordIsValid(password.trim().length > 6)
    }
    const userLoginHandler = (event) => {
		event.preventDefault();

        //const emailIs = arr.find(email => value === loggedInUser)
        if(email.trim().length == 0 || password.trim().length == 0) {
			//setFormIsValid("0");
			setError({
					title: "Invalid data.",
					message: "Username and password both required."
				});
			return;
		}
        if(!passwordIsValid || !userEmailArray.find(value => value === email)) {
			setError({
					title: "Invalid data.",
					message: "Please enter proper username and/or password."
				});
			return;
		}
        for (const key in userList) {
            if(userList[key].email == email && userList[key].role == 'admin') {
                dispatch(authActions.isAdmin({isAdmin: true}));
            } 
        }
        dispatch(authActions.login());
		props.onLogin(email);
    }

    return (
        <Card className={`${classes.loginContainer} shadow p-3 mb-5 rounded`}>
            <form onSubmit={userLoginHandler}>
                <div className="form-group" >
                    <label htmlFor="email">Username: </label>
                    <input
                        className="form-control"
                        type="email" 
                        id="email"
                        onChange={emailChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input 
                        className="form-control"
                        type="password" 
                        id="password"
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className="form-group">
                    <Button type="submit" className="btn-primary" >
                        <FontAwesomeIcon icon={faUser} /> Sign In 
                    </Button>
                </div>
                <div>
                    {error.message ? <span className="text-danger">{error.message}</span> : ''}
                </div>
            </form>
        </Card>
    )
}

export default Login;