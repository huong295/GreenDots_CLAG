import React, { createContext, useContext, useState } from 'react';


interface CampaignProps {
  campaignName: string,
  receiveItems: string[],
  organizerName: string,
  address: string,
  openHour: string,
  closeHour: string,
  startDate: string,
  endDate: string,
  receiveGifts: string,
  organizerID: number,
  campaignID: number,
  lat: number,
  long: number,
  averageRating: number,
  icon?: any,
}

interface CampaignContextProps {
  showNewCampaignForm: boolean;
  setShowNewCampaignForm: (showNewCampaignForm: boolean) => void;
  showEditCampaignForm: boolean;
  setShowEditCampaignForm: (showEditCampaignForm: boolean) => void;
  campaigns: CampaignProps[];
  setCampaigns: (campaigns: CampaignProps[]) => void;
  changedCampaigns: CampaignProps[];
  setChangedCampaigns: (changedCampaigns: CampaignProps[]) => void;
  newCampaign: CampaignProps;
  setNewCampaign: (newCampaign: CampaignProps) => void;
}

const CampaignContext = createContext<CampaignContextProps>({
  showNewCampaignForm: false,
  setShowNewCampaignForm: () => {},
  showEditCampaignForm: false,
  setShowEditCampaignForm: () => {},
  campaigns: [],
  setCampaigns: () => {},
  changedCampaigns: [],
  setChangedCampaigns: () => {},
  newCampaign: {} as CampaignProps,
  setNewCampaign: () => {},
});

interface CampaignProviderProps {
    children: React.ReactNode;
  }

export const CampaignProvider: React.FC<React.PropsWithChildren<CampaignProviderProps>> = ({ children }) => {
    const [showNewCampaignForm, setShowNewCampaignForm] = useState(false);
    const [showEditCampaignForm, setShowEditCampaignForm] = useState(false);
    const [campaigns, setCampaigns] = useState<CampaignProps[]>([]);
    const [changedCampaigns, setChangedCampaigns] = useState<CampaignProps[]>([]);
    const [newCampaign, setNewCampaign] = useState<CampaignProps>({} as CampaignProps);

    return (
        <CampaignContext.Provider value={{ showNewCampaignForm,   
                                            setShowNewCampaignForm, 
                                            showEditCampaignForm, 
                                            setShowEditCampaignForm,
                                            campaigns,
                                            setCampaigns,
                                            changedCampaigns,
                                            setChangedCampaigns,
                                            newCampaign,
                                            setNewCampaign }}>
          {children}
        </CampaignContext.Provider>
    );
};

export const useCampaign = (): CampaignContextProps => useContext(CampaignContext);