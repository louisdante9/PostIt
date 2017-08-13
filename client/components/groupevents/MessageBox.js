import React from 'react';

export const Component = (props) => {
    return(
        <div>
      `      <div className="email-content-wrap">
                <div className="row">
                    <div className="col s12 m12 l12">
                        <hr />
                        <ul>
                        <li className="collection-item avatar" id="text-input">
                            <textarea id="text-area" className="col s10" placeholder="write message..."></textarea>
                            <select className="col s1">
                                <option value="">Priority</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                            <a href="#!" className="secondary-content">
                            <span className="send">
                                SEND
                            </span></a>
                        </li>
                        </ul>
                    </div>
                </div>
                <div className="col s2 m2 l2 email-actions">
                    <a href="#!"><span><i className="mdi-content-reply"></i></span></a>
                    <a href="#!"><span><i className="mdi-navigation-more-vert"></i></span></a>
                </div>
            </div>
        </div>
    );
};

export default Component;