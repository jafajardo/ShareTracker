import React, { Component } from "react";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import { Provider } from "react-redux";
import store from "./flux/store";

import { loadUser } from "./flux/actions/authActions";

import AppNavBar from "./components/AppNavBar";
import Portfolio from "./components/Portfolio";
import TransactionModal from "./components/TransactionModal";
import ShareHolding from "./components/ShareHolding";

class App extends Component {
  componentDidMount = () => {
    store.dispatch(loadUser());
  };

  renderComponents = () => {
    console.log(store.getState().auth);
    const { isAuthenticated } = store.getState().auth;

    if (isAuthenticated) {
      return (
        <>
          <TransactionModal />
          <Switch>
            <Route exact path="/" component={Portfolio} />
            <Route
              path="/shareHolding:symbol"
              render={props => <ShareHolding {...props} />}
            />
          </Switch>
        </>
      );
    } else {
      return <div>Please login</div>;
    }
  };

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <Container>
            <TransactionModal />
            <Switch>
              <Route exact path="/" component={Portfolio} />
              <Route
                path="/shareHolding:symbol"
                render={props => <ShareHolding {...props} />}
              />
            </Switch>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
