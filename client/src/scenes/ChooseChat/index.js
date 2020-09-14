import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {setChats, downloadChats} from '../../reducers/user';

class ChooseChat extends Component {
    componentWillMount() {
        this.props.onLoadComponent();
    }

    render() {
        const {chats} = this.props;
        return (
            <div>
                <ul>
                    <li>
                        <Link to='/join'>Присоединиться</Link>
                    </li>
                    <li>
                        <Link to='/create'>Создать</Link>
                    </li>
                </ul>
                <ul>
                    {chats.map(({name, id}, index) => {
                        return (
                            <li key={index}>
                                <Link to={`/chat/${id}`}>{name}</Link>
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
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    }))
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        chats: state.user.chats
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
