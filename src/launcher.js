import React from 'react';
import ReactDOM from 'react-dom';
import Document from 'the-current-document';

function getPayloadFromQueryString() {
  const payloadJson = window.decodeURIComponent(
    window.location.search.slice(1)
  );
  return tryParseJson(payloadJson);
}

function getPayloadFromHashFragment() {
  const payloadJson = window.decodeURIComponent(window.location.hash.slice(1));
  return tryParseJson(payloadJson);
}

function tryParseJson(input) {
  if (typeof input !== 'string' || !input.length) {
    return null;
  }

  try {
    return JSON.parse(input);
  } catch (error) {
    return null;
  }
}

window.addEventListener('hashchange', () => {
  console.log('Hash change');
  const payload = getPayloadFromHashFragment();
  if (payload) {
    render(payload);
  }
});

window.addEventListener('message', message => {
  const payload = tryParseJson(message.data);
  if (!payload) {
    console.warn(
      'Incoming message not recognized as a payload string',
      message.data
    );
    return;
  }

  render(payload);
});

function render(payload) {
  ReactDOM.render(
    <Document values={payload.values} />,
    document.getElementById('root'),
    () => {
      // lastRenderedPayload = payload;
      // window.location.hash = JSON.stringify(lastRenderedPayload);
      window.history.replaceState(
        null,
        null,
        document.location.pathname + '#' + JSON.stringify(payload)
      );
      window.parent.postMessage('render', '*');
    }
  );
}

function run() {
  const payload = getPayloadFromHashFragment();
  render(payload);
}

if (module.hot) {
  module.hot.accept('the-current-document', () => {
    run();
  });
}

run();
