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
import { register } from "../flux/actions/authActions";

class RegisterModal extends Component {
  state = {
    modalShown: false,
    name: null,
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

    this.props.register({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
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
        <NavLink onClick={this.toggleModal}>Register</NavLink>

        <Modal isOpen={this.state.modalShown} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Register</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.handleChange}
                />
              </FormGroup>

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
                Register
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { register })(RegisterModal);
