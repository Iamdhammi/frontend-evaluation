import React, {useEffect, useState} from 'react';
import Navbar from '../../../components/Navbar';
import { Button } from 'semantic-ui-react';
import ModalStory from '../../../components/Modal';
import {connect} from 'react-redux';
import {clearSuccess} from '../../../redux/actions/index';
import {fetchStories} from '../../../redux/actions/story';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import DataTable from '../../../components/DataTable';

const Success = ({message}) => (
    <div stle={{color: 'black', fontWeight: '500', display: 'flex'}}>
       <span role="img">✅</span> {message}
    </div>
)

function Dashboard(props){
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [userStories, setUserStories] = useState([]);

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

    const openModal = () => {
        setIsOpen(true);
    }
     
    const closeModal = () => {
        setIsOpen(false);
    }
    return (
        <div>
           <Navbar />
            <div className="container">
                <ToastContainer autoClose={8000} pauseOnHover={true} />
                <div className="container__header">
                    <div>
                        <h2>My Stories</h2>
                    </div>
                    <div>
                        <Button onClick={openModal}>
                            Create story
                        </Button>
                    </div>
                </div>
                <div>
                    <ModalStory openModal={modalIsOpen} closeModal={closeModal} />
                </div>
                <div className="container__body">
                    <DataTable stories={userStories} />
                </div>
            </div>
            
        </div>
    )
} 

const mapStateToProps = ({story}) => {
    return {
        isCreated: story.isCreated,
        stories: story.stories,
        isFetched: story.isFetched
    }
}

export default connect(
    mapStateToProps, {clearSuccess, fetchStories}
)(Dashboard)