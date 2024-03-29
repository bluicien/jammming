import React, { useState } from 'react';
import styles from '../StyleSheets/body.module.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Tracklist from './Tracklist';
import { searchSongs, createPlaylist, addSongs, Spotify } from '../Auth';

export default function Body() {

    const [playlistName, setPlaylistName] = useState('') // Controls state value of playlist name input
    const [playlist, setPlaylist] = useState([]); // Manages array state of playlist to save.
    const [searchResults, setSearchResults] = useState([]); // Manages array state of search results.
    const [searchQuery, setSearchQuery] = useState(''); // Manages state of search query.


    // Handles the control of the search bar value
    function handleChange({ target }) {
        setSearchQuery( prevText => prevText = target.value )
    }


    // Controls the playlist name value field for SearchBar component.
    function handlePlaylistName({target}) {
        setPlaylistName(target.value)
    }

    
    // Connect to search API and set search results state to new array of songs.
    function handleSearch(e) {
        e.preventDefault();
        // If no search string entered, it will set search results to an empty array.
        // This can be used to clear search results.
        if (searchQuery === '') {
            setSearchResults([])
            return;
        }
        searchSongs(searchQuery).then(songs => setSearchResults(songs));
    }


    // Add a new track to playlist
    function handleAddTrack(trackObj) {
        // Using 'if' statement to check if song is already in the playlist.
        // If track already exists in playlist, function will return.
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
    async function handlePlaylistSubmit(e) {
        e.preventDefault();

        // Map through the playlist songs to add and build a new array of song URI
        // from the .id attribute of the song object.
        const buildURIs = playlist.map(song => song.id);

        // If there is no playlist name or songs added, the function will return.
        if (!playlistName && buildURIs.length === 0) {
            console.log("No playlist name or songs have been entered.")
            return;
        }
        // Make a call to the spotify api to create a playlist, function returns the playlist's ID.
        const playlistId = await createPlaylist(playlistName);

        // Pass in the array of track URIs and playlist ID to the spotify api to add tracks to playlist
        addSongs(buildURIs, playlistId)
        setPlaylist([])
        setPlaylistName([])
    }

    // Connect user to their spotify account and create access token.
    function handleConnectSpotify() {
        Spotify();
    }

    return (
        <div>
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
                    connectSpotify={handleConnectSpotify}
                    playlistName={playlistName}
                    />
            </div>
        </div>
    )
}