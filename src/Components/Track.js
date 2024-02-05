import React from 'react';
import styles from '../StyleSheets/track.module.css'


// The component to maintain the display of a single track
export default function Track(props) {
    
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