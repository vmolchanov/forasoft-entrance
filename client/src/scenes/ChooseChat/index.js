import './index.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {downloadChats} from '../../thunk/user';
import {ChooseChat} from "./ChooseChat";
import {requireAuthentication} from '../../hocs/requireAuthentication';
import {applyHocs} from '../../common/applyHocs';

class ChooseChatWrapper extends Component {
    static propTypes = {
        chats: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired
        }))
    }

    componentWillMount() {
        this.props.onLoadComponent();
    }

    render() {
        const {name, email, chats} = this.props;

        if (name === null || email === null) {
            return <Redirect to='/' />;
        }

        return (
            <ChooseChat chats={chats} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    chats: state.user.chats,
    name: state.user.name,
    email: state.user.email
});

const mapDispatchToProps = (dispatch) => ({
    onLoadComponent: () => dispatch(downloadChats())
});

export default applyHocs(ChooseChatWrapper, [
    connect(mapStateToProps, mapDispatchToProps),
    requireAuthentication()
]);