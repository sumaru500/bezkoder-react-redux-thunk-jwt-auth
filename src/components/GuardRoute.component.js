import { Redirect, Route } from "react-router-dom";
import {connect} from "react-redux";
import AuthService from "../services/auth.service";

function GuardRoute({component: Component, canActive : {role, homeUrl, loginUrl}, ...rest}) {
    return ( 
        <Route {...rest} render={props => {
                // const {user} = rest;
                const user = AuthService.getAuthUser();
                if (user) {
                    if (!user.roles.includes(role)) {
                        return <Redirect to={homeUrl} />;
                    }
                    // authorized so return component itself
                    return <Component {...props}/>
                }

                // not yet logged in so redirect to login page with return url
                return <Redirect to={{pathname: loginUrl, state: {from: props.location }}}/>
            }}
        />
     );
}

const mapStateToProps = (state) => ({
    user: state.auth,
});

export default connect(mapStateToProps)(GuardRoute);