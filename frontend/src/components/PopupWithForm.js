function PopupWithForm(props){
    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <form name={props.name} className={`popup__form`} onSubmit={props.onSubmit}>
                <button type="button" className="popup__close-btn" onClick={props.onClose}/>
                <h2 className="popup__title">{props.title}</h2>
                {props.children}
                <button type="submit" className="popup__save-btn" >{props.buttonText}</button>
            </form>
        </div>
    )
}

export default PopupWithForm