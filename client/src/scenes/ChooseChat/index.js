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
                    {chats.map(({title, id}, index) => {
                        return (
                            <li key={index}>
                                <Link to={`/chat/${id}`}>{title}</Link>
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
