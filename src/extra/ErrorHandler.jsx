import React from "react";
import ErrorPage from "../pages/ErrorPage";
import {withRouter} from "react-router-dom";

class ErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname)
            this.setState({error: false});
    }

    componentDidCatch(error, errorInfo) {
        this.setState({error: true});
    }

    render() {
        return this.state.error ? <ErrorPage/> : this.props.children;
    }
}

export default withRouter(ErrorHandler);
