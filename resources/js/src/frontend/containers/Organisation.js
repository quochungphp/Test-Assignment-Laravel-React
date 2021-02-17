import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import OrganisationGrid from '../components/Organisation/OrganisationGrid';

class Organisation extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <OrganisationGrid />
      </div>
    );
  }
}
export default Organisation;
