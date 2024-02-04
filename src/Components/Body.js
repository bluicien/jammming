import React, { useState } from 'react';
import styles from '../StyleSheets/body.module.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Tracklist from './Tracklist';

export default function Body() {

    const [playlist, setPlaylist] = useState([]);

    function handleAddTrack(trackObj) {

        if (playlist.some(song => song.id === trackObj.id)) {
            return;
        }
        setPlaylist(prevPlaylist => [...prevPlaylist, trackObj]);
    }

    function handleRemoveTrack(trackObj) {
        setPlaylist(prevPlaylist => prevPlaylist.filter(song => song.id !== trackObj.id));
    }

    return (
        <div className={styles.layer}>
            <SearchBar />
            <div className={styles.resultsBox}>
                <SearchResults 
                    handleAddTrack={handleAddTrack}
                    />
                <Tracklist 
                    tracksToSave={playlist}
                    handleRemoveTrack={handleRemoveTrack} 
                    />
            </div>
        </div>
    )
}