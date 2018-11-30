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

function getPayloadFromMessage(input) {
  const prefix = 'payload:';
  if (typeof input === 'string' && input.startsWith(prefix)) {
    input = input.slice(0, prefix.length);
    return tryParseJson(input);
  }
  return null;
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
  const payload = getPayloadFromHashFragment();
  if (payload) {
    render(payload);
  }
});

window.addEventListener('message', message => {
  const payload = getPayloadFromMessage(message.data);
  if (!payload) {
    // This is perfectly fine because we just ignore messages that don't match
    // out format.
    console.warn(
      'Incoming message not recognized as a payload string',
      message.data
    );
    return;
  }

  render(payload);
});

function render(payload) {
  if (!payload) {
    return;
  }
  ReactDOM.render(
    <Document values={payload.values} />,
    document.getElementById('root'),
    () => {
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
  if (payload) {
    render(payload);
  }
}

if (module.hot) {
  module.hot.accept('the-current-document', () => {
    run();
  });
}

run();
