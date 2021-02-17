import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Button from '../UI/Form/Button'
import Input from '../UI/Form/Input'
import Select from '../UI/Form/Selectbox'
import './Style.css';
import { isEmpty } from 'lodash';


class UserToolbar extends PureComponent {
  constructor() {
    super();
    this.state = {
    };
  }
  render() {
    let { handleOpenModal, handleChange, handleSearch, handleClearSearch, name, orgId} = this.props;
    let dataOption = !isEmpty(this.props.group) ? this.props.group : { 0 : '----------' } ;
    return(
        <div className="row">
          <div className="col-lg-12">
            <h1 className="h3 mb-3">Users</h1>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <Select
                id="org_id"
                name="org_id"
                className="form-control input-sm"
                fieldGroupClass="col-md-3"
                labelClass=" "
                groupClass="form-group "
                onChange={handleChange}
                options={dataOption}
                value={orgId || 0 }
              />

              <Input
                name="name"
                className="form-control input-sm"
                fieldGroupClass="col-md-3"
                placeholder="Search by name"
                labelClass=""
                onChange={handleChange}
                value={ name || '' }
              />
            <Button type="button"  onClick={(e) => handleSearch(e)} className="btn btn-info">Search</Button>
            <span> &nbsp;&nbsp;</span>
            <Button type="button" onClick={(e) => handleClearSearch(e)} className="btn btn-info">Clear search</Button>

            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="float-right">
              <Button type="button" className="btn btn-primary" onClick={(e) => handleOpenModal(e)}>Add a new Users</Button>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    group: state.userReducer.group,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteSingleUser: (id) => dispatch(actions.deleteSingleUser(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserToolbar)
