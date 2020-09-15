import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class JoinChat extends Component {
    constructor(props) {
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
            <div>
                <form action='#' onSubmit={async (e) => {
                        e.preventDefault();
                        const {status} = await fetch(`/chat/join?id=${this.state.value}`);
                        console.log('status', status);
                        // обработка
                }}>
                    <label htmlFor='chat-id'>ID чата</label>
                    <input
                        id='chat-id'
                        name='chat-id'
                        type='text'
                        placeholder='ID чата'
                        required={true}
                        value={this.state.value}
                        onChange={(e) => {
                            this.setState({
                                value: e.target.value
                            });
                        }}
                    />
                    <button type='submit'>Присоединиться</button>
                </form>
    
            </div>
        );
    }
}

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
