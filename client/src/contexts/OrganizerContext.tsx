import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext'
import axios from 'axios';

interface OrganizerContextProps {
  showOrganizerSignupForm: boolean;
  setShowOrganizerSignupForm: (showOrganizerSignupForm: boolean) => void;
  organizerID?: number;
  setOrganizerID: (organizerID: number) => void;
}

const OrganizerContext = createContext<OrganizerContextProps>({
  showOrganizerSignupForm: false,
  setShowOrganizerSignupForm: () => {},
  organizerID: 0,
  setOrganizerID: () => {},
});

interface OrganizerProviderProps {
    children: React.ReactNode;
  }


const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;


export const OrganizerProvider: React.FC<React.PropsWithChildren<OrganizerProviderProps>> = ({ children }) => {
    const [showOrganizerSignupForm, setShowOrganizerSignupForm] = useState(false);
    const [organizerID, setOrganizerID] = useState(0);
    const userID = localStorage.getItem('userID');
    const auth = useAuth();

    // verify organizer
    const verifyOrganizer = async () => {
        try {
            const result = await axios.get(`${API_ENDPOINT}/is-organizer/${userID}`, {
                headers: {
                    'ngrok-skip-browser-warning': true,
                },
            });

            if (result.data.success) {
                setOrganizerID(result.data.organizerID);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
      if (auth.isLoggedIn) {
          verifyOrganizer();
      }
    },);

    return (
        <OrganizerContext.Provider value={{ 
          showOrganizerSignupForm, 
          setShowOrganizerSignupForm, 
          organizerID, 
          setOrganizerID }}
        >
          {children}
        </OrganizerContext.Provider>
    );
};

export const useOrgan = (): OrganizerContextProps => useContext(OrganizerContext);