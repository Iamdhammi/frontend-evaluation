import React, {useState, useEffect} from 'react';
import { Icon, Input, Button, Checkbox, Form } from 'semantic-ui-react'
import logo from '../../images/logo/logo.png';
import {loginUser, loginAdmin} from '../../redux/actions/auth';
import {clearError, clearSuccess} from '../../redux/actions';
import {connect} from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';


const Error = ({ message }) => (
    <div style={{ color: 'black', fontWeight: '500', display: 'flex' }}>
      <span role="img">⚠️</span> {message}
    </div>
);
const Success = ({message}) => (
    <div stle={{color: 'black', fontWeight: '500', display: 'flex'}}>
       <span role="img">✅</span> {message}
    </div>
)

function Login(props) {
    const [showPassword, setShowPassword] = useState(false);

    const [details, setDetails] = useState({
        email: '',
        password: ''
    });
    const [admin, setAdmin] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [existingUserRole, setExistingUserRole] = useState('');

    const _fetchUser = async () => {
        try {
            const user = localStorage.getItem('evaluation_user');
            const userDetails = JSON.parse(user);
            return userDetails;
        }
        catch(error) {
            return error;
        }
        
    }
    
    useEffect(() => {
        _fetchUser().then(response => {
            console.log(response)
            if(response !== null) {
                setExistingUserRole(response.userRoles[0])
            }
        });
    }, [])

    useEffect(() => {
        if(existingUserRole){
            if(existingUserRole === 'User') {
                props.history.push('/user/dashboard');
            } else {
                props.history.push('/admin/dashboard');
            }
        }

        if(props.isAuthenticated ) {
            if(admin) {
                props.history.push('/admin/dashboard');
            }else {
                props.history.push('/user/dashboard');
            }
        }
        if (props.error) {
            toast(<Error message={props.error} />, {
              progressClassName: css({
                background: 'red!important',
              }),
            });
            props.clearError();
        };
        if(props.logout){
            toast(<Success message={"Logged out successfully"} />, {
                progressClassName: css({
                    background: 'green!important',
                }),
            });
            props.clearSuccess();
        }
    }, [props.error, props.isAuthenticated, props.logout, existingUserRole]);

    

    //Validation
    const checkSigninSchema = yup.object().shape({
		password: yup
		.string()
		.required('Password is required'),
		email: yup
		.string()
		.email('Email is invalid')
		.required('Email is required')
		
    })
    
    const clearInputError = () => {
        setEmailError('');
        setPasswordError('');
    }
    //user login
    const submitUserDetails = e => {
        e.preventDefault();
        checkSigninSchema
		.validate({
			email: details.email,
			password: details.password
		})
		.then(() => {
            clearInputError();
            if(admin) {
                props.loginAdmin(details);
            }else {
                props.loginUser(details);
            }
		})
		.catch(error => {
            switch (error.path) {
                case 'email':
                    clearInputError();
                    setEmailError(error.errors);
                    break;
                case 'password': 
                    clearInputError();
                    setPasswordError(error.errors);
                    break;
                default:
                    clearInputError();
                    break;
            }
		})
    }

    const toggleVisibility = e => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <div>
            <div className="login-container">
                <div className="grid grid--cols-2">
                    <div className="grid-cell-1-5">
                        <div className="login-container__content">
                            <div className="content">
                                <div className="content__logo">
                                    <img src={logo} className="content__logo--img"  alt="Logo" />
                                </div>
                                <div className="content__text">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos soluta fugit, 
                                        fugiat necessitatibus aperiam minima molestias sint enim ipsum perferendis maxime culpa similique modi tempora, 
                                        aliquid quasi magnam numquam doloremque.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos soluta fugit, 
                                        fugiat necessitatibus aperiam minima molestias sint enim ipsum perferendis maxime culpa similique modi tempora, 
                                        aliquid quasi magnam numquam doloremque.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid-cell">
                        <div className="login-container__fields">
                            <ToastContainer autoClose={8000} pauseOnHover={true} />
                            <div className="content">
                                <div className="content__header">
                                    <h2>Proceed to Archimydes</h2>
                                </div>
                                <Form onSubmit={submitUserDetails}>
                                    <Form.Field>
                                        <div className="form__control">
                                            <label>Email Address</label>
                                            <Input 
                                                iconPosition='left' 
                                                placeholder='Email' 
                                                type="email" 
                                                className="form__control--input"
                                                onChange={event => setDetails({...details, email: event.target.value})}
                                                error={emailError ? true : false}
                                                value={details.email}
                                            >
                                                <Icon name='mail' />
                                                <input/>
                                            </Input>
                                            <span className="span-error">{emailError}</span>
                                        </div>
                                    </Form.Field>

                                    <Form.Field>
                                        <div className="form__control">
                                            <label>Password</label>
                                            <Input 
                                                iconPosition="left" 
                                                placeholder='Password' 
                                                type={showPassword ? "text" : "password"} 
                                                className="form__control--input"
                                                onChange={event => setDetails({...details, password: event.target.value})}
                                                error={passwordError ? true : false}
                                                value={details.password}
                                            >
                                                <Icon name='key'/>
                                                <input />
                                            </Input>
                                            <span className="span-error">{passwordError}</span>
                                            {
                                                showPassword ?
                                                <Button icon="eye slash" onClick={toggleVisibility} className="form__control--icon" />  :
                                                <Button icon="eye" onClick={toggleVisibility} className="form__control--icon" />
                                            }
                                        </div>
                                    </Form.Field>
                                    <Form.Field>
                                        <div className="form__control">
                                            <Checkbox label='Proceed as an Admin' onChange={() => setAdmin(!admin)} />
                                        </div>
                                    </Form.Field>
                                    <div className="form__control">
                                        <Button fluid className="form__control--button" type="submit" loading={props.loading} disabled={props.loading}>
                                            <i aria-hidden="true" className="mail icon"></i>
                                            Log in
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ auth }) => {
    return {
        isAuthenticated: auth.isAuthenticated,
        error: auth.message,
        loading: auth.loading,
        user: auth.user,
        logout: auth.logout
    }
}
  
export default connect(
    mapStateToProps,
    {loginUser, loginAdmin, clearError, clearSuccess}
)(Login);
    