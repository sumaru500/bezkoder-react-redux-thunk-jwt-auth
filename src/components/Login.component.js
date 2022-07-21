import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import {required, onChange} from './utils/formValidation';

class Login extends Component {
  constructor(props) {
    super(props);
    onChange.bind(this);

    // init state
    this.state = {
      username: '',
      password: '',
      loading: false,
    };
  }


  async handleLogin(event) {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;
    const {from} = this.props.location.state || {from: '/profile'};
    if (this.checkBtn.context._errors.length === 0) {
      // all validated => dispatch actions => return a promise
      try {
        await dispatch(login(this.state.username, this.state.password));
        history.push(from);
        window.location.reload(); // inorder to using Redirect in render
      } catch (error) {
        this.setState({
          loading: false,
        });
      }
    } else {
      // something wrong
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { isLogged, message } = this.props;
    const {from} = this.props.location.state || {from: '/profile'};
    if (isLogged) {
      return <Redirect to={from}></Redirect>;
    }
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={(event) => {
              this.handleLogin(event);
            }}
            ref={(c) => {
              this.form = c;
            }}
          >
            {/* Username input */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={(event) => {
                  onChange(event, this);
                }}
                validations={[required]}
              />
            </div>
            {/* Password input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="text"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={(event) => {
                  onChange(event, this);
                }}
                validations={[required]}
              />
            </div>

            {/* Login button */}
            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            {/* show error message */}
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: 'none' }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

// state.xxx => see reducers/index.js
const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged,
  message: state.message.message,
});

export default connect(mapStateToProps)(Login);
