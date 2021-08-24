import './index.scss';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setEmail, setName} from '../../actions/user';
import {Name} from './Name';
import {authenticate} from '../../thunk/user';

class NameWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            name: ''
        };
    }

    static propTypes = {
        name: PropTypes.string,
        email: PropTypes.string,
        onSetName: PropTypes.func.isRequired,
        onSetEmail: PropTypes.func.isRequired
    }

    render() {
        const {name, email} = this.props;
    
        if (name !== null && email !== null) {
            return <Redirect to='/choose' />;
        }
    
        return (
            <Name
                onFormSubmit={this.onFormSubmit}
                onNameInputChange={this.onNameInputChange}
                onEmailInputChange={this.onEmailInputChange}
                nameInputValue={this.state.name}
                emailInputValue={this.state.email}
            />
        );
    }

    onFormSubmit = async (e) => {
        e.preventDefault();
        const {onSetName, onSetEmail, onUserAuthenticate} = this.props;
        const name = e.target.querySelector('input[name="name"]').value;
        const email = e.target.querySelector('input[name="email"]').value;
        onSetName(name);
        onSetEmail(email);
        onUserAuthenticate(email);
    }

    onNameInputChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onEmailInputChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        name: state.user.name,
        email: state.user.email
    };
};

const mapDispatchToProps = (dispatch) => ({
    onSetName: (name) => dispatch(setName(name)),
    onSetEmail: (email) => dispatch(setEmail(email)),
    onUserAuthenticate: (email) => dispatch(authenticate(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(NameWrapper);
