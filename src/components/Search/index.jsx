import React, { useCallback, useContext, useRef, useState } from "react";
import searchInput from '../Search/Search.module.scss';
import debounce from 'lodash.debounce';
import { SearchContext } from "../../App";



const Search = () => {
    const [value, setValue] = useState('');
    const {setSearchValue} = useContext(SearchContext);
    const inputRef = useRef();

    // const testDebounce = 

    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        // document.querySelector('input').focus(); сделан через джава скрипт нужно через реакт 
        inputRef.current.focus();
    };

    const updateSearchValue = React.useCallback(
        debounce((str) => {
            setSearchValue(str); 
            // console.log('privet', str);

        }, 1000), 
        [],
    );

    const onChangeInput = (event) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
        <div 
            className={searchInput.root}>
            <img src="https://static-00.iconduck.com/assets.00/search-icon-2048x2048-4r9dtbbw.png" className={searchInput.icon} alt="" />
            <input 
            ref={inputRef}
            value={value}
            onChange={onChangeInput}
            className={searchInput.input} 
            placeholder="поиск пиццы ..." />

            {/* <img className={searchInput.close} src="https://logowik.com/content/uploads/images/close1437.jpg" alt="" />  */}
                {
                value && ( <img onClick={onClickClear} className={searchInput.close} src="https://logowik.com/content/uploads/images/close1437.jpg" alt="" /> )
                }    
        </div>
    )
}

export default Search;