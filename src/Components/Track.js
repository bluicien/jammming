import React from 'react';

export default function Track(props) {

    return (
        <>
            <tr>
                <td>
                    <h4>{props.songName}</h4>
                    <p>{props.artist} | {props.album}</p>
                </td>
                <td><i>✦</i></td>
            </tr>
            <hr/>
        </>
    )
}