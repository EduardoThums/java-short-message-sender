import React, { useContext, useEffect } from 'react'
import { Route, RouteComponentProps, __RouterContext } from 'react-router';

import styles from './home.module.sass'
import { HomeNavbar } from '../../components/home-nav/home-nav.component';
import { CollapsibleSidebar } from '../../components/collapsible-sidebar/collapsible-sidebar.component';
import { SendMessage } from './inner-routes/send-message/send-message.route';
import { UserContext } from '../../context/contexts/user.context';
import { AuthUserAction } from '../../context/actions/user.actions';

export function HomePage({ match }: RouteComponentProps) {

    const { location } = useContext(__RouterContext)

    const [user, userDispatch] = useContext(UserContext)

    useEffect(() => {
        
        userDispatch(new AuthUserAction({
            id: 1,
            username: 'User Teste',
            imageUrl: ''
        }))        
    }, [])

    return (
        <>
            <CollapsibleSidebar links={[
                { to: match.url, name: "Home" },
                { to: `${match.url}/inbox`, name: "Inbox" },
                { to: `${match.url}/send`, name: "Send Message" },
            ]} actualPage={location.pathname} />
            <div className={styles.homePage}>
                <HomeNavbar user={user || { username: '', imageUrl: '' }} />

                <main>
                    <Route exact path={`${match.url}/send`} component={SendMessage} />
                    <Route exact path={`${match.url}/inbox`} component={() => <span> inbox page works </span>} />
                    <Route exact path={`${match.url}/message/:id`} component={({ match }: RouteComponentProps<{ id: string }>) => <span> message {+match.params.id} page works </span>} />
                    <Route exact path={match.url} component={() => <span> home page works </span>} />
                </main>
            </div>
        </>
    )
}