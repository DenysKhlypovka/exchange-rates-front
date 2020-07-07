import React from 'react';
import DatePicker from "react-date-picker";
import axios from 'axios';
import {Field, Form, Formik, useFormik} from "formik";

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
    selectedBank: {},
    bankTypes: {}
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/api/banks/bank-types`)
      .then(res => {
        this.setState({
          bankTypes: res.data
        });
      })
  }

  render() {
    const banks = [];
    const rates = [];

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
        <Formik
          initialValues={{
            selectedBank: '',
            date: ''
          }}
          validate={values => {
            const selectedBank = values.selectedBank;
            axios.post(`http://localhost:8080/api/banks/bank-data/` + selectedBank)
              .then(res => {
                this.setState({
                  banksData: res.data,
                  selectedBank: selectedBank
                });
              })
          }}
        >
          <Form>
            <Field id={selectedBank} name={selectedBank} component="select">
              {banks}
            </Field>
            <Field id={date} name={date} component={DatePicker}/>
          </Form>
        </Formik>
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