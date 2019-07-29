import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentCompany } from "../../actions/companyActions";
import Spinner from "../common/Spinner";

import socketIOClient from "socket.io-client";

class Company extends Component {
  state = {
    response: null,
    endpoint: ""
  };

  componentDidMount() {
    if (this.props.match.params.name) {
      this.setState({
        endpoint:
          "http://localhost:4000/api/companies/" + this.props.match.params.name
      });
      const { user } = this.props.auth;
      const body = {
        id: user.id
      };
      this.props.getCurrentCompany(this.props.match.params.name, body);
      this.socket = socketIOClient(this.endpoint);
      this.socket.on("fetch", data => this.setState({ response: data }));
      this.socket.on("decrease", data => this.setState({ response: data }));
    }
  }

  // componentWillUpdate() {
  //   this.socket.on("fetch", data => this.setState({ response: data }));
  //   this.socket.on("decrease", data =>
  //     this.setState({ response: data, active: false })
  //   );
  // }
  // componentDidUpdate() {
  //   this.socket.on("fetch", data => this.setState({ response: data }));
  //   this.socket.on("decrease", data =>
  //     this.setState({ response: data, active: false })
  //   );
  // }
  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    const { company, loading } = this.props.company;

    let companyContent;

    if (company === null || loading) {
      companyContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(company).length > 0) {
        const { response } = this.state;
        companyContent = (
          <div>
            <p className="lead text-muted">{company.name}</p>
            <img src={company.logo} alt="CompanyPic" width="300" height="300" />
            <p>Address : {company.address}</p>
            <p>Active views:{response}</p>
            <p>Total Views: {company.total_views}</p>
          </div>
        );
      } else {
        // User is logged in but has no profile
        companyContent = (
          <div>
            <p>A profile for this company does not exist</p>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Company Details</h1>
              {companyContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Company.propTypes = {
  getCurrentCompany: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  company: state.company,
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentCompany }
)(Company);
