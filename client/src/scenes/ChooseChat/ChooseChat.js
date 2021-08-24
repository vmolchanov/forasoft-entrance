import React from 'react';
import {Link} from "react-router-dom";

const ChooseChat = (props) => {
    const {chats} = props;
    return (
        <div className='ChooseChat'>
            <ul className='ChooseChat__action-list'>
                <li className='ChooseChat__action-item'>
                    <Link className='ChooseChat__action-link' to='/create'>Создать</Link>
                </li>
            </ul>
            <hr/>
            <ul className='ChooseChat__chat-list'>
                {chats.map(({title, id}, index) => {
                    return (
                        <li className='ChooseChat__chat-item' key={index}>
                            <Link className='ChooseChat__chat-link' to={`/chat/${id}`}>{title}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export {ChooseChat};