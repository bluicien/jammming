import React, { useState } from 'react';
import styles from '../StyleSheets/body.module.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Tracklist from './Tracklist';
import { searchSongs } from '../Auth';

export default function Body() {

    const [playlist, setPlaylist] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    function handleChange({ target }) {
        setSearchQuery( prevText => prevText = target.value )
    }

    function handleSearch() {
        searchSongs(searchQuery).then(songs => setSearchResults(songs));
        console.log(searchResults)
    }

    // Add a new track to playlist
    function handleAddTrack(trackObj) {

        if (playlist.some(song => song.id === trackObj.id)) {
            return;
        }
        setPlaylist(prevPlaylist => [...prevPlaylist, trackObj]);
    }

    // Remove a track from playlist
    function handleRemoveTrack(trackObj) {
        setPlaylist(prevPlaylist => prevPlaylist.filter(song => song.id !== trackObj.id));
    }

    return (
        <div className={styles.layer}>
            <SearchBar 
                textValue={searchQuery}
                handleTextChange={handleChange}
                handleSearch={handleSearch}
            />
            <div className={styles.resultsBox}>
                <SearchResults 
                    handleAddTrack={handleAddTrack}
                    searchData={searchResults}
                    />
                <Tracklist 
                    tracksToSave={playlist}
                    handleRemoveTrack={handleRemoveTrack} 
                    />
            </div>
        </div>
    )
}