import React  from 'react';
import styles from '../StyleSheets/searchBar.module.css';

export default function SearchBar(props) {


    return (
        <form>
            <input  id='search' 
                    className={styles.searchBar} 
                    placeholder='Search Music' 
                    value={props.textValue}
                    onChange={(e) => props.handleTextChange(e)}
                    />
            <br/>
            <button className={styles.searchButton} onClick={props.handleSearch}>Search</button>
        </form>
    );
}