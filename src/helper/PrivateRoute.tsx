import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IProps {
    children: React.ReactNode,
    path: string,
    exact?: any
}

function PrivateRoute(props: IProps) {
    const { children, ...rest } = props;
    const auth = localStorage.getItem('username')

    const routeComponent = () => {
        if (auth) {
            return (children)
        } else {
            return (<Redirect to={{ pathname: "login" }} />)
        }
    }

    return (
        <Route {...rest} render={routeComponent} />
    )
};

export default PrivateRoute;

