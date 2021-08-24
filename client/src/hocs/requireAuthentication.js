import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const requireAuthentication = (to = '/') => {
    return (Component) => {
        const RequireAuthentication = (props) => {
            const {name, email} = props;
            return (name === null || email === null) ?
                <Redirect to={to} /> :
                <Component />
        };

        const mapStateToProps = (state, ownProps) => ({
            ...ownProps,
            name: state.user.name,
            email: state.user.email
        });

        return connect(mapStateToProps, null)(RequireAuthentication);
    };
};

export {requireAuthentication};
