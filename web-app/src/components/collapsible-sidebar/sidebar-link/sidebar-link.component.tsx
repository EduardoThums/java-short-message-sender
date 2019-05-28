import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { SidebarContext } from '../../../context/contexts/sidebar.context';
import { CloseSidebarAction } from '../../../context/actions/sidebar.actions';
import { SidebarLink } from '../../../model';

import styles from './sidebar-link.module.sass'

type Props = SidebarLink

export function SidebarLinkComponent({ to, name, actual }: Props) {

    const [, sidebarDispatch] = useContext(SidebarContext)

    function onClick() {
        sidebarDispatch(new CloseSidebarAction())
    }

    return <Link className={`${styles.sidebarLink} ${actual ? styles.actual : ''}`} to={to} onClick={onClick}> {name} </Link>
}