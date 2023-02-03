import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import Loader from 'utility/Loader';
import { auth } from "../../../Firebase/firebase.config";

const RestrictedRoutes = ({children, ...rest}) => {

    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);

    React.useLayoutEffect(() => {
        setLoading(true)
        const currentUser = auth?.currentUser
        setUser(currentUser)
        setLoading(false)
    }, [])

    if(loading){
        return <Loader></Loader>
    }
    return (
        <Route {...rest} render = {() => user && !loading ? (children) : (<Redirect to={'/auth/login'}/>)}/>
);
};

export default RestrictedRoutes;