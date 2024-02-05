import React from 'react';
import styles from "../StyleSheets/header.module.css";

// DISPLAYS TOP NAV BAR WITH "Jammming" HEADING.
export default function Header() {
    
    return (
        <nav className={styles.navBar}>
            <header>
            <a className={styles.headTitle} href='/jammming' ><h1>Ja<span>mmm</span>ing</h1></a>
            </header>
        </nav>
        );
}