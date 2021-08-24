import './index.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {CreateChat} from './CreateChat';
import {createChat} from '../../thunk/chat';
import {requireAuthentication} from '../../hocs/requireAuthentication';
import {applyHocs} from '../../common/applyHocs';

class CreateChatWrapper extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    static propTypes  = {
        name: PropTypes.string,
        email: PropTypes.string
    }

    render() {
        const {name, email} = this.props;

        if (name === null || email === null) {
            return <Redirect to='/' />;
        }

        return (
            <CreateChat
                onFormSubmit={this.onFormSubmit}
                onTitleInputChange={this.onTitleInputChange}
                titleInputValue={this.state.value}
            />
        );
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onCreateChat(this.state.value).then(({id}) => {
            this.props.history.push(`/chat/${id}`);
        });
    }

    onTitleInputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    name: state.user.name,
    email: state.user.email
});

const mapDispatchToProps = (dispatch) => ({
    onCreateChat: (title) => dispatch(createChat(title))
});

export default applyHocs(CreateChatWrapper, [
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    requireAuthentication()
]);