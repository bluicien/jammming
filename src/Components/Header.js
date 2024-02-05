import React from 'react';
import styles from "../StyleSheets/header.module.css";

export default function Header() {
    
    return (
        <nav className={styles.navBar}>
            <header>
            <a className={styles.headTitle} href='/' ><h1>Ja<span>mmm</span>ing</h1></a>
            </header>
        </nav>
        );
}