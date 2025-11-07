import React, { Children, createContext, useCallback, useContext, useState } from "react"
import type { ReactNode } from "react";
import ModalRoot from "./ModalRoot";


type ModalData = {
    component: React.FC<any>;
    props?: Record<string, any>;
} | null;

type ModalContextType = {
    showModal: (component: React.FC<any>, props?: Record<string, any>) => void;
    hideModal: () => void; 
}

const ModalContext = createContext<ModalContextType>({
    showModal: () => {},
    hideModal: () => {}
});

export const useModal = () => useContext(ModalContext);

type ModalProviderProps = {
    children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
    const [modal, setModal] = useState<ModalData>(null);

    const showModal = useCallback((component: React.FC<any>, props: Record<string, any> = {}) => {
        setModal({component, props});
    }, []);

    const hideModal = useCallback(() => setModal(null), []);

    return (
        <ModalContext.Provider value={{showModal, hideModal}}>
            {children}
            <ModalRoot modal={modal} hideModal={hideModal} />
        </ModalContext.Provider>    
    );
};

export default ModalProvider;

