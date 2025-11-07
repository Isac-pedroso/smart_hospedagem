

const MODAL_COMPONENT = {

}


export const ModalRoot = ({modal, hideModal}) =>{
    
    if(!modal) return null;

    const { component, props } = modal;
    const ModalComponent = MODAL_COMPONENT[component];

    if(!ModalComponent) return null;


    return <ModalComponent {...props} onClose={hideModal} />
}