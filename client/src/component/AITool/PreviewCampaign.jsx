import React from "react";
import { Button } from "./Button";
import { ElementTrashTag } from "./ElementTrashTag";
import "./styles.css";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

export const PreviewCampaign = ({ data }) => {
    return (
        <div className="preview-campaign">
            {
                data.avatar
                ? (<img src={`${API_ENDPOINT}/image/${data.avatar}`}/>)
                : (<div className="campaign-avatar" /> )
            }
            <div className="preview-campaign-component">
                <div className="header">
                    <div className="div">
                        <div className="text-wrapper">{data['CampaignName'] ? data['CampaignName'] : 'Campaign name'}</div>
                    </div>
                    <div className="buttons">
                        <Button
                            className="button-primary-instance"
                            labelClassName="design-preview-campaign-component-instance-node"
                            text="↳"
                        />
                        <Button 
                            className="button-primary-2" 
                            labelClassName="button-primary-3" 
                            text="⭐"
                        />
                        <Button 
                            className="button-more" 
                            text='More'
                        />
                    </div>
                </div>
                <div className="frame">
                    <p className="p">
                        <span className="span">Address: </span>
                        <span className="text-wrapper-3">
                            {
                                data['Address'] 
                                ? data['Address'] 
                                : 'Street, Ward, District, Province, Country'
                            }
                        </span>
                    </p>
                </div>
                <div className="frame">
                    <p className="time">
                        <span className="span">Time: </span>
                        <span className="text-wrapper-3">
                            from {
                                data['StartDate'] 
                                ? data['StartDate'] 
                                : '17/6/2023'
                            } to {
                                data['EndDate'] 
                                ? data['EndDate'] 
                                : '17/10/2023'
                            }                            
                        </span>
                    </p>
                </div>
                <div className="frame">
                    <p className="p">
                        <span className="span">Working hour: </span>
                        <span className="text-wrapper-3">
                            {
                                data['WorkingHour'] 
                                ? data['WorkingHour'] 
                                : '13:00 - 15:00'
                            }
                        </span>
                    </p>
                </div>
                <div className="frame">
                    <p className="gift-s">
                        <span className="span">Gift(s): </span>
                        <span className="text-wrapper-3"> 
                            {
                                data['Description'] 
                                ? data['Description'].split('\n Gift: ')[1]
                                : 'Notebooks and pen'
                            }
                        </span>
                    </p>
                </div>
                {/* <div className="accepted-trash">
                    <div className="accepted-trash-2">Accepted trash: </div>
                    <div className="tags">
                        {
                            data.trashTags 
                            ? data.trashTags.map((tag) => <ElementTrashTag className="element-trash-tag-instance" text="{tag}" />)
                            : (
                                <>
                                    <ElementTrashTag className="element-trash-tag-instance" text="Paper" />
                                    <ElementTrashTag className="element-trash-tag-instance" text="Bottles" />
                                </>
                            )
                        }
                    </div>
                </div> */}
            </div>
        </div>
    );
};
