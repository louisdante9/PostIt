import React from 'react';

const TextFieldGroup = ({ field, value, placeholder, error, type, onChange }) => {
    return(
        <div className="input-field col s12">
            <input value={value} onChange={onChange} type={type}
            name={field}  placeholder={placeholder}/>
            {error && <span className="badge">{error}</span>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
    type: 'text'
};
export default TextFieldGroup;