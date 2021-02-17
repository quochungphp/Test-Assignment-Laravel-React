
import React from 'react';
import {  Link } from 'react-router-dom';
import './ModalAlert.css';

export const ModalAlert = ({ closeModal, title, message }) => {
  return (
    <div id="modal-warning" className="modal modal-message modal-warning" style={{display: "block"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <i className="glyphicon glyphicon-check"></i>
          </div>
          <div className="modal-title">Unauthorization</div>
          <div className="modal-body">You have to login!</div>
          <div className="modal-footer text-center">
            <Link to="/login" className="btn btn-success">Go to Login</Link>
            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={() => closeModal()}>OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ModalAlertPrimary = ({ closeModal, title, message }) => {
  return (
    <div id="modal-warning" className="modal modal-message modal-warning" style={{ display: "block", marginTop: "50px"}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <i className="glyphicon glyphicon-check"></i>
          </div>
          <div className="modal-title">Checkout</div>
          <div className="modal-body">Order successfully!</div>
          <div className="modal-footer text-center">
            <Link to="/order" className="btn btn-success">Go to Order</Link>
            <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={() => closeModal()}>OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ModalAlertAddToCart = ({ closeModal, title, message }) => {
  return (
    <div id="modal-success" className="modal modal-message modal-warning" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <i className="glyphicon glyphicon-check"></i>
          </div>
          <div className="modal-title">Success</div>
          <div className="modal-body">Add to cart successfully!</div>
          <div className="modal-footer text-center">
            <Link to="/checkout" className="btn btn-success">Go to Checkout</Link>
            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => closeModal()}>OK</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ModalViewInfo = ({ closeModal, orderInfo }) => {
  return (
    <div id="modal-warning" className="modal modal-message modal-success" style={{ display: "block" }}>
      <div className="container">
        <div className="modal-content">
          <div className="modal-header">
            <i className="glyphicon glyphicon-check"></i>
          </div>
          <div className="modal-title">View Order Info</div>
          <div className="modal-body">
          {orderInfo}
          </div>
          <div className="modal-footer text-center">
            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={() => closeModal()}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
