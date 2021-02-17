import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Form from '../UI/Form/Form'
import Button from '../UI/Form/Button'
import Input from '../UI/Form/Input'
import Select from '../UI/Form/Selectbox'
import { isEmpty } from  'lodash'
import { SpinnerDot } from '../UI/Spinner/Spinner'
import { userData } from '../Mocks/data';
import  './Style.css'

class UserFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = userData;
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

  handleActionSingleUser = (e) => {
    e.preventDefault()
    if (this.props.id > 0) {
      this.props.onPutSingleUser(this.props.id, this.state)
    } else {
      this.props.onPostSingleUser(this.state)
    }

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user !== prevState.user) {
      return { user: nextProps.user };
    }
    return null;
  }

  // Update state from prop after dispatched
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.setState({ ...this.props.user });
    }
    if (prevProps.action !== this.props.action) {
      this.setState({ ...userData });
    }
  }

  render() {
    let dataOption = this.props.group;
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
              <h5 className="modal-title">{ this.props.id > 0 ? "Update user info" : "Create user" }</h5>
                <Button type="button" className="close" data-dismiss="modal" onClick={(e) => this.props.closeModal(e)}><span aria-hidden="true">×</span></Button>
            </div>
            <div className="modal-body">
              {
                  <SpinnerDot show={this.props.loading } />
              }
              {
                  !isEmpty(this.props.action)?
                      this.props.id > 0 ?
                        <div className="alert alert-success">
                          <strong>Success!</strong> Updated a user info.
                        </div>
                        :
                        <div className="alert alert-success">
                          <strong>Success!</strong> Created a new user.
                        </div>
                : ''
              }
              <Form >
              <div className="row">
                  <div className="col-md-12">
                    <Input
                      name="name"
                      labelTitle="Full Name"
                      className="form-control input-sm"
                      fieldGroupClass=""
                      labelClass=""
                      onChange={this.handleChange}
                      value={this.state.name || ''}
                      hasError={isError}
                      errorMessage={errors['name'] || ''}
                    />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Input
                    name="email"
                    labelTitle="Email"
                    className="form-control input-sm"
                    fieldGroupClass=""
                    labelClass=""
                    onChange={this.handleChange}
                    value={this.state.email || ''}
                    hasError={isError}
                    errorMessage={errors['email'] || ''}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Input
                    name="password"
                    labelTitle="Password"
                    className="form-control input-sm"
                    fieldGroupClass=""
                    labelClass=""
                    onChange={this.handleChange}
                    value={this.state.password || ''}
                    hasError={isError}
                    errorMessage={errors['password'] || ''}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Select
                    id="org_id"
                    name="org_id"
                    className="form-control input-sm"
                    fieldGroupClass=" "
                    labelClass=" "
                    groupClass="form-group "
                    onChange={this.handleChange}
                    options={dataOption}
                    value={this.state.org_id || ''}
                    hasError={isError}
                    errorMessage={errors['org_id'] || ''}
                    />

                </div>
              </div>
              <div className="row">
                <div className="col d-flex justify-content-end">
                    <Button className="btn btn-primary" onClick={(e) => this.handleActionSingleUser(e)} >Save Changes</Button>
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
    user: state.userReducer.user,
    errors: state.userReducer.errors,
    loading:  state.userReducer.loading,
    group: state.userReducer.group,
    action: state.userReducer.action
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSingleUser: (id) => dispatch(actions.fetchSingleUser(id)),
    onPutSingleUser: (id, data) => dispatch(actions.putSingleUser(id, data)),
    onPostSingleUser: (data) => dispatch(actions.postSingleUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFormModal)
