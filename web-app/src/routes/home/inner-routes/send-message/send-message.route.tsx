import React, { useState, useEffect } from 'react'

import ReactQuill from 'react-quill'

import styles from './send-message.module.sass'
import { UserWithID } from '../../../../model';
import { SearchUserIcon, SendIcon } from '../../../../resources';
import { UserSearchSidebar } from '../../../../components/user-search-sidebar/user-search-sidebar.component';

export function SendMessage() {

    let quillInstance: ReactQuill | null

    const [user, setUser] = useState<UserWithID>({ id: 0, username: '', imageUrl: '' })

    const [userSearch, setUserSearch] = useState(false)

    const renderUser = () => user.id ? <div>
        {user.username}  {user.imageUrl}
    </div> : <span>
            Nenhum Usuario Selecionado
    </span>

    const openUserSearch = () => {
        setUserSearch(true)
    }

    const closeUserSearch = () => {
        setUserSearch(false)
    }

    const sendMessage = () => {
        if (quillInstance !== null) {
            const { getEditor } = quillInstance
            const editor = getEditor()
            const contents = editor.getContents()
        }
    }


    return (
        <>
            <UserSearchSidebar open={userSearch} closeSidebar={closeUserSearch} selectUser={() => { }} />
            <div className={styles.sendMessageCard}>
                <header>
                    <span> MANDE SUA MENSAGEM </span>
                </header>

                <div className={styles.userSelect}>
                    {renderUser()}
                    <button onClick={openUserSearch}>
                        <SearchUserIcon />
                    </button>
                </div>
                <ReactQuill className={styles.editor} modules={{
                    toolbar: [
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        ['bold', 'italic', 'underline'],
                        [{ 'align': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['blockquote', 'code-block'],
                    ]
                }}

                    ref={(quill) => { quillInstance = quill }}
                    theme='snow'
                    placeholder="Escreva sua mensagem"
                />
                <button className={styles.sendButton}>
                    <SendIcon />
                </button>
            </div>
        </>
    )
}