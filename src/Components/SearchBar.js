import React  from 'react';
import styles from '../StyleSheets/searchBar.module.css';

// SEARCH BAR TO SEARCH TRACKS & ARTISTS.
export default function SearchBar(props) {

    return (
        <form onSubmit={(e) => props.handleSearch(e)}>
            <input  id='search' 
                    className={styles.searchBar} 
                    placeholder='Search Music' 
                    value={props.textValue}
                    onChange={(e) => props.handleTextChange(e)}
                    />
            <br/>
            <button className={styles.searchButton}>Search</button>
        </form>
    );
}