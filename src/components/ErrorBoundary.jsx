import React from 'react'
import { Container, Alert, Button } from 'react-bootstrap'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="mt-5">
          <Alert variant="danger">
            <Alert.Heading>Something went wrong</Alert.Heading>
            <p>{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <Button variant="outline-danger" onClick={() => this.setState({ hasError: false, error: null })}>
              Try Again
            </Button>
          </Alert>
        </Container>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
