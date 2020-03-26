import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import Dashboard from './dashboard';
import { Router } from "react-router-dom";
import history from '../../../history'

afterEach(cleanup);

it("loads user dashboard", () => {
    const { asFragment } = render(
        <Provider store={store}>
            <Router history={history}>
                <Dashboard />
            </Router>
        </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});
