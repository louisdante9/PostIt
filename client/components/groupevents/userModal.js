import React from 'react';

export default class UserModal extends React.Component { 

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         name: '',
    //         description: ''
    //     };

    //     console.log(this.props);
        
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }


    // handleChange(event) {
    //     event.preventDefault();
    //     this.setState({ [ event.target.name] : event.target.value });
    // }
    
    // handleSubmit(event) {
    //     event.preventDefault();
    //     this.props.createGroup(this.state).then(() => {
    //         $('.modal').modal('close');
    //     });        
    // }

    render() {
        return(
            <div id="modal2" className="modal">
                <div className="modal-content">
                <nav className="cyan">
                    <div className="nav-wrapper">
                    <div className="left col s12 m5 l5">
                        <ul>
                            <li>
                                <a href="#!" className="email-menu">
                                    <i className="modal-action modal-close  mdi-hardware-keyboard-backspace">
                                    </i>
                                </a>
                        </li>
                        <li>
                            <a href="#!" className="email-type">
                                Add users to group
                            </a>
                        </li>
                        </ul>
                    </div>
                    <div className="col s12 m7 l7 hide-on-med-and-down" >
                        <ul className="right" onClick={this.handleSubmit}>
                            <li>
                                <a className="red" href="#!">
                                    <i className="material-icons">
                                        Add
                                    </i>
                                </a>
                            </li>
                        </ul>
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
                                 />
                            <label htmlFor="group-title">search for users</label>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

