import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import AdminDashboard from './dashboard';
import { Router } from "react-router-dom";
import history from '../../../history'

afterEach(cleanup);

it("loads admin dashboard", () => {
    const { asFragment } = render(
        <Provider store={store}>
            <Router history={history}>
                <AdminDashboard />
            </Router>
        </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});
