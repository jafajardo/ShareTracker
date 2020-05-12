import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ShareOverview extends Component {
  state = {
    totalQuantity: 0
  };

  componentDidMount = () => {
    this.setState({
      totalQuantity: this.findQuantity()
    });
  };

  findCapitalGains = () => {
    const initialCapital = this.findInitialCapital();
    const currentValue = this.findValue();

    return (((currentValue - initialCapital) / initialCapital) * 100).toFixed(
      2
    );
  };

  findInitialCapital = () => {
    return this.props.holding.transactions.reduce((total, tran) => {
      return total + tran.quantity * tran.price + tran.brokerageFee;
    }, 0);
  };

  findQuantity = () => {
    return this.props.holding.transactions.reduce((total, tran) => {
      return total + tran.quantity;
    }, 0);
  };

  findValue = () => {
    return (this.state.totalQuantity * this.findPrice()).toFixed(2);
  };

  findPrice = () => {
    const index = this.props.price.prices.findIndex(
      item => item.shareSymbol === this.props.symbol
    );

    if (index > -1) {
      return this.props.price.prices[index].shareData.regularMarketPrice;
    } else {
      return 0;
    }
  };

  findAvePrice = () => {
    return this.props.holding.transactions
      .reduce((total, tran) => {
        return (
          total +
          ((tran.quantity * tran.price + tran.brokerageFee) / tran.quantity) *
            (tran.quantity / this.state.totalQuantity)
        );
      }, 0)
      .toFixed(2);
  };

  numberWithCommas = num => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  handleRowClick = () => {
    window.location.href = `/shareHolding:${this.props.symbol}`;
  };

  render() {
    return (
      <tr key={this.props.index} onClick={this.handleRowClick}>
        <td>
          <Link to={`/shareHolding:${this.props.symbol}`}>
            {this.props.symbol}
          </Link>
        </td>
        <td>${this.findAvePrice()}</td>
        <td>${this.findPrice()}</td>
        <td>{this.state.totalQuantity}</td>
        <td>${this.numberWithCommas(this.findValue())}</td>
        <td>{this.findCapitalGains()}%</td>
      </tr>
    );
  }
}

ShareOverview.propTypes = {
  index: PropTypes.number,
  symbol: PropTypes.string,
  holding: PropTypes.object
};

const mapStateToProps = state => ({
  price: state.price
});

export default connect(mapStateToProps)(ShareOverview);
