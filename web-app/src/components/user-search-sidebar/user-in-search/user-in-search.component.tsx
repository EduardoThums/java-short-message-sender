import React, { useState, useRef } from 'react'
import { UserWithID } from '../../../model';

import styles from './user-in-search.module.sass'
import { UserDefaultImage } from '../../../resources';

interface Props {
    user: UserWithID
    onClick(): void
}

export function UserInSearch({ user, onClick }: Props) {

    const userImage = useRef<HTMLImageElement>(null)

    return (
        <button className={styles.userInSearch} onClick={onClick}>
            <span>{user.username}</span>
            <img ref={userImage} src={user.imageUrl || UserDefaultImage} alt="" onError={() => {
                    if(userImage.current)
                        userImage.current.src = UserDefaultImage
                }} />
        </button>
    ) 
}