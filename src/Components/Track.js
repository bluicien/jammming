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
            <tr>
                <td >
                    <h4>{props.songName}</h4>
                    <p>{props.artist} | {props.album}</p>
                </td>
                {props.stateFlag && <td><i className={styles.symbol} onClick={() => props.handleAddTrack(trackObj)}>✦</i></td>}
                {!props.stateFlag && <td><i className={styles.symbol} onClick={() => props.handleRemoveTrack(trackObj)}>—</i></td>}
            </tr>
            <hr/>
        </>
    )
}