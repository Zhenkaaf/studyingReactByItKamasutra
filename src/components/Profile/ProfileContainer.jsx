import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { setUserProfile } from "../../redux/profileReducer";
import axios from "axios";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";


class ProfileContainer extends React.Component {


    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 2;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} />
            </div>
        )
    }
}


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}


let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}


export default connect(mapStateToProps, { setUserProfile })(withRouter(ProfileContainer));

/* export default connect(mapStateToProps, {
    setUserProfile
}
)(ProfileContainer); */