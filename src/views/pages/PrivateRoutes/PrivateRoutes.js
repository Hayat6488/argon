import React from 'react';
import { useHistory } from "react-router-dom";
import Loader from 'utility/Loader';
import { auth } from "../../../Firebase/firebase.config";


const PrivateRoutes = ({children}) => {
    const history = useHistory();
    
    const [loading, setLoading] = React.useState(true);
    const [user, setUser] = React.useState(true);

    React.useLayoutEffect(() => {
        const currentUser = auth?.currentUser
        setUser(currentUser)
        setLoading(false)
    }, [])

    if (loading) {
        return <Loader></Loader>
    }
    if (user) {
        return children;
    }

    return history.push("/auth/login");
};

export default PrivateRoutes;