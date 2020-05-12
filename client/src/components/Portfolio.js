import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Table } from "reactstrap";
import { getTransactions } from "../flux/actions/transactionActions";
import { getPrice, getPricesForChart } from "../flux/actions/priceActions";
import ShareOverview from "./ShareOverview";

class Portfolio extends Component {
  componentDidMount = () => {
    this.props.getTransactions();
  };

  render() {
    const holdings = [];
    this.props.transaction.shareHoldings.forEach(share => {
      const found = holdings.find(
        holding => holding.name === share.holdingName
      );
      if (!found) {
        // Load price
        this.props.getPrice(share.holdingName);

        // Create a new object for this holding name
        const newHolding = {
          name: share.holdingName,
          transactions: [share]
        };
        holdings.push(newHolding);
      } else {
        // Add transaction to the existing transactions in the array
        found.transactions.push(share);
      }
    });

    return (
      <Container>
        <Table hover>
          <thead>
            <tr>
              <th>SYMBOL</th>
              <th>AVE PRICE</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>VALUE</th>
              <th>CAPITAL GAINS</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding, index) => {
              return (
                <ShareOverview
                  key={index}
                  index={index}
                  holding={holding}
                  symbol={holding.name}
                />
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction
});

export default connect(mapStateToProps, {
  getTransactions,
  getPrice,
  getPricesForChart
})(Portfolio);
