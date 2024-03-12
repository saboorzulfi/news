// ** React
import  { Component } from "react";

// ** Bootstrap
import { Button } from "react-bootstrap";

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ error: error, errorInfo: errorInfo });
	}

	render() {
		const { children } = this.props;
		const { error, errorInfo } = this.state;

		return (
			<>
				{errorInfo ? (
					<div style={{ textAlign: "center", padding: "20px" }}>
						<h2>Something went wrong.</h2>
						<p>{error && error.toString()}</p>
						<Button
							variant="contained"
							onClick={() => window.location.reload()}
						>
							Retry
						</Button>
					</div>
				) : (
					children
				)}
			</>
		);
	}
}
