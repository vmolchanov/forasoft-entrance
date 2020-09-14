import React from 'react';
import Message from '../Message';

const OutgoingMessage = (props) => {
    const {name, body, time} = props;
    return (
        <Message
            name={name}
            body={body}
            time={time}
            classNames={['OutgoingMessage']}
        />
    );
};

export default OutgoingMessage;
