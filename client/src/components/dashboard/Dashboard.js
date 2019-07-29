import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    const { user } = this.props.auth;
    if (!(user === null)) this.props.getCurrentProfile(user.username);
  }
  render() {
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">{profile.name}</p>
            <img
              src={profile.image}
              alt="ProfilePic"
              width="300"
              height="300"
            />
            <p>{profile.role}</p>
            <p>
              <Link to={`/companies/${profile.company_name}`} target="_blank">
                {profile.company_name}
              </Link>
            </p>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p>A profile for this user does not exist</p>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Welcome</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
