import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { roleData } from '../Mocks/data';
import Button from '../UI/Form/Button'
import Input from '../UI/Form/Input'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { isEmpty, has, keyBy} from 'lodash';

class OrganisationToolbar extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render () {
    let { handleOpenModal, handleChange, handleSearch, handleClearSearch, name} = this.props;
    return(
      <div className="row">
        <div className="col-lg-12">
          <h1 className="h3 mb-3">Organisations</h1>
        </div>
        <div className="col-lg-8 col-md-12">
          <div className="row">
            <Input
              name="name"
              className="form-control input-sm"
              fieldGroupClass="col-md-3"
              placeholder="Search by name"
              labelClass=""
              onChange={handleChange}
              value={ name || ''}
            />
            <Button type="button" onClick={(e) => handleSearch(e)} className="btn btn-info">Search</Button>
            <span> &nbsp;&nbsp;</span>
            <Button type="button" onClick={(e) => handleClearSearch(e)} className="btn btn-info">Clear search</Button>

          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="float-right">
            <Button type="button" className="btn btn-primary" onClick={(e) => handleOpenModal(e)}>Add a new organisation</Button>
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.organisationReducer.loading,
    organisation: state.organisationReducer.organisation,
    action: state.organisationReducer.action
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPostSingleOrganisation: (id, data) => dispatch(actions.postSingleOrganisation(id, data)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrganisationToolbar)
