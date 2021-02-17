import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import  './Style.css';
import Button from '../UI/Form/Button'
import { isEmpty } from 'lodash';
import Form from '../UI/Form/Form'
import { SpinnerDot } from '../UI/Spinner/Spinner'
import UserFormModal from './UserFormModal';
import UserToolbar from './UserToolbar';

class UserGrid extends PureComponent {
  constructor() {
    super();
    this.state = {
      is_open_modal: false,
      user_id: 0,
      name: '',
      org_id: 0
    };
  }

  handleOpenModal = (e) => {
    this.setState({ is_open_modal: true });
  }

  handleCloseModal = (e) => {
    this.setState({ is_open_modal: false, user_id : 0 });
  }

  handleOpenEditCurrentUser = (e, id) => {
    this.setState({ is_open_modal: true, user_id: id});
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
    this.setState({ name: '', org_id: 0 }, ()=> {
      this.props.onFetchUsers(this.state)
    })
  }
  render() {
    let { data } = this.props;

    let isShow = this.state.is_open_modal;

    const users = !isEmpty(data) ? data.map((el, i) => {
      i++;
      return <tr key={i} >
        <td>{i}</td>
        <td>{el.name}</td>
        <td>{el.group_name}</td>
        <td>{el.email}</td>
        <td className="btn-group-control text-center">
          <Button type="button" onClick={(e) => this.handleOpenEditCurrentUser(e, el.id)} className="btn btn-outline-primary btn-circle btn-lg btn-circle ml-2"><i className="fa fa-edit"></i> </Button>
          <Button type="button" onClick={() => this.props.onDeleteSingleUser(el.id)} className="btn btn-outline-danger btn-circle btn-lg btn-circle ml-2"><i className="fa fa-trash"></i> </Button>
        </td>
      </tr>
    }) : <tr><td colSpan="5" className="text-center">Empty data</td></tr>;

    return (
      <div className="container">
        {
          isShow ?
            <UserFormModal
              closeModal={this.handleCloseModal}
              id={this.state.user_id}
              show={isShow} />
          : ''
        }
        {/* Display loading */}
        <SpinnerDot show={this.props.loading} />

        <Form className="form-inline">
          <div className="container-fluid p-0">
            <UserToolbar
                handleOpenModal={this.handleOpenModal}
                handleChange={this.handleChange}
                handleSearch={this.handleSearch}
                handleClearSearch={this.handleClearSearch}
                name={this.state.name}
                orgId={this.state.org_id}
                />
            <br />
            <div className="row">
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-body">
                    <table className="table table-striped" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Group Name</th>
                          <th>Email</th>
                          <th className="text-center">Control</th>
                        </tr>
                      </thead>
                      <tbody>{users}</tbody>
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
    loading: state.userReducer.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteSingleUser: (id) => dispatch(actions.deleteSingleUser(id)),
    onFetchUsers: (query) => dispatch(actions.fetchUsers(query))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserGrid)
