import React from 'react';
import styles from '../StyleSheets/track.module.css'


// DISPLAYS A SINGLE TRACK.
// The component uses a flag passed down props to let the component know if the track is part of the search results,
// or part of the playlist. Based on the flag, the component renders a + or - sign together with the functionality to add or remove.
export default function Track(props) {
    
    // The track information passed down props is saved to a track object to assist with the removal of track.
    const trackObj = {
        id: props.id,
        songName: props.songName,
        artist: props.artist,
        album: props.album
    }

    return (
        <>
            <tr onClick={props.stateFlag ? () => props.handleAddTrack(trackObj) : () => props.handleRemoveTrack(trackObj)}>
                <td>
                    <h4 className={styles.songTitle}>{props.songName}</h4>
                    <p className={styles.songInfo}>{props.artist} | {props.album}</p>
                </td>
                {props.stateFlag ? <td><i className={styles.symbol}>✦</i></td> : <td><i className={styles.symbol}>—</i></td>}
            </tr>
            <hr/>
        </>
    )
}