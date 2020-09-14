import React from 'react';
import PropTypes from 'prop-types';

const InputForm = (props) => {
    const {
        inputs,
        buttonText,
        onSubmit
    } = props;
    
    return (
        <form action='#' onSubmit={onSubmit}>
            {inputs.map(({id, label, name, placeholder, type, required}, index) => {
                return (
                    <div key={index}>
                        <label htmlFor={id}>{label}</label>
                        <input
                            id={id}
                            name={name}
                            type={type}
                            placeholder={placeholder}
                            required={required}
                        />
                    </div>
                );
            })}
            <button type='submit'>{buttonText}</button>
        </form>
    );
};

InputForm.propTypes = {
    inputs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        required: PropTypes.bool.isRequired
    })),
    buttonText: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default InputForm;
