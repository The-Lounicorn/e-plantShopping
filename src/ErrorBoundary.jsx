import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error("❌ Error caught by ErrorBoundary:", error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("🧠 Error info:", info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong while loading this section.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;