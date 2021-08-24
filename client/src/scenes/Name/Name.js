import React from 'react';

const Name = (props) => {
    const {
        onFormSubmit,
        onNameInputChange,
        onEmailInputChange,
        nameInputValue,
        emailInputValue,
        isNameRequired = true,
        isEmailRequired = true
    } = props;
    return (
        <div className='Name'>
            <form className='Name__form' action='#' onSubmit={onFormSubmit}>
                <div className='Name__form-content'>
                    <div className='Name__input'>
                        <label htmlFor='name'>Ваше имя</label>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            placeholder='Иван'
                            required={isNameRequired}
                            value={nameInputValue}
                            onChange={onNameInputChange}
                        />
                    </div>
                    <div className='Name__input'>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='mail@example.com'
                            required={isEmailRequired}
                            value={emailInputValue}
                            onChange={onEmailInputChange}
                        />
                    </div>
                    <button className='Name__button' type='submit'>Далее</button>
                </div>
            </form>
        </div>
    );
};

export {Name};