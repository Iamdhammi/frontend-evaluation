import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { logoutUser } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LayoutRoute = ({
  component: Component,
  auth,
  logoutUser,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {

        const checkStorageUser = () => {
            const user = localStorage.getItem('evaluation_user');
            console.log(user)
            if (user) {
                return true;
            }else{
              return false;
            }
        }
        return auth.isAuthenticated === true || checkStorageUser() ? (
            <Component {...props} />
        ) : (
            <Redirect to="/" />
        );
    }}
  />
);

LayoutRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const map_state_to_props = state => ({
  auth: state.auth,
});

export default connect(
  map_state_to_props,
  { logoutUser },
)(LayoutRoute);