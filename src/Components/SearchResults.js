import React from 'react';
import Track from './Track';

export default function SearchResults(props) {

    return (
        <section>
            <table>
                <tr><thead><h3>Search Results</h3></thead></tr>
                <tbody>
                {props.searchData.map(song => (
                    <Track
                        key={song.songName+song.id}
                        id={song.id}
                        songName={song.songName}
                        artist={song.artist}
                        album={song.album}
                        handleAddTrack={props.handleAddTrack}
                        stateFlag={true}
                    />
                ))}
                </tbody>
            </table>
        </section>
    );
}

