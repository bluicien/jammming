import React from 'react';
import styles from '../StyleSheets/body.module.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Tracklist from './Tracklist';

export default function Body() {
    return (
        <div className={styles.layer}>
            <SearchBar />
            <div className={styles.resultsBox}>
                <SearchResults />
                <Tracklist />
            </div>
        </div>
    )
}