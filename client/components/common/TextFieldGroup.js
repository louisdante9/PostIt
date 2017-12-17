import React from 'react';
import { PropTypes } from 'prop-types';

/**
* 
* @desc this functional component returns input fields 
* @param {any} field 
* @param {any} value 
* @param {any} placeholder
* @param {any} error
* @param {any} type
* @param {any} onChange
* @param {any} required
* @returns { void }
*/
const TextFieldGroup = ({ field, value,
  placeholder, error, type, onChange,required }) => {
  return (
    <div className="input-field">
      <input value={value} onChange={onChange} type={type}
        name={field} placeholder={placeholder} required={required}/>
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
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired
};

TextFieldGroup.defaultProps = {
  type: 'text'
};
export default TextFieldGroup;