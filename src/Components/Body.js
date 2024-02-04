import React, { useState } from 'react';
import styles from '../StyleSheets/body.module.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Tracklist from './Tracklist';
import { searchSongs, createPlaylist, addSongs } from '../Auth';

export default function Body() {

    const [playlistName, setPlaylistName] = useState('') // Controls state value of playlist name input
    const [playlist, setPlaylist] = useState([]); // Manages array state of playlist to save.
    const [searchResults, setSearchResults] = useState([]); // Manages array state of search results.
    const [searchQuery, setSearchQuery] = useState(''); // Manages state of search query.


    // Handles the control of the search bar value
    function handleChange({ target }) {
        setSearchQuery( prevText => prevText = target.value )
    }


    // Controls the playlist value field for SearchBar component.
    function handlePlaylistName({target}) {
        setPlaylistName(target.value)
    }

    
    // Connect to search API and set search results state to new array of songs.
    function handleSearch(e) {
        e.preventDefault();
        searchSongs(searchQuery).then(songs => setSearchResults(songs));
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


    // Handle submission of playlist
    function handlePlaylistSubmit(e) {
        e.preventDefault();
        createPlaylist(playlistName);
        const buildURIs = playlist.map(song => song.id);
        if (buildURIs.length !== 0) {
            addSongs(buildURIs)
        }
        

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
                    handlePlaylistName={handlePlaylistName}
                    handlePlaylistSubmit={handlePlaylistSubmit}
                    playlistName={playlistName}
                    />
            </div>
        </div>
    )
}