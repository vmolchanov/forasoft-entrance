import './index.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setName, setEmail} from '../../reducers/user';

class Name extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: ''
        };
    }

    render() {
        const {name, email, onSetName, onSetEmail} = this.props;
    
        if (name !== null && email !== null) {
            return <Redirect to='/choose' />;
        }
    
        return (
            <div className='Name'>
                <form className='Name__form' action='#' onSubmit={async (e) => {
                        e.preventDefault();
                        const name = e.target.querySelector('input[name="name"]').value;
                        const email = e.target.querySelector('input[name="email"]').value;
                        onSetName(name);
                        onSetEmail(email); 
                        this.authenticateUser(email);
                }}>
                    <div className='Name__form-content'>
                        <div className='Name__input'>
                            <label htmlFor='name'>Ваше имя</label>
                            <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='Иван'
                                required={true}
                                value={this.state.name}
                                onChange={(e) => {
                                    this.setState({
                                        name: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className='Name__input'>
                            <label htmlFor='email'>Email</label>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                placeholder='mail@example.com'
                                required={true}
                                value={this.state.email}
                                onChange={(e) => {
                                    this.setState({
                                        email: e.target.value
                                    })
                                }}
                            />
                        </div>
                        <button className='Name__button' type='submit'>Далее</button>
                    </div>
                </form>
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
