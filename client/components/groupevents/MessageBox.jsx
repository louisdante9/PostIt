import React from 'react';
import { PropTypes } from 'prop-types';

const MessageBox = ({ message, flag, onChange, onSubmit }) => {
    return (
        <div className="message-box-footer">
            <div className="footer-wrapper">
                    <textarea className="message-input materialize-textarea "
                        placeholder="write message..." value={message}
                        name="message" onChange={onChange}></textarea>
                    <select className="priority-select" name="flag"
                      value={flag} onChange={onChange}>
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="critical">Critical</option>
                    </select>
                    <a className="cta btn-cta" onClick={onSubmit}>SEND</a>
            </div>
        </div>
    );
};

MessageBox.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    groups: PropTypes.array.isRequired,
    message: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired
};
export default MessageBox;