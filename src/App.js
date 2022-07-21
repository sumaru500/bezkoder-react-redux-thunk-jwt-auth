import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login.component";
import Register from "./components/Register.component";
import Home from "./pages/public/Home.page";
import Profile from "./components/Profile.component";
import BoardUser from "./pages/secure/BoardUser.page";
import BoardModerator from "./pages/secure/BoardModerator.page";
import BoardAdmin from "./pages/secure/BoardAdmin.page";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';
import GuardRoute from "./components/GuardRoute.component";
import * as ROLES from "./const/roles.const";
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }
  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes(ROLES.MODERATOR),
        showAdminBoard: user.roles.includes(ROLES.ADMIN),
      });
    }
  }
  logOut() {
    this.props.dispatch(logout());
    history.push('/'); // after logout => redirect to home page
  }
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-lighter bg-lighter">
            <Link to={"/"} className="navbar-brand">
              JWT-AUTH
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <GuardRoute path="/user" component={BoardUser} canActive={{role: ROLES.USER, homeUrl: "/", loginUrl: "/login"}} />
              <GuardRoute path="/mod" component={BoardModerator} canActive={{role: ROLES.MODERATOR, homeUrl: "/", loginUrl: "/login"}} />
              <GuardRoute path="/admin" component={BoardAdmin} canActive={{role: ROLES.ADMIN, homeUrl: "/", loginUrl: "/login"}} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(App);

