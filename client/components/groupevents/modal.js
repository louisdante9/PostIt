import React from 'react';

/**
 * 
 * 
 * @export
 * @class Modal
 * @extends {React.Component}
 */
export default class Modal extends React.Component {

    /**
     * Creates an instance of Modal.
     * @param {any} props 
     * @memberof Modal
     */
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    /**
     * 
     * @returns {void}
     * @param {any} event 
     * @memberof Modal
     */
    handleChange(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    /**
     * 
     * @returns {void}
     * @param {any} event 
     * @memberof Modal
     */
    handleSubmit(event) {
        event.preventDefault();
        this.props.createGroup(this.state).then(() => {
            $('.modal').modal('close');
        });
    }

    /**
     * 
     * 
     * @returns {void}
     * @memberof Modal
     */
    render() {
        return (
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <nav className="">
                        <div className="nav-wrapper black elementHeight">
                            <div className="left col s12 m5 l5 elementHeight">
                                <ul>
                                    <li className="modalHeader">
                                    <span className="email-type elementHeight">
                                    Create a New Group
                                    </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col s12 m7 l7 hide-on-med-and-down elementHeight" >
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="model-email-content">
                    <div className="row">
                        <form className="col s12" >
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        id="group-title"
                                        type="text"
                                        className="validate"
                                        name="name"
                                        onChange={this.handleChange}
                                        value={this.state.name} />
                                    <label htmlFor="group-title">
                                    Group Title
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea
                                        id="description"
                                        className="materialize-textarea"
                                        length="500"
                                        name="description"
                                        onChange={this.handleChange}
                                        value={this.state.description}></textarea>
                                    <label htmlFor="description">
                                    Enter description...
                                    </label>
                                </div>
                            </div>
                        </form>
                       
                        <button className="btn waves-effect waves-light black card-1 createGroup" 
                        type="submit">cancel</button>                          
                        
                        <button className="btn waves-effect waves-light black card-1 createGroup" 
                        type="submit" onClick={this.handleSubmit}>
                        create</button>                          
                    </div>
                </div>
            </div>
        );
    }
}

