import React, { Children, createContext, useCallback, useContext, useState } from "react"

const ModalContext = createContext({Children});

export const useModal = useContext(ModalContext);

export default ModalProvider = ({children}) => {
    const [modal, setModal] = useState(null);

    const showModal = useCallback((component, props = {}) => {
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

import ModalRoot from "./ModalRoot";
