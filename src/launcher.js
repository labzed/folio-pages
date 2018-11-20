import React from 'react';
import ReactDOM from 'react-dom';
// import docs from './docs';

const chunks = ['invoice', 'bill-of-lading'];

async function run() {
  try {
    const payloadJson = window.decodeURIComponent(
      window.location.search.slice(1)
    );
    if (!payloadJson) {
      return;
    }
    console.log('We have payload JSON:', payloadJson);
    const payload = JSON.parse(payloadJson);
    console.log({ payload });
    // const Doc = docs[payload.template]
    const { default: Doc } = await import(`./templates/${payload.template}.js`);
    if (!Doc) {
      throw new Error(`No such doc`);
    }
    console.log({ keys: Object.keys(Doc) });
    ReactDOM.render(
      <Doc values={payload.values} />,
      document.getElementById('root'),
      () => {
        console.log('Rendered');
      }
    );

    document.addEventListener('load', () => {
      console.log('Loaded');
    });
  } catch (error) {
    console.error(error);
  }
}

run();
