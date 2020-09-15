import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setName, setEmail} from '../../reducers/user';
import InputForm from '../../components/InputForm';

class Name extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
        const {name, email, onSetName, onSetEmail} = this.props;
    
        if (name !== null && email !== null) {
            return <Redirect to='/choose' />;
        }
    
        return (
            <div>
                <InputForm
                    inputs={inputs}
                    buttonText='Далее'
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const name = e.target.querySelector('input[name="name"]').value;
                        const email = e.target.querySelector('input[name="email"]').value;
                        onSetName(name);
                        onSetEmail(email); 
                        this.authenticateUser(email);
                    }}
                />
            </div>
        );
    }

    authenticateUser(email) {
        return fetch('/user/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        });
    };
}

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
