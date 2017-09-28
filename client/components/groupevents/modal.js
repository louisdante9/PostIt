import React from 'react';

export default class Modal extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        };        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        event.preventDefault();
        this.setState({ [ event.target.name] : event.target.value });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.createGroup(this.state).then(() => {
            $('.modal').modal('close');
        });        
    }

    render() {
        return(
            <div id="modal1" className="modal">
                <div className="modal-content">
                <nav className="cyan">
                    <div className="nav-wrapper">
                    <div className="left col s12 m5 l5">
                        <ul>
                        <li><a href="#!" className="email-menu"><i className="modal-action modal-close  mdi-hardware-keyboard-backspace"></i></a>
                        </li>
                        <li><a href="#!" className="email-type">Create a New Group</a>
                        </li>
                        </ul>
                    </div>
                    <div className="col s12 m7 l7 hide-on-med-and-down" >
                        <ul className="right" onClick={this.handleSubmit}>
                        <li><a className="red" href="#!"><i className="material-icons">send</i></a>
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
                            value={this.state.name} />
                        <label htmlFor="group-title">Group Title</label>
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
                        <label htmlFor="description">Enter description...</label>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        );
    }
}

