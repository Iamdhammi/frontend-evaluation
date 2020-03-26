import React, {useEffect, useState} from 'react';
import Navbar from '../../../components/Navbar';
import { Button, Input } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {clearSuccess} from '../../../redux/actions/index';
import {fetchStories} from '../../../redux/actions/admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

const Success = ({message}) => (
    <div stle={{color: 'black', fontWeight: '500', display: 'flex'}}>
       <span role="img">✅</span> {message}
    </div>
)

function EditStory(props){
    const [userStories, setUserStories] = useState('');
    const { id } = props.match.params;
    const {isCreated, clearSuccess, isFetched} = props;
    
    useEffect(() => {
        props.fetchStories();
        if(isCreated) {
            toast(<Success message={"Story created successfully"} />, {
                progressClassName: css({
                    background: 'green!important',
                }),
            });
           clearSuccess();
        }
        if(isFetched) {
            setUserStories(props.stories)
        }

    }, [isCreated, isFetched])

    const handleInput = () => {
        props.history.push('/admin/dashboard');
    }

    return (
        <div>
           <Navbar />
            <div className="container">
                <ToastContainer autoClose={8000} pauseOnHover={true} />
                <div className="container__header" style={{display: 'flex', justifyContent: 'center'}}>
                    <div>
                        <h2>Edit Story</h2>
                    </div>
                </div>
                <div className="container__body" style={{display: 'flex', justifyContent: 'center'}}>
                    
                    <div className="form">
                        <div className="form__control">
                            <div className="form__control--label">
                                <p>Summary</p>
                            </div>
                            <div>
                                <Input 
                                    className="form__control--input"
                                    value={userStories ? userStories[id].summary : ''}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form__control">
                            <div className="form__control--label">
                                <p>Description</p>
                            </div>
                            <div>
                                <Input 
                                    className="form__control--input"
                                    value={userStories ? userStories[id].description : ''}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form__control">
                            <div className="form__control--label">
                                <p>Types</p>
                            </div>
                            <div>
                                <Input 
                                    className="form__control--input"
                                    value={userStories ? userStories[id].type : ''}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form__control">
                            <div className="form__control--label">
                                <p>Complexity</p>
                            </div>
                            <div>
                                <Input 
                                    className="form__control--input"
                                    value={userStories ? userStories[id].complexity : ''}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form__control">
                            <div className="form__control--label">
                                <p>Estimated time for completion (hr)</p>
                            </div>
                            <div>
                                <Input 
                                    className="form__control--input"
                                    value={userStories ? userStories[id].estimatedHrs : ''}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form__control">
                            <div className="form__control--label">
                                <p>Cost</p>
                            </div>
                            <div>
                                <Input 
                                    className="form__control--input"
                                    value={userStories ? userStories[id].cost : ''}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="form__control">
                            <div className="form__control--label">
                                <p>Status</p>
                            </div>
                            <div>
                                <Input 
                                    className="form__control--input"
                                    value={userStories ? userStories[id].status : ''}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="form__control--button">
                            <Button onClick={handleInput} className="btn">Approve</Button>
                        </div>
                        <div className="form__control--button">
                            <Button onClick={handleInput} className="btn--reject">Reject</Button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
} 

const mapStateToProps = ({admin}) => {
    return {
        isCreated: admin.isCreated,
        stories: admin.stories,
        isFetched: admin.isFetched
    }
}

export default connect(
    mapStateToProps, {clearSuccess, fetchStories}
)(EditStory)