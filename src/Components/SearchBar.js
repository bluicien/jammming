import React from 'react';
import styles from '../StyleSheets/searchBar.module.css';

export default function SearchBar() {
    return (
    <form>
        <input className={styles.searchBar} placeholder='Search Music'/>
        <br/>
        <button className={styles.searchButton}>Search</button>
    </form>
    );
}