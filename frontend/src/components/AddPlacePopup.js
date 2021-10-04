import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props){
    const [title, setTitle] = React.useState('')
    const [link, setLink] = React.useState('')

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()

        props.onAddCard({
            name: title,
            link: link
        })
        setTitle('')
        setLink('')
    }

    return(
        <PopupWithForm name='add' title='Новое место' buttonText='Добавить' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} isLoading={props.isLoading}>
            <input id="place" name="name" className="popup__input popup__input_name-place" type="text"  value={title || ''} onChange={handleChangeTitle} required minLength="2" maxLength="30" placeholder="Название"/>
            <span className="popup__input-error" id="place-error"></span>
            <input id="link" name="link" className="popup__input popup__input_link-place" type="url" value={link || ''} onChange={handleChangeLink} required placeholder="Ссылка на картинку"/>
            <span className="popup__input-error error2" id="link-error"></span>
        </PopupWithForm>
    )
}
export default AddPlacePopup