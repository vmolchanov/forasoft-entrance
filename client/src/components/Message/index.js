import React from 'react';
import PropTypes from 'prop-types';

const Message = (props) => {
    const {name, body, time, classNames} = props;
    const className = ['message'].concat(classNames).join(' ')
    return (
        <div className={className}>
            <b className="message__name">{name}</b>
            <p className="message__content">{body}</p>
            <span className="message__time">{time}</span>
        </div>
    );
};

Message.propTypes = {
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    classNames: PropTypes.array.isRequired
};

export default Message;
