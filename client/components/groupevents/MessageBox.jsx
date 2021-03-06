import React from 'react';
import { PropTypes } from 'prop-types';
/**
 * 
 * 
 * @param {any} { 
 *   message, flag, onChange, onSubmit, handleKeyDown 
 * } 
 * @returns { void }
 */
const MessageBox = ({ 
  message, flag, onChange, onSubmit, handleKeyDown 
}) => (
  <div className="message-box-footer">
    <div className="footer-wrapper">
        <textarea id="textareaId" className="message-input materialize-textarea"
          placeholder="write message... [shift-down] to move to next line" value={message}
          name="message" onChange={onChange}
          onKeyPress={(event) => { handleKeyDown(event, onSubmit) }} required>
        </textarea>
      <select 
        className="priority-select" name="flag"
          value={flag} onChange={onChange}>
        <option value="normal">Normal</option>
        <option value="urgent">Urgent</option>
        <option value="critical">Critical</option>
      </select>
      <div className="cta">
        <a className="btn-cta btn-icon" onClick={onSubmit} >
          <i className="material-icons cta-icon">send</i>
          <span className="cta-text">SEND</span>
        </a>
      </div>
    </div>
  </div>
);

MessageBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired,
  handleKeyDown: PropTypes.func.isRequired
};
export default MessageBox;