import React from 'react';

import classes from './TopHeader.module.css';
import Navigation from '../Navigation/Navigation';

const TopHeader = (props) => {
  return (
    <header className={classes['main-header']}>
    	<div className= "row">
    		<div className="col-md-6">
	      		<h1>{props.isAuthenticated ? "Welcome "+props.email : "Welcome to login page"}</h1>
	      	</div>
			<div className="col-md-6">
	      		<Navigation onLogout={props.onLogout} />
	      	</div>
	  	</div>
    </header>
  );
};

export default TopHeader;
