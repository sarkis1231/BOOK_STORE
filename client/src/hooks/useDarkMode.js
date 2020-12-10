import {useState, useCallback} from "react";

export default  function useDarkMode() {

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const toggleTheme =  useCallback( () => {
        if(theme === "light"){
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        }else {
            setTheme("light");
            localStorage.setItem('theme', 'light')
        }
    }, [theme])

    return {theme, toggleTheme}
}