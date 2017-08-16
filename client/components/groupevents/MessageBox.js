import React from 'react';

export const Component = ({ message, flag, onChange, onSubmit }) => {
    // groups.filter(group => )
    return(
        <div>
      `      <div className="email-content-wrap">
                <div className="row">
                    <div className="col s12 m12 l12">
                        <hr />
                        <ul>
                        <li className="collection-item avatar" id="text-input">
                            <textarea id="text-area" className="col s10" placeholder="write message..." value={message} name="message" onChange={onChange}></textarea>
                            <select className="col s1" id="select" name="flag" value={flag} onChange={onChange}>
                                <option value="normal">Normal</option>
                                <option value="urgent">Urgent</option>
                                <option value="critical">Critical</option>
                            </select>
                            <a href="" className="secondary-content" onClick={onSubmit}>
                            <span className="send">
                                SEND
                            </span></a>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

Component.propTypes={
    value : React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    groups: React.PropTypes.array.isRequired
};
export default Component;