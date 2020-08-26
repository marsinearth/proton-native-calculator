import { App, Window } from "proton-native"; // import the proton-native components
import React, { Component } from "react"; // import from react

import Calculator from './src/Components';

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(err, errInfo) {
    console.error({ err, errInfo })
  }

  render() {
    if (this.state.hasError) {
      return <h1>Error Ocurred!!</h1>
    }
    return this.props.children;
  }
}

export default class Example extends Component {
  render() {
    // all Components must have a render method
    return (
      <App>
        {/* you must always include App around everything */}
        <Window style={calculatorWrapper}>
          <ErrorBoundary>
            <Calculator />
          </ErrorBoundary>
        </Window>
      </App>
    );
  }
}

const calculatorWrapper = {
  width: 450,
  height: 900,
  backgroundColor: 'black'
};