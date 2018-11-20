import React from 'react';

export default class Proposal extends React.Component {
  render() {
    const values = this.props.values || {};
    return (
      <div>
        <h1>Proposal</h1>
        <h2>{values.title}</h2>
        <p>Date: {values.date}</p>
        <p>Thank you for your business.</p>
      </div>
    );
  }
}
