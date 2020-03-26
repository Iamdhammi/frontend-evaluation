import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Login from './login';
import { Router } from "react-router-dom";
import history from '../../history'

afterEach(cleanup);

it("loads Login component", () => {
    const { asFragment } = render(
        <Provider store={store}>
            <Router history={history}>
                <Login />
            </Router>
        </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
});

describe("login integration", () => {
  it("User should be able to login", async () => {
    const promise = Promise.resolve();
    const { getByText, getByPlaceholderText } = render(
        <Provider store={store}>
            <Router history={history}>
                <Login />
            </Router>
        </Provider>
    );

    userEvent.type(getByPlaceholderText("Email"), "test@test.com" );
    userEvent.type(getByPlaceholderText("Password"), "test@test");

    const SubmitBtn = getByText(/Log in/i);
    userEvent.click(SubmitBtn);

    expect(getByPlaceholderText("Email")).toHaveAttribute(
      "value",
      "test@test.com"
    );

    expect(getByPlaceholderText("Password")).toHaveAttribute(
      "value",
      "test@test"
    );

    await act(() => promise);
  });
});