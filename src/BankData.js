import React from 'react';
import axios from 'axios';

export default class BankData extends React.Component {
  constructor(props) {
    super(props);
    this.onOptionSelect = this.onOptionSelect.bind(this);
  }

  state = {
    banksData: {
      bankType: [],
      rates: {}
    },
    bankTypes: {},
    selectedBank: {}
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/banks/bank-types`)
      .then(res => {
        this.setState({bankTypes: res.data});
      })
  }

  onOptionSelect(event) {
    const selectedBank = event.target.value;
    axios.post(`http://localhost:8080/banks/bank-data/` + selectedBank)
      .then(res => {
        this.setState({
          banksData: res.data,
          selectedBank: selectedBank
        });
      })
  }

  render() {
    const rates = [];
    const banks = [];
    Object.keys(this.state.banksData.rates).forEach(currency => {
      rates.push(
        <RateRow
          currency={currency}
          rate={this.state.banksData.rates[currency]}/>
      );
    })

    Object.keys(this.state.bankTypes).forEach(bankType => {
      banks.push(
        <BankOptionSelect
          bankName={bankType}
        />
      )
    })

    return (
      <div>
        <select onChange={this.onOptionSelect}>
          {banks}
        </select>
        <table>
          <tbody>
          <tr>
            <td></td>
            <td>{this.state.selectedBank == null ? "" : this.state.selectedBank + " / " + this.state.banksData.bankType.currency}</td>
          </tr>
          {rates}
          </tbody>
        </table>
      </div>
    )
  }
}

class BankOptionSelect extends React.Component {
  render() {
    const bankName = this.props.bankName;
    return (
      <option value={bankName}>{bankName}</option>
    )
  }
}

class RateRow extends React.Component {
  render() {
    const currency = this.props.currency;
    const rate = this.props.rate;
    return (
      <tr>
        <td>{currency}</td>
        <td>{rate}</td>
      </tr>
    );
  }
}