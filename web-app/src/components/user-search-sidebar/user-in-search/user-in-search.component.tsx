import React from 'react'
import { UserWithID } from '../../../model';

import styles from './user-in-search.module.sass'
import { UserDefaultImage } from '../../../resources';

interface Props {
    user: UserWithID
    onClick(): void
}

export function UserInSearch({ user, onClick }: Props) {
    return (
        <button className={styles.userInSearch} onClick={onClick}>
            <span>{user.username}</span>
            <img src={user.imageUrl || UserDefaultImage} alt={user.username} />
        </button>
    )
}