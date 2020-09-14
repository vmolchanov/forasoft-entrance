import React from 'react';
import Message from '../Message';

const IncomingMessage = (props) => {
    const {name, body, time} = props;
    return (
        <Message
            name={name}
            body={body}
            time={time}
            classNames={['IncomingMessage']}
        />
    );
};

export default IncomingMessage;
