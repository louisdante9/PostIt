import React from 'react';

class FlashMessage extends React.Component {
    render(){
        const { id, type, text } = this.props.message;
      return(
        <div className={('alert', {
            'alert-success': type === 'success',
            'alert-danger':  type === 'error'
        })}>
        
          {text}
        </div>
      );
    }
}

FlashMessage.propTypes = {
    message: React.PropTypes.object.isRequired
};

function mapStateToProps(state){
    return{
        messages: state.FlashMessages
    };
}

export default FlashMessage; 