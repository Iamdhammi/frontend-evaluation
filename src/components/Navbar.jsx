import React, {useState, useEffect} from 'react';
import { Button } from 'semantic-ui-react';
import logo from '../images/logo/logo.png';
import {connect} from 'react-redux'
import {logoutUser} from '../redux/actions/auth';

function Navbar(props) {

    useEffect(() => {
        if(props.logout) {
            props.history.push('/');
        };
    }, [props.logout])

    return (
        <nav className="nav">
            <div className="nav__container">
                <div className="nav__logo">
                    <img src={logo} alt="Logo" className="nav__logo--img" />
                </div>
                <div className="nav_routes">
                     <Button onClick={() => props.logoutUser()}>
                        Log out
                    </Button>
                </div>
            </div>
        </nav>
    );
}

const mapStateToProps = ({auth}) => {
    return {
        logout: auth.logout
    };
};

export default connect(
    mapStateToProps, {logoutUser}
)(Navbar);