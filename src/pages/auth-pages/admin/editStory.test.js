import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import EditStory from './editStory';
import { Router, Route } from "react-router-dom";
import history from '../../../history'

afterEach(cleanup);

it("loads edit story", () => {
    const { asFragment } = render(
        <Provider store={store}>
            <Router history={history}>
                <Route path="/admin/stories/:id">
                    <EditStory />
                </Route>
            </Router>
        </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});
