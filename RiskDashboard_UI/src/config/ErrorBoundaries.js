import { Component } from "react";

export default class ErrorBoundaries extends Component {
  state = {
    isErrorOccured: false,
  };
  static getDerivedStateFromError() {
    return { isErrorOccured: true };
  }
  componentDisCatch() {}
  render() {
    return this.state.isErrorOccured
      ? "Oops! Something went wrong.  Try again "
      : "";
  }
}
