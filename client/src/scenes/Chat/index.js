import './index.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {MessageType} from '../../enums/message-type';
import {addMessage, changeCurrentMessage, connectToChat, disconnectChat} from '../../actions/chat';
import {downloadMessages} from '../../thunk/chat';
import {Chat} from './Chat';
import {requireAuthentication} from '../../hocs/requireAuthentication';
import {applyHocs} from '../../common/applyHocs';
import {withRouter} from 'react-router-dom';

class ChatWrapper extends Component {
    constructor(props) {
        super(props);
        this.messagesRef = React.createRef();
    }

    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string,
            name: PropTypes.string,
            body: PropTypes.string,
            time: PropTypes.oneOfType([
                PropTypes.string.isRequired,
                PropTypes.instanceOf(Date)
            ])
        })).isRequired,
        currentMessage: PropTypes.string.isRequired,
        onAddMessage: PropTypes.func.isRequired,
        onChangeCurrentMessage: PropTypes.func.isRequired
    }

    componentDidMount() {
        const {
            onConnectToChat,
            onAddMessage,
            onLoadComponent,
            match
        } = this.props;
        console.log('this', this);
        onConnectToChat(match.params.id, onAddMessage, onLoadComponent);
    }

    componentWillUnmount() {
        this.props.onDisconnectChat();
    }

    componentDidUpdate() {
        const element = this.messagesRef.current;
        element.scrollTop = element.scrollHeight;
    }
    
    render() {
        const {title, messages, currentMessage} = this.props;

        return (
            <Chat
                title={title}
                messages={messages}
                onFormSubmit={this.onFormSubmit}
                currentMessage={currentMessage}
                onTextAreaChange={this.onTextAreaChange}
                messagesRef={this.messagesRef}
            />
        );
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        const today = new Date();
        const message = {
            type: MessageType.OUTGOING,
            name: this.props.name,
            body: this.props.currentMessage,
            time: today,
            email: this.props.email,
            id: this.id
        };
        this.socket.emit('sendMessage', message);
        this.props.onAddMessage(message);
        this.props.onChangeCurrentMessage('')
    }

    onTextAreaChange = (e) => {
        this.props.onChangeCurrentMessage(e.target.value);
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    messages: state.chat.messages,
    title: state.chat.title,
    currentMessage: state.chat.currentMessage
});

const mapDispatchToProps = (dispatch) => ({
    onConnectToChat: (id, onAddMessage, onLoadComponent) => dispatch(connectToChat(id, onAddMessage, onLoadComponent)),
    onDisconnectChat: () => dispatch(disconnectChat()),
    onAddMessage: (newMessage) => dispatch(addMessage(newMessage)),
    onChangeCurrentMessage: (message) => dispatch(changeCurrentMessage(message)),
    onLoadComponent: (id) => dispatch(downloadMessages(id))
});

export default applyHocs(ChatWrapper, [
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    requireAuthentication()
]);