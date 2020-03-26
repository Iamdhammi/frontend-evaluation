import React, {useState, useEffect} from "react";
import Modal from 'react-modal';
import { Form, Input, TextArea, Select, Button } from 'semantic-ui-react';
import {connect} from 'react-redux';
import { createStory } from '../redux/actions/story';
import * as yup from 'yup';
 
// Modal.setAppElement('#root');
if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

//Modal style
const customStyles = {
    content : {
        top : '50%',
        left : '50%',
        right : 'auto',
        bottom : 'auto',
        marginRight: '-50%',
        transform : 'translate(-50%, -50%)',
        // minHeight: 700,
        // overflow: 'auto'
    }
};

const storyOptions = [
    { key: 1, value: 'enchancement', text: 'Enhancemanet' },
    { key: 2, value: 'bugfix', text: 'Bug fix' },
    { key: 3, value: 'development', text: 'Development' },
    { key: 4, value: 'qa', text: 'QA' },
]

const complexityOptions = [
    { key: 1, value: 'low', text: 'Low' },
    { key: 2, value: 'mid', text: 'Mid' },
    { key: 3, value: 'high', text: 'High' },
]

function ModalStory(props) {
    const [story, setStory] = useState({
        summary: '',
        description: '',
        type: '',
        complexity: '',
        estimatedHrs: '',
        cost: ''
    });
    const [summaryError, setSummaryError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [complexityError, setComplexityError] = useState('');
    const [estimatedError, setEstimatedError] = useState('');
    const [costError, setCostError] = useState('');

    useEffect(() => {
        if(!props.openModal) {
            clearInputError();
        }
        if(props.isCreated) {
            props.closeModal()
        }
    }, [props.openModal, props.isCreated])

    const checkStorySchema = yup.object().shape({
        cost: yup
        .string()
		.required('Cost is required'),
        estimatedHrs: yup
        .string()
		.required('Estimated time is required'),
        complexity: yup
        .string()
		.required('Complexity is required'),
        type: yup
        .string()
		.required('Type is required'),
		description: yup
		.string()
		.required('Description is required'),
		summary: yup
		.string()
		.required('Summary is required')
		
    });
    
    const clearInputError = () => {
        setSummaryError('');
        setDescriptionError('');
        setTypeError('');
        setComplexityError('');
        setEstimatedError('');
        setCostError('');
    }

    const handleInput = e => {
        e.preventDefault();
        checkStorySchema
		.validate({
			summary: story.summary,
            description: story.description,
            type: story.type,
            complexity: story.complexity,
            estimatedHrs: story.estimatedHrs,
            cost: story.cost
		})
		.then(() => {
            clearInputError();
            props.createStory(story);
		})
		.catch(error => {
			switch (error.path) {
                case 'summary':
                    clearInputError();
                    setSummaryError(error.errors);
                    break;
                case 'description': 
                    clearInputError();
                    setDescriptionError(error.errors);
                    break;
                case 'type': 
                    clearInputError();
                    setTypeError(error.errors);
                    break;
                 case 'complexity': 
                    clearInputError();
                    setComplexityError(error.errors);
                    break;
                case 'estimatedHrs': 
                    clearInputError();
                    setEstimatedError(error.errors);
                    break;
                case 'cost': 
                    clearInputError();
                    setCostError(error.errors);
                    break;
                    default:
                    clearInputError("");
                    break;
            }
		})
    }

    const clearStory = {
        summary: '',
        description: '',
        type: '',
        complexity: '',
        estimatedHrs: '',
        cost: '',
    }

    const onCloseModal = () => {
        props.closeModal();
        setStory(clearStory);
    }
    

    return (
        <div >
            <Modal
                isOpen={props.openModal}
                onRequestClose={onCloseModal}
                style={customStyles}
            >   
                <div>
                    <div>
                        <h2>Create a story</h2>
                    </div>
                    <div className="form">
                        <Form onSubmit={handleInput}>
                            <Form.Field>
                                <div className="form__control">
                                    <label>Summary</label>
                                    <div>
                                        <Input 
                                            placeholder="Summary" 
                                            onChange={event => setStory({...story, summary: event.target.value })} 
                                            className="form__control--input"
                                            error={summaryError ? true : false}
                                            value={story.summary}
                                        />
                                        <div><span className="span-error">{summaryError}</span></div>
                                    </div>
                                </div>
                            </Form.Field>
                        
                            <Form.Field>
                                <div className="form__control">
                                    <label>Description</label>
                                    <div>
                                            <TextArea 
                                                onChange={(e , {value}) => setStory({...story, description: value})} 
                                                className="form__control--textarea"
                                                value={story.description}
                                                placeholder="Description"
                                            />
                                        <div><span className="span-error">{descriptionError}</span></div>
                                    </div>
                                </div>
                            </Form.Field>

                            <Form.Field>
                                <div className="form__control">
                                    <label>Types</label>
                                    <div>
                                        <Select 
                                            placeholder='Select Types' 
                                            onChange={(e, {value}) => setStory({...story, type: value})}
                                            options={storyOptions} 
                                            className="form__control--input" 
                                            error={typeError ? true : false}
                                            value={story.type}
                                        />
                                        <div><span className="span-error">{typeError}</span></div>
                                    </div>
                                </div>
                            </Form.Field>
                                
                            <Form.Field>
                                <div className="form__control">
                                    <label>Complexity</label>
                                    <div>
                                        <Select 
                                            placeholder='Select Complexity' 
                                            options={complexityOptions} 
                                            onChange={(e, {value}) => setStory({...story, complexity: value})} 
                                            className="form__control--input" 
                                            error={complexityError ? true : false}
                                            value={story.complexity}
                                        />
                                        <div><span className="span-error">{complexityError}</span></div>
                                    </div>
                                </div>
                            </Form.Field>
                            
                            <Form.Field>
                                <div className="form__control">
                                    <label>Estimated time for completion (hr)</label>
                                    <div>
                                        <Input 
                                            placeholder='Estimated time'   
                                            type="number" onChange={event => setStory({...story, estimatedHrs: event.target.value})} 
                                            className="form__control--input" 
                                            error={estimatedError ? true : false}
                                            value={story.estimatedHrs}
                                        />
                                        <div><span className="span-error">{estimatedError}</span></div>
                                    </div>
                                </div>
                            </Form.Field> 
                            
                            <Form.Field>
                                <div className="form__control">
                                    <label>Cost</label>
                                    <div>
                                        <Input 
                                            icon="dollar" 
                                            iconPosition="left" 
                                            placeholder='Cost' 
                                            onChange={event => setStory({...story, cost: event.target.value})} 
                                            type="number" 
                                            className="form__control--input" 
                                            error={costError ? true : false}
                                            value={story.cost}
                                        />
                                        <div><span className="span-error">{costError}</span></div>
                                    </div>
                                </div>
                            </Form.Field>
                        
                        <div className="form__control--button">
                            <Button type="submit" loading={props.loading} disabled={props.loading}>Submit</Button>
                        </div>
                        </Form>
                    </div>
                </div>
            </Modal>
            
        </div>
    );
}

const mapStateToProps = ({story}) => {
    return {
        loading: story.loading,
        isCreated: story.isCreated
    }
}

export default connect(
    mapStateToProps, {createStory}
)(ModalStory)