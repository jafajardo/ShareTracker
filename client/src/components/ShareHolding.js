import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Table, NavLink } from "reactstrap";
import {
  getTransactions,
  deleteTransaction,
  toggleLoading
} from "../flux/actions/transactionActions";
import { getPricesForChart } from "../flux/actions/priceActions";
import LineChart from "./chart/LineChart";

class ShareHolding extends Component {
  state = {
    symbol: "",
    transactions: [],
    sma: [50],
    smaPrices: []
  };

  componentDidMount = () => {
    // Load historical prices for this holding
    this.props.getPricesForChart(
      this.props.match.params.symbol.replace(":", ""),
      400
    );

    // Load all transactions for this holding
    this.props.getTransactions();

    this.setState({
      symbol: this.props.match.params.symbol.replace(":", "")
    });
  };

  handleOnDelete = id => {
    this.props.deleteTransaction(id);
  };

  numberWithCommas = num => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  getSMA = (priceForChart, days) => {
    const prices = [];
    const index = priceForChart.findIndex(
      item =>
        item.shareSymbol === this.props.match.params.symbol.replace(":", "")
    );

    if (index > -1) {
      const { closePrices } = priceForChart[index];

      let total = 0;
      if (closePrices && closePrices.length > 0) {
        for (let i = 0; i < days; i++) {
          total = 0;
          for (let x = i; x < days + i; x++) {
            total += closePrices[x];
          }
          prices.push((total / days).toFixed(2));
        }
      }
    }

    return prices;
  };

  getTimestamp = (priceForChart, days) => {
    const dates = [];
    const index = priceForChart.findIndex(
      item =>
        item.shareSymbol === this.props.match.params.symbol.replace(":", "")
    );
    if (index > -1) {
      const { timeStamps } = priceForChart[index];

      if (timeStamps && timeStamps.length > 0) {
        for (
          let i = timeStamps.length - 1;
          i > timeStamps.length - days - 1 && i;
          i--
        ) {
          dates.push(timeStamps[i] * 1000); // turn ticks to date
        }
      }
    }
    return dates;
  };

  getMin = priceForChart => {
    const index = priceForChart.findIndex(
      item =>
        item.shareSymbol === this.props.match.params.symbol.replace(":", "")
    );
    if (index > -1) {
      return Math.min.apply(null, priceForChart[index].closePrices) / 2;
    }

    return 0;
  };

  renderChart = (priceForChart, numberOfDays) => {
    if (priceForChart) {
      return (
        <LineChart
          symbol={this.props.match.params.symbol.replace(":", "")}
          labels={this.getTimestamp(priceForChart, numberOfDays)}
          data={this.getSMA(priceForChart, numberOfDays)}
          min={this.getMin(priceForChart)}
          color="#f2849e"
        />
      );
    }
  };

  render() {
    const transactions = this.props.transaction.shareHoldings.filter(tran => {
      return tran.holdingName === this.state.symbol;
    });

    const priceForChart = this.props.price.pricesForChart.filter(item => {
      return item.shareSymbol === this.state.symbol;
    });

    return (
      <Container>
        <div className="chart-wrapper">
          {this.renderChart(priceForChart, 50)}
        </div>
        <Table hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Brokerage Fee</th>
              <th>Value</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(
              ({
                _id,
                holdingName,
                quantity,
                price,
                brokerageFee,
                date,
                transactionType
              }) => {
                return (
                  <tr key={_id}>
                    <td>{new Date(date).toLocaleDateString()}</td>
                    <td>{transactionType}</td>
                    <td>{quantity}</td>
                    <td>${price.toFixed(2)}</td>
                    <td>${brokerageFee.toFixed(2)}</td>
                    <td>
                      $
                      {this.numberWithCommas(
                        (price * quantity + brokerageFee).toFixed(2)
                      )}
                    </td>
                    <td>
                      <NavLink
                        href="#"
                        onClick={() => this.handleOnDelete(_id)}
                        style={{ padding: "0rem" }}
                        className="btn-delete"
                      >
                        Delete
                      </NavLink>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction,
  price: state.price
});

export default connect(mapStateToProps, {
  getTransactions,
  deleteTransaction,
  toggleLoading,
  getPricesForChart
})(ShareHolding);
