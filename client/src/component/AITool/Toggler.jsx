import React, { useState, useEffect, useRef } from "react";
import { PreviewCampaign } from './PreviewCampaign';
import axios from 'axios';


const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT



export default function Toggler({ data, title, isInfo }) {

    const [isOpen, setIsOpen] = useState({});
    const [trashInfo, setTrashInfo] = useState({});
    const [trashLocations, setTrashLocations] = useState({});


    // set open state for each item
    const toggleOpen = (name) => {
      setIsOpen({
        ...isOpen,
        [name]: !isOpen[name],
      });
    };


    // fetch data from database
    function getInfo(tagID) { // get trash information by tag id
        
        if (!isOpen[tagID] && !trashInfo[tagID]) { // only fetch data the first time user open the item
            axios.get(`${API_ENDPOINT}/trash-info/${tagID}`, {
                headers: {
                  'ngrok-skip-browser-warning': 'true' // Set the ngrok-skip-browser-warning header
                }
            }).then((response) => {
                setTrashInfo({
                    ...trashInfo,
                    [tagID]: {
                      description: response.data.description
                    }
                }) // end fetching data
            });
        } // end if
    } // end getInfo


    function getLocations(tagID) {

        if (!isOpen[tagID] && !trashLocations[tagID]){ // only fetch data the first time user open the item
            axios.get(`${API_ENDPOINT}/trash-locations/${tagID}`, {
              headers: {
                'ngrok-skip-browser-warning': 'true' // Set the ngrok-skip-browser-warning header
              }
            }).then((response) => {
                console.log(response.data)
                setTrashLocations({
                    ...trashLocations,
                    [tagID]: [...response.data]
                }) // end fetching data
            });
        } // end if
        console.log(trashLocations)
    } // end getLocations


    return (
      <div className="Toggler">
        <h1 className='AITool-result-right-title'>{title}</h1>
        <ul className='AITool-result-recommended-list'>
          {data.map((d) => {
            return (
              <li key={d.id} className='AITool-result-right-toggle-item'>
                <button
                    className="AITool-result-toggle-title"
                    onClick={() => {
                    toggleOpen(d.id);
                    isInfo ? getInfo(d.id) : getLocations(d.id);
                  }}
                >
                  {d.name} {isOpen[d.id] ? '-' : '+'}
                </button>
                { 
                    isInfo 
                    ? <>{ isOpen[d.id] && trashInfo[d.id] && <p>{trashInfo[d.id].description}</p> }</> 
                    :
                    <>
                        {isOpen[d.id] && (
                            <div>{
                                trashLocations[d.id] && trashLocations[d.id].length > 0
                                ? trashLocations[d.id].map((locData, index) => <PreviewCampaign key={index} data={locData}/>)
                                : (<p>No location available</p>)
                            }</div>
                        )}
                    </>
                }
              </li>
            );
          })}
        </ul>
      </div>
    );
}


// export default Toggler;