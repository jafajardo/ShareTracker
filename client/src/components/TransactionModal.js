import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Container
} from 'reactstrap';
import { addTransaction } from '../flux/actions/transactionActions';


class TransactionModal extends Component {
  state = {
    modalShown: false,
    transactionType: '',
    holdingName: '',
    quantity: 0,
    price: 0,
    brokerageFee: 0,
    date: ''
  }

  toggleModal = () => {
    this.setState({
      modalShown: !this.state.modalShown
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    if (this.state.holdingName !== '' || this.state.holdingName !== '' || parseInt(this.state.quantity) !== 0 || parseFloat(this.state.price) !== 0.0 || parseFloat(this.state.brokerageFee) !== 0.0) {
      // Add new transaction
      const newTransaction = {
        transactionType: this.state.transactionType === '' ? 'BUY' : 'SELL',
        holdingName: this.state.holdingName,
        quantity: parseInt(this.state.quantity),
        price: parseFloat(this.state.price),
        brokerageFee: parseFloat(this.state.brokerageFee),
        date: new Date(this.state.date)
      }
      
      this.props.addTransaction(newTransaction);

      this.toggleModal();
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return(
      <Container>
        <Button
          color="dark"
          style={{ margin: '2rem 0rem' }}
          onClick={this.toggleModal}
        >
          Add Transaction
        </Button>

        <Modal isOpen={this.state.modalShown} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Add new transaction</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
              <Label for="holdingName">Transaction Type</Label>
              <Col style={{ padding: '0rem' }}>
                <Input 
                  type="select"
                  name="transactionType"
                  id="transactionType"
                  onChange={this.handleChange}
                >
                  <option value="BUY">BUY</option>
                  <option value="SELL">SELL</option>
                </Input>
              </Col>
              </FormGroup>
              <FormGroup>
                <Label for="holdingName">Holding</Label>
                <Input 
                  type="text"
                  name="holdingName"
                  id="holdingName"
                  placeholder="Stock Symbol"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
              < Label for="quantity">Quantity</Label>
                <Input 
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="Quantity"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                < Label for="price">Price</Label>
                <Input 
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  onChange={this.handleChange}
                  step="0.01"
                />
              </FormGroup>
              <FormGroup>
                < Label for="brokerageFee">BrokerageFee</Label>
                <Input 
                  type="number"
                  name="brokerageFee"
                  id="brokerageFee"
                  placeholder="Brokerage Fee"
                  onChange={this.handleChange}
                  step="0.01"
                />
              </FormGroup>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input 
                  type="date"
                  name="date"
                  id="date"
                  placeholder="Date"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button style={{ margintop: '3rem' }} block>Add Item</Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    )
  }
}

export default connect(null, {addTransaction})(TransactionModal);
