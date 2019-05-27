import React from 'react'

import styles from './home-nav.module.sass'
import { User } from '../../model';
import { UserDefaultImage, HamMenuIcon } from '../../resources';

interface Props {
    user: User
}

export function HomeNavbar({ user }: Props) {

    return (
        <nav className={styles.homeNavbar}>
            <button className={styles.menuButton}>
                <HamMenuIcon />
            </button>

            <span className={styles.title}> MS </span>

            <div className={styles.user}>
                <span> {user.username} </span>
                <img src={user.imageUrl || UserDefaultImage} alt="" />
            </div>
        </nav>
    )
}