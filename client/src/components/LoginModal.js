import React, { Component } from "react";
import { connect } from "react-redux";
import {
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Container
} from "reactstrap";
import { login } from "../flux/actions/authActions";

class LoginModal extends Component {
  state = {
    modalShown: false,
    email: null,
    password: null
  };

  componentDidUpdate = () => {
    if (this.state.modalShown) {
      if (this.props.auth.isAuthenticated) {
        this.toggleModal();
      }
    }
  };

  toggleModal = () => {
    this.setState({
      modalShown: !this.state.modalShown
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.login({
      "email": this.state.email,
      "password": this.state.password
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Container>
        <NavLink onClick={this.toggleModal}>Login</NavLink>

        <Modal isOpen={this.state.modalShown} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </FormGroup>

              <Button style={{ margintop: "3rem" }} block>
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { login })(LoginModal);
