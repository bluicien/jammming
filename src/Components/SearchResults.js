import React, { useState, useEffect } from 'react';
import styles from '../StyleSheets/searchResults.module.css';
import Track from './Track';
import trackData from '../trackData.js'

export default function SearchResults() {

    const [songs, setSongs] = useState([])

    useEffect(() => {
        setSongs(trackData)
    }, [])

    return (
        <section>
            <table>
                <tr><thead><h3>Search Results</h3></thead></tr>
                <tbody>
                {songs.map(song => (
                    <Track
                        key={song.id}
                        songName={song.songName}
                        artist={song.artist}
                        album={song.album}
                    />
                ))}
                </tbody>
            </table>
        </section>
    );
}

