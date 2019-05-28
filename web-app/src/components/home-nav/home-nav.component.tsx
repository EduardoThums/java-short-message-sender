import React, { useContext } from 'react'

import styles from './home-nav.module.sass'
import { User } from '../../model';
import { UserDefaultImage, HamMenuIcon } from '../../resources';
import { SidebarContext } from '../../context/contexts/sidebar.context';
import { OpenSidebarAction } from '../../context/actions/sidebar.actions';

interface Props {
    user: User
}

export function HomeNavbar({ user }: Props) {

    const [, sidebarDispatch] = useContext(SidebarContext)

    function openSidebar() {
        sidebarDispatch(new OpenSidebarAction())
    }

    return (
        <nav className={styles.homeNavbar}>
            <button className={styles.menuButton} onClick={openSidebar}>
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