import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return <div className="page-state error-state"><h2>Couldn’t load this page</h2><p>Please try again. Your saved data is safe.</p><button className="btn" onClick={() => this.setState({ hasError: false })}>Try again</button></div>;
    }
    return this.props.children;
  }
}
