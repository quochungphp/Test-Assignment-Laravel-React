import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Form from '../UI/Form/Form'
import { SpinnerDot } from '../UI/Spinner/Spinner'
import { OrganisationElement } from './OrganisationElement';
import OrganisationToolbar from './OrganisationToolbar';
import OrganisationModal from './OrganisationModal';

class OrganisationGrid extends PureComponent {
  constructor() {
    super();
    this.state = {
      is_open_modal: false,
      id : 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // Fetch api
  componentDidMount = () => {
    this.props.onFetchOrganisations();
  }

  // handleChange = (e) => {
  //   const target = e.target;
  //   const name = target.name;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;

  //   if (target.type === 'checkbox') {
  //     this.setState(prevState => ({ policy: prevState.policy.set(name, value) }));
  //   } else {
  //     this.setState({
  //       [name]: value
  //     });
  //   }
  // }


  handleEdit = (e, id) => {
    this.setState({ id: id, is_open_modal: true}, () =>{
      this.props.onFetchSingleOrganisation(id)
    });
  }

  handleDelete = (e, id) => {
    this.setState({ id: id }, () => {
      this.props.ondeleteSingleOrganisation(id)
    });
  }

  handleOpenModal = (e) => {
    this.setState({ is_open_modal: true });
  }

  handleCloseModal = (e) => {
    this.setState({ is_open_modal: false, id: 0 });
  }


  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }

  handleSearch = (e) => {
    this.props.onFetchUsers(this.state)
  }

  handleClearSearch = (e) => {
    this.setState({ name: '', org_id: 0 }, () => {
      this.props.onFetchOrganisations(this.state)
    })
  }

  render() {

    let { organisations } = this.props;
    let isShow = this.state.is_open_modal;

    return (
      <div className="container">
        <OrganisationModal
          closeModal={this.handleCloseModal}
          id={this.state.user_id}
          show={isShow} />

        <Form className="form-inline">
        <div className="container-fluid p-0">
          <OrganisationToolbar
            currentItemEdit={this.props.organisation}
            handleOpenModal={this.handleOpenModal}
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
            handleClearSearch={this.handleClearSearch}
            name={this.state.name}
          />
          <br />
          <SpinnerDot show={this.props.loading} />
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <table className="table table-striped" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Roles</th>
                          <th className="text-center">Control</th>
                        </tr>
                      </thead>
                      <tbody>
                        <OrganisationElement data={organisations} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.organisationReducer.loading,
    organisations: state.organisationReducer.organisations,
    organisation: state.organisationReducer.organisation,
    action: state.organisationReducer.action
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrganisations: () => dispatch(actions.fetchOrganisations()),
    onFetchSingleOrganisation: (id) => dispatch(actions.fetchSingleOrganisation(id)),
    ondeleteSingleOrganisation: (id) => dispatch(actions.deleteSingleOrganisation(id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrganisationGrid)
