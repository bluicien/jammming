import React from 'react';
import styles from '../StyleSheets/tracklist.module.css';
import Track from './Track';


// LIST OF TRACKS FOR USER TO SAVE TO THEIR SPOTIFY
export default function Tracklist(props) {

    return (
        <section className={styles.trackSection}>
            <form className={styles.formDiv} onSubmit={(e) => props.handlePlaylistSubmit(e)}>
                <input  
                    className={styles.playListName} 
                    name='playlistName' 
                    type='text' 
                    placeholder='Playlist Name'
                    value={props.playlistName} onChange={(e) => props.handlePlaylistName(e)}
                />
                <div className={styles.playlistContainer}>
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
                </div>
                <div className={styles.btn}>
                    <button type='submit' id='saveBtn' className={styles.saveButton}>SAVE TO SPOTIFY</button>
                    <div className={styles.connectBtn} onClick={() => props.connectSpotify()}>
                        {/* <button disabled  className={styles.connect}> */} 
                        <img className={styles.spotifyLogo} alt='Connect to spotify logo' />
                        {/* </button> */}
                    </div>
                </div>
            </form>
        </section>
    );
}