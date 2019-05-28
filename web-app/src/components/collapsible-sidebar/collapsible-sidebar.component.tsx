import React, { useContext } from 'react'

import { SidebarContext } from '../../context/contexts/sidebar.context';

import styles from './collapsible-sidebar.module.sass'
import { CloseIcon } from '../../resources';
import { CloseSidebarAction } from '../../context/actions/sidebar.actions';
import { SidebarLinkComponent } from './sidebar-link/sidebar-link.component';

interface Props {
    links: { to: string, name: string }[]
    actualPage: string
}

export function CollapsibleSidebar({ links, actualPage }: Props) {

    const [sidebarStatus, sidebarDispatch] = useContext(SidebarContext)

    function renderLinks() {
        return links.map((l, key) => (
            <SidebarLinkComponent name={l.name} to={l.to} actual={actualPage === l.to} key={key} />
        ))
    }

    function closeSidebar() {
        sidebarDispatch(new CloseSidebarAction())
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

            </footer>
        </div>
    )
}