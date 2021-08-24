import React from 'react';

const CreateChat = (props) => {
    const {
        onFormSubmit,
        onTitleInputChange,
        titleInputValue,
        isTitleInputRequired = true
    } = props;
    return (
        <div className='CreateChat'>
            <form className='CreateChat__form' action='#' method='POST' onSubmit={onFormSubmit}>
                <div className='CreateChat__content'>
                    <div className='CreateChat__input'>
                        <label htmlFor='title'>Название чата</label>
                        <input
                            id='title'
                            name='title'
                            type='text'
                            placeholder='Вечерние посиделки'
                            required={isTitleInputRequired}
                            value={titleInputValue}
                            onChange={onTitleInputChange}
                        />
                    </div>

                    <button className='CreateChat__button' type='submit'>Создать</button>
                </div>
            </form>
        </div>
    );
};

export {CreateChat};