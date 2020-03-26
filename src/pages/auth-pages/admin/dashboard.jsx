import React, {useEffect, useState} from 'react';
import Navbar from '../../../components/Navbar';
import { Button } from 'semantic-ui-react';
import {connect} from 'react-redux';
import {clearSuccess} from '../../../redux/actions/index';
import {fetchStories} from '../../../redux/actions/admin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import AdminDataTable from '../../../components/AdminDatatable';

const Success = ({message}) => (
    <div stle={{color: 'black', fontWeight: '500', display: 'flex'}}>
       <span role="img">✅</span> {message}
    </div>
)

function AdminDashboard(props){
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
            const newArr = props.stories.map((value, index) => {
                return {
                    id: index,
                    createdBy: value.createdBy,
                    status: value.status,
                    summary: value.summary,
                    description: value.description,
                    type: value.type,
                    complexity: value.complexity,
                    estimatedHrs: value.estimatedHrs,
                    cost: value.cost
                }
            });
            setUserStories(newArr)
        }

    }, [isCreated, isFetched])



    return (
        <div>
           <Navbar history={props.history}/>
            <div className="container">
                <ToastContainer autoClose={8000} pauseOnHover={true} />
                <div className="container__header">
                    <div>
                        <h2>All Stories</h2>
                    </div>
                </div>
                <div className="container__body">
                    <AdminDataTable stories={userStories}/>
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
)(AdminDashboard)