import React from 'react'
import PopupWithForm from './PopupWithForm'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
function EditProfilePopup(props){
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            status: description,
        });
    }


    return(
        <PopupWithForm name='edit' title='Редактировать профиль' buttonText='Сохранить' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}>
            <input id="name" name="name" value={name || ''} className="popup__input popup__input-name" type="text" onChange={handleChangeName} required minLength="2" maxLength="40" placeholder="Имя"/>
            <span id="name-error" className="popup__input-error"></span>
            <input id="status" name="status" value={description || ''} className="popup__input popup__input-status" type="text" onChange={handleChangeDescription} required minLength="2" maxLength="200" placeholder="О Себе"/>
            <span id="status-error" className="popup__input-error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup

