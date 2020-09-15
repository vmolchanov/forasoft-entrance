import './index.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {setChats, downloadChats} from '../../reducers/user';

class ChooseChat extends Component {
    componentWillMount() {
        this.props.onLoadComponent();
    }

    render() {
        const {name, email, chats} = this.props;

        if (name === null || email === null) {
            return <Redirect to='/' />;
        }

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
    }
}

ChooseChat.propTypes = {
    chats: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }))
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        chats: state.user.chats,
        name: state.user.name,
        email: state.user.email
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetChats: (chats) => {
            dispatch(setChats(chats));
        },
        onLoadComponent: () => {
            dispatch(downloadChats())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseChat);
