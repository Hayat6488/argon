import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import Loader from 'utility/Loader';
import useTimeout from 'utility/useTimeOut';
import { auth } from "../../../Firebase/firebase.config";

const RestrictedRoutes = ({children, ...rest}) => {

    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);

    useTimeout(() => localStorage.removeItem("user"), 3600000)

    React.useLayoutEffect(() => {
        setLoading(true)
        const currentUser = localStorage.getItem("user");
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