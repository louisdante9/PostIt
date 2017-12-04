import React from 'react';
import { PropTypes } from 'prop-types';

const TextFieldGroup = ({ field, value,
  placeholder, error, type, onChange }) => {
  return (
    <div className="input-field">
      <input value={value} onChange={onChange} type={type}
        name={field} placeholder={placeholder} />
      {error && <span className="badge">{error}</span>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
  type: 'text'
};
export default TextFieldGroup;