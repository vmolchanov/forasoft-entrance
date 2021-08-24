import React from 'react';
import {MessageType} from '../../enums/message-type';
import IncomingMessage from './components/IncomingMessage';
import OutgoingMessage from './components/OutgoingMessage';

const renderMessage = (message, key) => {
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

const renderMessages = (messages) => {
    return messages.map((message, index) => renderMessage(message, index));
}

const renderNoMessages = () => {
    return <p className='Chat__no-messages'>Сообщений нет</p>;
}

const Chat = (props) => {
    const {
        title,
        messages,
        onFormSubmit,
        currentMessage,
        onTextAreaChange,
        messagesRef
    } = props;
    return (
        <div className='Chat'>
            <h1 className='Chat__title'>{title}</h1>
            <div className='Chat__content'>
                <div className='Chat__messages' ref={messagesRef}>
                    {messages.length === 0 ?
                        renderNoMessages() :
                        renderMessages(messages)}
                </div>
                <form className='Chat__control' onSubmit={onFormSubmit}>
                    <input
                        id='message'
                        name='message'
                        value={currentMessage}
                        onChange={onTextAreaChange}
                    />
                    <button type='submit'>Отправить</button>
                </form>
            </div>
        </div>
    );
};

export {Chat};