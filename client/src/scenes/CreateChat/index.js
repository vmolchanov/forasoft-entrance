import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import InputForm from '../../components/InputForm';

const CreateChat = (props) => {
    const inputs = [
        {
            label: 'Название чата',
            placeholder: 'Вечерние посиделки',
            id: 'title',
            name: 'title',
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
                buttonText='Создать'
                onSubmit={(e) => {
                    e.preventDefault();
                    fetch('/create', {
                        method: 'POST',
                        // body:
                    });
                }}
            />
        </div>
    );
};

CreateChat.propTypes = {
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

export default connect(mapStateToProps, null)(CreateChat);
