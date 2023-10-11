import React, { createContext, useContext, useState } from 'react';

interface LatLng {
  lat: number,
  lng: number,
};

interface MapItemsContextProps {
  newCampaignPosition: [any, any];
  setNewCampaignPosition: (showNewCampaignForm: [any, any]) => void;
  centerPosition: LatLng;
  setCenterPosition: (centerPosition: LatLng) => void;
  myPosition: any;
  setMyPosition: (myPosition: any) => void;
  mapInitialized: boolean;
  setMapInitialized: (mapInitialized: boolean) => void;
  canRecenter: boolean;
  setCanRecenter: (canRecenter: boolean) => void;
  zoomValue: number;
  setZoomValue: (zoomValue: number) => void;
  centerValue: LatLng;
  setCenterValue: (centerValue: LatLng) => void;
  searchResult: any;
  setSearchResult: (searchResult: any) => void;
  startPoint: LatLng;
  setStartPoint: (startPoint: LatLng) => void;
  endPoint: LatLng;
  setEndPoint: (endPoint: LatLng) => void;
  showDirection: boolean;
  setShowDirection: (showDirection: boolean) => void;
  showWelcomeToWhatEver: boolean;
  setShowWelcomeToWhatEver: (showWelcomeToWhatEver: boolean) => void;
  hiddenClass: string;
  setHiddenClass: (hiddenClass: string) => void;
}

const MapItemsContext = createContext<MapItemsContextProps>({
  newCampaignPosition: [undefined, undefined],
  setNewCampaignPosition: () => {},
  centerPosition: {lat: 10.8231, lng: 106.6297},
  setCenterPosition: () => {},
  myPosition: null,
  setMyPosition: () => {},
  mapInitialized: false,
  setMapInitialized: () => {},
  canRecenter: false,
  setCanRecenter: () => {},
  zoomValue: 13,
  setZoomValue: () => {},
  centerValue: {lat: 10.8231, lng: 106.6297},
  setCenterValue: () => {},
  searchResult: null,
  setSearchResult: () => {},
  startPoint: {lat: 10.8231, lng: 106.6297},
  setStartPoint: () => {},
  endPoint: {lat: 10.8231, lng: 106.6297},
  setEndPoint: () => {},
  showDirection: false,
  setShowDirection: () => {},
  showWelcomeToWhatEver: false,
  setShowWelcomeToWhatEver: () => {},
  hiddenClass: "hidden",
  setHiddenClass: () => {},
});

interface MapItemsProviderProps {
    children: React.ReactNode;
  }

export const MapItemsProvider: React.FC<React.PropsWithChildren<MapItemsProviderProps>> = ({ children }) => {
    const [newCampaignPosition, setNewCampaignPosition] = useState<[any, any]>([undefined, undefined]);
    const [centerPosition, setCenterPosition] = useState({lat: 10.8231, lng: 106.6297});
    const [myPosition, setMyPosition] = useState(null);
    const [mapInitialized, setMapInitialized] = useState(false);
    const [canRecenter, setCanRecenter] = useState(false);
    const [zoomValue, setZoomValue] = useState(13);
    const [centerValue, setCenterValue] = useState({lat: 10.8231, lng: 106.6297});  
    const [searchResult, setSearchResult] = useState(null);
    const [startPoint, setStartPoint] = useState({lat: 10.8231, lng: 106.6297});
    const [endPoint, setEndPoint] = useState({lat: 10.8231, lng: 106.6297});
    const [showDirection, setShowDirection] = useState(false);
    const [showWelcomeToWhatEver, setShowWelcomeToWhatEver] = useState(false);
    const [hiddenClass, setHiddenClass] = useState("hidden");

    return (
        <MapItemsContext.Provider value={{  newCampaignPosition, 
                                            setNewCampaignPosition,
                                            centerPosition,
                                            setCenterPosition,
                                            myPosition,
                                            setMyPosition,
                                            mapInitialized,
                                            setMapInitialized,
                                            canRecenter,
                                            setCanRecenter,
                                            zoomValue,
                                            setZoomValue,
                                            centerValue,
                                            setCenterValue,
                                            searchResult,
                                            setSearchResult,
                                            startPoint,
                                            setStartPoint,
                                            endPoint,
                                            setEndPoint,
                                            showDirection,
                                            setShowDirection,
                                            showWelcomeToWhatEver,
                                            setShowWelcomeToWhatEver,
                                            hiddenClass,
                                            setHiddenClass }}>
          {children}
        </MapItemsContext.Provider>
    );
};

export const useMapItems = (): MapItemsContextProps => useContext(MapItemsContext);