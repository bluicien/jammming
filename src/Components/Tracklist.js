import React from 'react';
import styles from '../StyleSheets/tracklist.module.css';
import Track from './Track';

// List of tracks to save to Spotify playlist
// Adds tracks from SearchResults component

export default function Tracklist(props) {

    // const [playlistName, setPlaylistName] = useState('')

    // function handleChange({target}) {
    //     setPlaylistName(target.value)
    // }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     const buildURIs = props.tracksToSave.map(song => song.id);
    //     createPlaylist(playlistName, buildURIs);

    // }

    return (
        <section>
            <form onSubmit={(e) => props.handlePlaylistSubmit(e)}>
                <input  
                    className={styles.playListName} 
                    name='playlistName' type='text' 
                    value={props.playlistName} onChange={(e) => props.handlePlaylistName(e)}
                />
                    <table>
                        <tbody style={{overflow: 'scroll'}}>
                            <hr/>
                            {props.tracksToSave.map(song => (
                            <Track
                                key={song.songName+song.id}
                                id={song.id}
                                songName={song.songName}
                                artist={song.artist}
                                album={song.album}
                                handleRemoveTrack={props.handleRemoveTrack}
                            />
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.btn}>
                        <button type='submit' className={styles.saveButton}>SAVE TO SPOTIFY</button>
                    </div>
            </form>
        </section>
    );
}