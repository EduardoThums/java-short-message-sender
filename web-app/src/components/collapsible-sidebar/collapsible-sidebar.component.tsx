import React, { useContext } from 'react'

import { SidebarContext } from '../../context/contexts/sidebar.context';

import styles from './collapsible-sidebar.module.sass'
import { CloseIcon, LogoutIcon } from '../../resources';
import { CloseSidebarAction } from '../../context/actions/sidebar.actions';
import { SidebarLinkComponent } from './sidebar-link/sidebar-link.component';
import { __RouterContext } from 'react-router';
import { UserContext } from '../../context/contexts/user.context';
import { LogoutUserAction } from '../../context/actions/user.actions';

interface Props {
    links: { to: string, name: string }[]
    actualPage: string
}

export function CollapsibleSidebar({ links, actualPage }: Props) {

    const { history } = useContext(__RouterContext)
    const [sidebarStatus, sidebarDispatch] = useContext(SidebarContext)
    const [, userDispatch] = useContext(UserContext)

    function renderLinks() {
        return links.map((l, key) => (
            <SidebarLinkComponent name={l.name} to={l.to} actual={actualPage === l.to} key={key} />
        ))
    }

    function closeSidebar() {
        sidebarDispatch(new CloseSidebarAction())
    }

    const logout = () => {
        userDispatch(new LogoutUserAction())
        sidebarDispatch(new CloseSidebarAction())
        localStorage.clear()
        sessionStorage.clear()
        history.push('/')
    }

    return (
        <div className={`${styles.sidebar} ${styles[sidebarStatus]}`}>
            <header>
                <button className={styles.closeButton} onClick={closeSidebar}>
                    <CloseIcon />
                </button>
            </header>

            <section>
                {renderLinks()}
            </section>

            <footer>
                <button className={styles.logoutButton} onClick={logout}>
                    <LogoutIcon />
                </button>
            </footer>
        </div>
    )
}