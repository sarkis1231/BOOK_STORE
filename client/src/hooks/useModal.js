import {useCallback, useState} from "react";
import useScrollingElement from "./useScrollingElement";

export default function useModal() {
    const [toggleModal, setToggleModal] = useState(false);
    useScrollingElement(toggleModal);
    const openModal = useCallback(() => {
        setToggleModal(() => true);
    }, [])
    const closeModal = useCallback(() => {
        setToggleModal(() => false);
    }, []);

    return {toggleModal, openModal, closeModal}
}