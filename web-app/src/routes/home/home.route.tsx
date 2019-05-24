import React from 'react'
import { Route, RouteComponentProps } from 'react-router';

import styles from './home.module.sass'
import { HomeNavbar } from '../../components/home-nav/home-nav.component';

export function HomePage({ match }: RouteComponentProps) {

    return (
        <div className={styles.homePage}>
            <HomeNavbar />

            <Route exact path={`${match.url}/send`} component={() => <span> send page works </span>} />
            <Route exact path={`${match.url}/inbox`} component={() => <span> inbox page works </span>} />
            <Route exact path={`${match.url}/message/:id`} component={({ match }: RouteComponentProps<{ id: string }>) => <span> message {+match.params.id} page works </span>} />
            <Route exact path={match.url} component={() => <span> home page works </span>} />
        </div>
    )
}