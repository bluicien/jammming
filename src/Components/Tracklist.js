import React from 'react';
import styles from '../StyleSheets/tracklist.module.css';
import Track from './Track';

export default function Tracklist(props) {
    
    return (
        <section>
            <form>
                <input className={styles.playListName} />
                    <table>
                        <tbody style={{overflow: 'scroll'}}>
                            <hr/>
                        </tbody>
                    </table>
                    <div className={styles.btn}>
                        <button type='submit' className={styles.saveButton}>SAVE TO SPOTIFY</button>
                    </div>
            </form>
        </section>
    );
}