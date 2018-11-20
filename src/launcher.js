import React from 'react';
import ReactDOM from 'react-dom';
import Document from 'the-current-document';

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

    // console.log({ keys: Object.keys(Doc) });
    ReactDOM.render(
      <Document values={payload.values} />,
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
