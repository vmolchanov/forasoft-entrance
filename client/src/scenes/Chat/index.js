import './index.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import IncomingMessage from '../../components/IncomingMessage';
import OutgoingMessage from '../../components/OutgoingMessage';
import io from 'socket.io-client';
import {addMessage, changeCurrentMessage, downloadMessages} from '../../reducers/chat';
import {MessageType} from '../../enums/message-type';

class Chat extends Component {
    constructor(props) {
        super(props);
        
        this.socket = null;

        this.messagesRef = React.createRef();

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onTextAreaChange = this.onTextAreaChange.bind(this);
    }

    componentDidMount() {
        this.id = this.props.match.params.id;
        this.socket = io('http://localhost:3001');
        this.socket.emit('joinUser', this.id);
        this.socket.on('newMessage', (message) => {
            this.props.onAddMessage({
                ...message,
                type: MessageType.INCOMING
            });
        });
        this.props.onLoadComponent(this.id);
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    componentDidUpdate() {
        const element = this.messagesRef.current;
        element.scrollTop = element.scrollHeight;
    }
    
    render() {
        const {name, email, title} = this.props;
        if (name === null || email === null) {
            return <Redirect to='/' />;
        }

        return (
            <div className='Chat'>
                <h1 className='Chat__title'>{title}</h1>
                <div className='Chat__content'>
                    <div className='Chat__messages' ref={this.messagesRef}>
                        {this.props.messages.length === 0 ?
                            this.renderNoMessages() :
                            this.renderMessages(this.props.messages)}
                    </div>
                    <form className='Chat__control' onSubmit={this.onFormSubmit}>
                        <input
                            id='message'
                            name='message'
                            value={this.props.currentMessage}
                            onChange={this.onTextAreaChange}
                        />
                        <button type='submit'>Отправить</button>
                    </form>
                </div>
            </div>
        );
    }

    renderMessage(message, key) {
        const {type, name, body, time} = message;
        let Message;
        switch (type) {
            case MessageType.INCOMING:
                Message = IncomingMessage;
                break;
            case MessageType.OUTGOING:
                Message = OutgoingMessage;
                break;
            default:
                return null;
        }
        return <Message name={name} body={body} time={time} key={key} />;
    }

    renderMessages(messages) {
        return messages.map((message, index) => {
            return this.renderMessage(message, index);
        })
    }

    renderNoMessages() {
        return <p className='Chat__no-messages'>Сообщений нет</p>;
    }

    onFormSubmit(e) {
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

    onTextAreaChange(e) {
        this.props.onChangeCurrentMessage(e.target.value);
    }

    onFavouriteButtonClick(e) {
        e.preventDefault();

    }
}

Chat.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
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
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        name: state.user.name,
        email: state.user.email,
        messages: state.chat.messages,
        title: state.chat.title,
        currentMessage: state.chat.currentMessage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddMessage: (newMessage) => {
            dispatch(addMessage(newMessage));
        },
        onChangeCurrentMessage: (message) => {
            dispatch(changeCurrentMessage(message));
        },
        onLoadComponent: (id) => {
            dispatch(downloadMessages(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
