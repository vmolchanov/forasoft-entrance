import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import InputForm from '../../components/InputForm';

const JoinChat = (props) => {
    const inputs = [
        {
            label: 'ID чата',
            placeholder: 'ID чата',
            id: 'chat-id',
            name: 'chat-id',
            type: 'text',
            required: true
        }
    ];
    const {name, email} = props;

    if (name === null || email === null) {
        return <Redirect to='/' />;
    }

    return (
        <div>
            <InputForm
                inputs={inputs}
                buttonText='Присоединиться'
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            />
        </div>
    );
};

JoinChat.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        name: state.user.name,
        email: state.user.email
    };
};

export default connect(mapStateToProps, null)(JoinChat);
