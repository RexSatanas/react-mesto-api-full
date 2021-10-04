import React from 'react'
function ImagePopup(props){
    return(
        <div className={`popup popup_type_photo ${props.card ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-btn popup__close-btn_img" onClick={props.onClose} />
                <img alt={props.card.name} src={props.card.link} className="popup__image" />
                <p className="popup__img-title">{props.card.name}</p>
            </div>
        </div>
    )
}
export default ImagePopup