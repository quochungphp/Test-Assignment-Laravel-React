import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Form from '../UI/Form/Form'
import Button from '../UI/Form/Button'
import Input from '../UI/Form/Input'
import Select from '../UI/Form/Selectbox'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { isEmpty } from  'lodash'
import { SpinnerDot } from '../UI/Spinner/Spinner'
import { SuccessFlash } from '../UI/Flash/Flash'


import { roleData } from '../Mocks/data';


class OrganisationModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name : '',
      id : 0,
      policy: [...roleData]
    };
  }

  componentDidMount() {
    if (this.props.id > 0) {
      this.props.onFetchSingleUser(this.props.id)
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
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

  // Create / Update in a action
  handleActionSingleOrg = (e) => {
    e.preventDefault()
    this.props.onPostSingleOrganisation(this.state.id, this.state)
  }

  // Restrict loop render
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.organisation !== prevState.organisation) {
      return { organisation: nextProps.organisation };
    }
    return null;
  }

  // Update state from prop after dispatched
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.organisation !== this.props.organisation) {
      let { id, name, policy  } = this.props.organisation;
      id = this.props.organisation.id
      name = this.props.organisation.name
      policy = prevState.policy.map(item =>
        !isEmpty(policy) ? { ...item, value: policy[item.name] } : item
      );
      this.setState({ id : id , name: name, policy : policy });
    }
    if (prevProps.action !== this.props.action) {
      this.setState({ id: 0, name: '', policy : [...roleData] });
    }
  }

  render() {

    let isError = !isEmpty(this.props.errors) ? true : false
    let errors = this.props.errors;

    return (
        <div className={this.props.show ? 'modal fade show' : 'modal fade in' } role="dialog" tabIndex="-1" id="user-form-modal"
          style={{
          transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.show ? '1' : '0',
          display: this.props.show ? 'block' : 'none'
        }}>

        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{ this.props.id > 0 ? "Update role of group" : "Apply role for new group" }</h5>
                <Button type="button" className="close" data-dismiss="modal" onClick={(e) => this.props.closeModal(e)}><span aria-hidden="true">×</span></Button>
            </div>
            <div className="modal-body">
              <SpinnerDot show={this.props.loading } />
              {

                  this.props.action === 'update'
                    ?
                      <SuccessFlash message=" Updated role of group." />
                  : this.props.action === 'create' ?
                      <SuccessFlash message=" Apply role for new group." />
                  : ''

              }
              <Form >
                <div className="row">
                  <div className="col-md-12">
                    <Input
                        name="name"
                        className="form-control input-sm"
                        fieldGroupClass=""
                        labelTitle="Group name"
                        placeholder="Enter a group name"
                        labelClass=""
                        onChange={this.handleChange}
                        value={this.state.name || '' }
                        hasError={isError}
                        errorMessage={errors['name'] || ''}
                      />
                      <br/>
                  </div>
                </div>
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
                      })
                    }
                    </React.Fragment>
                  <br />
                </div>
                <div className="row">
                  <div className="col d-flex justify-content-end">
                      <Button className="btn btn-primary" onClick={(e) => this.handleActionSingleOrg(e)} >Save Changes</Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    organisation: state.organisationReducer.organisation,
    errors: state.organisationReducer.errors,
    loading: state.organisationReducer.loading,
    action: state.organisationReducer.action
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostSingleOrganisation: (id, data) => dispatch(actions.postSingleOrganisation(id, data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationModal)
