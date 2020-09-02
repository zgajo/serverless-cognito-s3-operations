import { API } from "aws-amplify";
import React, { Component } from "react";
import { ListGroup, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import "./Home.css";
import LoaderButton from "../components/LoaderButton";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: true,
      testApiCall: [],
    };
  }

  async componentDidMount() {
    try {
      const testApiCall = await this.testApiCall();
      this.setState({ testApiCall });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  handleFileChange = (event) => {
    this.file = event.target.files[0];
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    this.setState({ isLoading: true });

    try {
      await s3Upload(this.file);
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
    this.setState({ isLoading: false });
  };

  testApiCall() {
    console.log("object");
    return API.get("testVertexApi", "/hello");
  }

  renderTestAPI(testApiCall) {
    console.log(testApiCall);
    return testApiCall.message;
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Test web app</h1>
        <p>A simple react test app</p>
      </div>
    );
  }

  renderTest() {
    return (
      <div className="test">
        {/* <PageHe>ader>Test API call</PageHeader> */}
        <ListGroup>
          {!this.state.isLoading && this.renderTestAPI(this.state.testApiCall)}
        </ListGroup>

        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="file">
            <FormLabel>Upload a file</FormLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Upload!"
            loadingText="Uploading..."
          />
        </form>
      </div>
    );
  }

  render() {
    return <div className="Home">{this.renderTest()}</div>;
  }
}
