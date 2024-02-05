import React from 'react';
import styles from '../StyleSheets/tracklist.module.css';
import Track from './Track';


// LIST OF TRACKS FOR USER TO SAVE TO THEIR SPOTIFY
export default function Tracklist(props) {

    return (
        <section>
            <form className={styles.formDiv} onSubmit={(e) => props.handlePlaylistSubmit(e)}>
                <input  
                    className={styles.playListName} 
                    name='playlistName' 
                    type='text' 
                    placeholder='Playlist Name'
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
                        <button className={styles.connect} onClick={() => props.connectSpotify()}>
                            <img className={styles.spotifyLogo} alt='Connect to spotify logo' />
                        </button>
                    </div>
            </form>
        </section>
    );
}