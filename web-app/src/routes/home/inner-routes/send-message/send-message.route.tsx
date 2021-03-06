import React, { useState, useContext, useRef } from 'react'

import ReactQuill from 'react-quill'

import { UserWithID, AlertStatus } from '../../../../model';
import { SearchUserIcon, SendIcon, UserDefaultImage } from '../../../../resources';
import { UserSearchSidebar } from '../../../../components/user-search-sidebar/user-search-sidebar.component';
import { AlertsContext } from '../../../../context/contexts/alerts.context';

import { messageService } from '../../../../services'

import styles from './send-message.module.sass'
import { AddAlertAction } from '../../../../context/actions/alerts.actions';
import { SInput } from '../../../../components/generics';

export function SendMessage() {

    const quillInstance = useRef<ReactQuill>(null)
    const userImage = useRef<HTMLImageElement>(null)

    const [, alertsDispatch] = useContext(AlertsContext)

    const [user, setUser] = useState<UserWithID>({ id: 0, username: '', imageUrl: '' })
    const [userSearch, setUserSearch] = useState(false)
    const [subject, setSubject] = useState('')

    const renderUser = () => user.id ? <div className={styles.user}>
        <img ref={userImage} src={user.imageUrl || UserDefaultImage} alt="" onError={() => {
                    if(userImage.current)
                        userImage.current.src = UserDefaultImage
                }} />
        <span>{user.username}</span>
    </div> : <span>
            Nenhum Usuario Selecionado
    </span>

    const openUserSearch = () => {
        setUserSearch(true)
    }

    const closeUserSearch = () => {
        setUserSearch(false)
    }

    const sendMessage = async () => {
        if (quillInstance.current) {
            const { getEditor } = quillInstance.current
            const editor = getEditor()
            const contents = editor.getContents()

            if (!user.id) {
                alertsDispatch(new AddAlertAction({
                    text: 'Nenhum usuario foi selecionado',
                    status: AlertStatus.DANGER
                }))
                return
            }

            try {
                await messageService.sendMessage({
                    text: JSON.stringify(contents),
                    receiverId: user.id,
                    subject
                })

                alertsDispatch(new AddAlertAction({
                    text: 'Mensagem enviada com sucesso',
                    status: AlertStatus.SUCCESS
                }))

                editor.setText('')
                setSubject('')
            } catch (error) {

            }
        }
    }

    const selectUser = (user: UserWithID) => {
        setUser(user)
        setUserSearch(false)
    }


    return (
        <>
            <UserSearchSidebar open={userSearch} closeSidebar={closeUserSearch} selectUser={selectUser} />
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

                <SInput type="text" value={subject} handleChange={({value}) => { setSubject(value) }} id="subject" label="Assunto" placeholder="Escreva o assunto" />
                <ReactQuill className={styles.editor} modules={{
                    toolbar: [
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        ['bold', 'italic', 'underline'],
                        [{ 'align': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['blockquote', 'code-block'],
                    ]
                }}

                    ref={quillInstance}
                    theme='snow'
                    placeholder="Escreva sua mensagem"
                />
                <button className={styles.sendButton} onClick={sendMessage}>
                    <SendIcon />
                </button>
            </div>
        </>
    )
}