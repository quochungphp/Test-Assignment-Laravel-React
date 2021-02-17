import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import RoleData from '../Mocks/RoleData';
import Button from '../UI/Form/Button'
import Input from '../UI/Form/Input'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import './Style.css';
import { isEmpty, has, keyBy} from 'lodash';
import { parse } from 'query-string';

class OrganisationToolbar extends PureComponent {
  constructor() {
    super();
    this.state = {
      id: 0,
      name: '',
      policy: [...RoleData]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);

  }


  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if (target.type === 'checkbox') {
      this.setState(prevState => ({ policy: prevState.policy.set(name, value) }));
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  handleSave = (e) => {
    this.props.onPostSingleOrganisation(this.state.id, this.state)
  }

  handleCancel = (e) => {
    this.setState(prevState => {
      let { policy } = prevState;
      policy = policy.map(item => ({ ...item, value: false }));
      return {id: 0 , policy, name : '' };
    });
  }

  handleChangeCheckbox = e => {
    let itemName = e.target.name;
    let checked = e.target.checked;
    this.setState(prevState => {
      let { policy } = prevState;
      policy = policy.map(item =>
        item.name === itemName ? { ...item, value: checked } : item
      );
      return { policy };
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.organisation !== this.props.organisation) {
      this.setState(prevState => {
        let { id, name, policy } = prevState;
        id = nextProps.organisation.id
        name = nextProps.organisation.name
        policy = policy.map(item =>
          !isEmpty(nextProps.organisation) ? { ...item, value: nextProps.organisation.policy[item.name] } : item
        );
        return { id, name, policy };
      });
    }

    if (nextProps.action == "update" || nextProps.action == "create" || nextProps.action == "delete") {
      this.setState({id : 0, name: '', policy: RoleData})
    }

  }
  render () {
    return(
        <div className="row">
          <div className="col-lg-12">
            <h1 className="h3 mb-3">Organisations</h1>
          </div>
          <div className="col-md-12">
              <Input
                name="name"
                className="form-control input-sm"
                fieldGroupClass="col-md-4"
                labelTitle="Group name"
                placeholder="Enter a group name"
                labelClass=""
                onChange={this.handleChange}
                value={this.state.name || '' }
              />
              <br/>
          </div>
        <div className="col-md-12">
          <div className="row">

            <React.Fragment>
              {
                this.state.policy.map((item, key)=> {
                return <div className="col-md-2" key={key}>
                  <FormControlLabel key={key}
                    control={<Checkbox key={key} checked={item.value} onChange={this.handleChangeCheckbox} name={item.name} />}
                    label={item.name}
                  />
                </div>
                // const checked = typeof this.state.policy.get(item.name) !== "undefined" ? this.state.policy.get(item.name) : false ;
                // return <div className="col-md-2" key={key}>
                //   <FormControlLabel key={key}
                //     control={<Checkbox key={key} defaultChecked={checked} onChange={this.handleChangeCheckbox} name={item.name} />}
                //     label={item.name}
                //   />
                // </div>
              })
            }
            </React.Fragment>
          </div>
          <br />
        </div>
          <div className="col-md-12">
            <div className="float-right">
              <Button type="button" onClick={this.handleSave} className="btn btn-info">Save</Button>
              <span> &nbsp;&nbsp;</span>
            <Button type="button" onClick={this.handleCancel} className="btn btn-info">Cancel</Button>
            </div>
          </div>
        </div>
    )
}}

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
