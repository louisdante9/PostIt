// import React from 'react';

// /**
//  * 
//  * 
//  * @class FlashMessage
//  * @extends {React.Component}
//  */
// class FlashMessage extends React.Component {
//     render(){
//         const { id, type, text } = this.props.message;
//         const flash = text;
        
//       return(
//         <div className={('alert', {
//             'alert-success': type === 'success',
//             'alert-danger':  type === 'error'
//         })}>
        
//           {flash}
//         </div>
//       );
//     }
// }

// FlashMessage.propTypes = {
//     message: React.PropTypes.object.isRequired
// };

// function mapStateToProps(state){
//     return{
//         messages: state.FlashMessages
//     };
// }

// export default FlashMessage; 