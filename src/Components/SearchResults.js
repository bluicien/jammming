import React from 'react';
import Track from './Track';
import styles from '../StyleSheets/searchResults.module.css'

// DISPLAY RESULTS OF SEARCH.
export default function SearchResults(props) {

    return (
        <section className={styles.searchSection} >
            <div className={styles.searchContainer}>
                <h3 className={styles.searchResults}>Search Results</h3>
                {props.searchData.map(song => (
                    <Track
                        key={song.songName+song.id}
                        id={song.id}
                        songName={song.songName}
                        artist={song.artist}
                        album={song.album}
                        handleAddTrack={props.handleAddTrack}
                        stateFlag={true}
                    />
                ))}
            </div>
        </section>
    );
}

