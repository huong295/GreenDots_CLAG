import React, { Component } from 'react';
import Toggler from './Toggler';
import './styles.css';


class AIToolResultRight extends Component {

    constructor(props) {
        super(props);
    };


    render(){
        return (
            <div className='AITool-result-right'>
              <Toggler 
                data={this.props.classNames}
                title={this.props.isInfo ? 'Trash Information' : 'Recommended Locations'}
                isInfo={this.props.isInfo}
              />
            </div>
          )}

};

export default AIToolResultRight;