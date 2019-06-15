import React, { useContext, useState, useRef } from 'react'

import styles from './home-nav.module.sass'
import { User } from '../../model';
import { UserDefaultImage, HamMenuIcon, MSWhiteIcon } from '../../resources';
import { SidebarContext } from '../../context/contexts/sidebar.context';
import { OpenSidebarAction } from '../../context/actions/sidebar.actions';

interface Props {
    user: User
}

export function HomeNavbar({ user }: Props) {

    const [, sidebarDispatch] = useContext(SidebarContext)

    const userImage = useRef<HTMLImageElement>(null)


    function openSidebar() {
        sidebarDispatch(new OpenSidebarAction())
    }

    return (
        <nav className={styles.homeNavbar}>
            <button className={styles.menuButton} onClick={openSidebar}>
                <HamMenuIcon />
            </button>

            <MSWhiteIcon className={styles.logo} />

            <div className={styles.user}>
                <span> {user.username} </span>
                <img ref={userImage} src={user.imageUrl || UserDefaultImage} alt="" onError={() => {
                    if (userImage.current)
                        userImage.current.src = UserDefaultImage
                }} />
            </div>
        </nav>
    )
}