import React, { useContext, useEffect } from 'react'
import { Route, RouteComponentProps, __RouterContext } from 'react-router';

import styles from './home.module.sass'
import { HomeNavbar } from '../../components/home-nav/home-nav.component';
import { CollapsibleSidebar } from '../../components/collapsible-sidebar/collapsible-sidebar.component';
import { SendMessage } from './inner-routes/send-message/send-message.route';
import { UserContext } from '../../context/contexts/user.context';
import { AuthUserAction } from '../../context/actions/user.actions';
import { userService } from '../../services/user.service';
import { Inbox } from './inner-routes/inbox/inbox.route';
import { MessageRoute } from './inner-routes/message/message.route';

export function HomePage({ match }: RouteComponentProps) {

    const { location } = useContext(__RouterContext)

    const [user, userDispatch] = useContext(UserContext)

    useEffect(() => {

        userService.getAuthUser().then((user) => {
            userDispatch(new AuthUserAction(user))
        })

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
                    <Route exact path={`${match.url}/inbox`} component={Inbox} />
                    <Route exact path={`${match.url}/message/:id`} component={MessageRoute} />
                    <Route exact path={match.url} component={() => <span> home page works </span>} />
                </main>
            </div>
        </>
    )
}