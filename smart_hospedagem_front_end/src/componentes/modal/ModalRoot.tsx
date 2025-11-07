import React from "react";
import { ConfirmModal } from "./modals/modalsPadrao/ConfirmModal";

type ModalData = {
    component: React.FC<any>;
    props?: Record<string, any>;
} | null;

type ModalRootProps = {
    modal: ModalData;
    hideModal: () => void;
}

const ModalRoot: React.FC<ModalRootProps> = ({modal, hideModal}) =>{
    
    if(!modal) return null;

    const { component: Component, props } = modal;

    return <Component {...props} onClose={hideModal} />
}

export default ModalRoot;