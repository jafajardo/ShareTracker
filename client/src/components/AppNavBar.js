import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { logout } from "../flux/actions/authActions";

class AppNavBar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  renderLogin = () => {
    if (this.props.auth.isAuthenticated) {
      return <NavLink onClick={() => this.props.logout()}>Logout</NavLink>;
    } else {
      return <LoginModal />;
    }
  };

  renderRegister = () => {
    if (!this.props.auth.isAuthenticated) {
      return <RegisterModal />;
    }
  };

  render() {
    return (
      <Navbar color="dark" dark expand="sm">
        <NavbarBrand href="/">ShareList</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>{this.renderRegister()}</NavItem>
            <NavItem>{this.renderLogin()}</NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(AppNavBar);
