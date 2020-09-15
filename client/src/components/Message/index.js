import './index.scss';
import React from 'react';
import PropTypes from 'prop-types';

const Message = (props) => {
    const {name, body, time, classNames} = props;
    const className = ['Message'].concat(classNames).join(' ')
    
    const date = new Date(time);
    const hours = date.getHours().lentgh === 1 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes().length === 1 ? `0${date.getMinutes()}` : date.getMinutes();


    return (
        <div className={className}>
            <b className='Message__name'>{name}</b>
            <p className='Message__content'>{body}</p>
            <span className='Message__time'>{`${hours}:${minutes}`}</span>
        </div>
    );
};

Message.propTypes = {
    name: PropTypes.string,
    body: PropTypes.string.isRequired,
    time: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.instanceOf(Date)
    ]),
    classNames: PropTypes.array.isRequired
};

export default Message;
