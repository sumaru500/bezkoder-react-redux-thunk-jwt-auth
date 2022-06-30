import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import {register} from "../actions/auth";
import {onChange, required, email, vusername, vpassword } from "./utils/formValidation";

class Register extends Component {
    constructor(props) {
        super(props);
        onChange.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
        }
    }

    handleRegister(event) {
        event.preventDefault();
        this.setState({
            successful:false,
        })
        
        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            // every thing ok => dispatch register action
            const {dispatch} = this.props;
            dispatch(register(this.state.username,  this.state.password, this.state.email,))
            .then(() => {
                this.setState({
                    successful: true,
                })
            })
            .catch(() => {
                this.setState({
                    successful: false,
                })
            })
        }

    }

    render() {
        const { message } = this.props;
        return (
          <div className="col-md-12">
            <div className="card card-container">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />
              <Form
                onSubmit={(event) => this.handleRegister(event)}
                ref={(c) => {
                  this.form = c;
                }}
              >
                {!this.state.successful && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        onChange={(event) => onChange(event, this)}
                        validations={[required, vusername]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={(event) => onChange(event, this)}
                        validations={[required, email]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={(event) => onChange(event, this)}
                        validations={[required, vpassword]}
                      />
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                  </div>
                )}
                {message && (
                  <div className="form-group">
                    <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                      {message}
                    </div>
                  </div>
                )}
                <CheckButton
                  style={{ display: "none" }}
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

const mapStateToProps = (state) => ({
    message: state.message.message,
})

export default connect(mapStateToProps)(Register)