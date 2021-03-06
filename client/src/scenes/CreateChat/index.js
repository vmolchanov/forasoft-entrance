import './index.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';


class CreateChat extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    render() {
        const {name, email} = this.props;

        if (name === null || email === null) {
            return <Redirect to='/' />;
        }

        return (
            <div className='CreateChat'>
                <form className='CreateChat__form' action='#' method='POST' onSubmit={(e) => {
                    e.preventDefault();
                    fetch('/chat/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: this.state.value
                        })
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then(({id}) => {
                            this.props.history.push(`/chat/${id}`);
                        });
                }}>
                    <div className='CreateChat__content'>
                        <div className='CreateChat__input'>
                            <label htmlFor='title'>Название чата</label>
                            <input
                                id='title'
                                name='title'
                                type='text'
                                placeholder='Вечерние посиделки'
                                required={true}
                                value={this.state.value}
                                onChange={(e) => {
                                    this.setState({
                                        value: e.target.value
                                    })
                                }}
                            />
                        </div>
                        
                        <button className='CreateChat__button' type='submit'>Создать</button>
                    </div>
            </form>
            </div>
        );
    }
}

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
