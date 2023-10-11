import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ConfigProvider} from 'antd'
import { AuthProvider } from './auth/AuthContext';
import { OrganizerProvider } from './contexts/OrganizerContext';
import { CampaignProvider } from './contexts/CampaignContext';
import { MapItemsProvider } from './contexts/MapItemsContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#33BBC5',
          borderRadius: 8,

          // Alias Token
          colorBgContainer: '#FFFFFF',
        },
      }}
    >
      <AuthProvider>
        <OrganizerProvider>
          <CampaignProvider>
            <MapItemsProvider>
              <App />
            </MapItemsProvider>
          </CampaignProvider>
        </OrganizerProvider>
      </AuthProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
