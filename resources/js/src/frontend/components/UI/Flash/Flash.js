import React from 'react';
export const SuccessFlash = ({ message }) => (
  <div className="alert alert-success">
    <strong>Success!</strong>{message}
  </div>
);
