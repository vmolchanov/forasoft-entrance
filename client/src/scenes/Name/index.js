import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setName, setEmail} from '../../reducers/user';
import InputForm from '../../components/InputForm';

const Name = (props) => {
    const inputs = [
        {
            label: 'Ваше имя',
            placeholder: 'Иван',
            id: 'name',
            name: 'name',
            type: 'text',
            required: true
        },
        {
            label: 'Email',
            placeholder: 'mail@example.com',
            id: 'email',
            name: 'email',
            type: 'email',
            required: true
        }
    ];
    const {name, email} = props;

    if (name !== null && email !== null) {
        return <Redirect to='/choose' />;
    }

    return (
        <div>
            <InputForm
                inputs={inputs}
                buttonText='Далее'
                onSubmit={(e) => {
                    e.preventDefault();
                    const name = e.target.querySelector('input[name="name"]').value;
                    const email = e.target.querySelector('input[name="email"]').value;
                    props.onSetName(name);
                    props.onSetEmail(email);
                }}
            />
        </div>
    );
};

Name.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    onSetName: PropTypes.func.isRequired,
    onSetEmail: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        name: state.user.name,
        email: state.user.email
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetName: (name) => {
            dispatch(setName(name));
        },
        onSetEmail: (email) => {
            dispatch(setEmail(email));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Name);
