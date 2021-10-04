import React from 'react'
import PopupWithForm from './PopupWithForm'

function PopupWithConfirm(props) {
    function handleSubmit (e) {
        e.preventDefault();
        props.onHandleCardDeleteConfirm(props.cardId);
    };
    return (
        <PopupWithForm name="submit" title="Вы уверены?" buttonText="Да" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}/>
    )
}

export default PopupWithConfirm