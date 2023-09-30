import '../App.css';
import '../component/AITool/styles.css';
import { Component } from 'react';
import DropZone from '../component/AITool/DropZone';
import AIToolResultRight from '../component/AITool/AIToolResultRight';


const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT


// declare props for AITool component
interface AIToolProps {

}


// declare states for AITool component
interface AIToolState {
  classNames: any,
  classIDs: any,
  message?: string,
  isInfo: boolean,
  answer: string,
}


export class AITool extends Component<AIToolProps, AIToolState> {

  constructor(props: AIToolProps) {
      super(props);

      this.state = {
        classNames: null,
        classIDs: null,
        isInfo: true,
        answer: '',
      };
  }


  // get the data returned by AI Tool API
  getPOSTData = (childData: any) => {
    this.setState({
        classNames: [...childData.classNames], // an array of predicted classes
        // classIDs: [...childData.classIDs],
      }, () => {
        // console.log(this.state.classNames)
      } // end callback
    ); // end setState for classNames
  }; /// end POST 


  changeToSearchByTrashTag = (childData: any) => {

    this.setState({
      isInfo: childData.isInfo,
    })

  };

  render() {
      return  (
        <div className='AITool'>
          <DropZone sendData={this.getPOSTData} 
                    readState={this.changeToSearchByTrashTag}/>
          { 
            this.state.classNames // if receive result
              ? ( // display image and result
                <>
                  <AIToolResultRight 
                    isInfo={this.state.isInfo} 
                    classNames={this.state.classNames}
                    // classIDs={this.state.classIDs}
                  />
                </>
              ) 
              : ( // display drag and drop file by default
                <>
                  <div className='AITool-content'>
                    <div className='AITool-header'>
                      <img className='AITool-header-logo' src={`${API_ENDPOINT}/image/AI_Tool_logo.svg`} />
                      <h1 className='AITool-header-title'>AI-powered waste sorting tool</h1>
                    </div>
                    <p className='AITool-desc'>An AI-powered waste sorting tool utilizes advanced algorithms and machine learning to automate and optimize the process of waste classification.</p>
                  </div>
                </>
              )
          }
        </div>
    )
  }
}


export default AITool;
