import React, { Component } from "react";

class viewOrg extends Component {
  constructor(props) {
    super(props);

    const { _id } = props.location.state;
  }

  render() {
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">mode_edit</i>
              <textarea id="icon_prefix2" className="materialize-textarea" />
              <label for="icon_prefix2">First Name</label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default viewOrg;
