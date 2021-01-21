import {useCallback, useState} from "react";
import useScrollingElement from "./useScrollingElement";

export default function useModal() {
    const [toggleModal, setToggleModal] = useState(false);
    const [value, setValue] = useState(null)
    useScrollingElement(toggleModal);
    const openModal = useCallback((values) => {
        setToggleModal(() => true);
        setValue(() => values)
    }, [])
    const closeModal = useCallback(() => {
        setToggleModal(() => false);
    }, []);

    return {toggleModal, openModal, closeModal, value}
}