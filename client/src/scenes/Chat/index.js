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
                type: MessageType.OUTGOING
            });
        });
        this.props.onLoadComponent(this.id);
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }
    
    render() {
        const {name, email} = this.props;
        if (name === null || email === null) {
            return <Redirect to='/' />;
        }

        return (
            <div className='Chat'>
                <div className="Chat__actions">
                    <button type='button' onClick={() => {}}>В избранное</button>
                </div>
                <div className='Chat__messages'>
                    {this.props.messages.length === 0 ?
                        this.renderNoMessages() :
                        this.renderMessages(this.props.messages)}
                </div>
                <form className='Chat__control' onSubmit={this.onFormSubmit}>
                    <textarea
                        id='message'
                        name='message'
                        value={this.props.currentMessage}
                        onChange={this.onTextAreaChange}
                        cols='30'
                        rows='10'
                    ></textarea>
                    <button type='submit'>Отправить</button>
                </form>
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
        return <p>Сообщений нет</p>;
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