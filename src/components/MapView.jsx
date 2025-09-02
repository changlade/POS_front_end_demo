import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import styled from 'styled-components'
import L from 'leaflet'
import { MapPin, HelpCircle, Calendar, Star } from 'lucide-react'
import { parisBusinesses, currentUser } from '../data/mockData'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const MapContainer_Styled = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
`

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #005EB8 0%, #00ACED 100%);
  color: white;
  padding: 20px 16px 16px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
`

const HeaderSubtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  opacity: 0.9;
`

const PointsBadge = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
  margin-left: auto;
`

const MapWrapper = styled.div`
  height: 100vh;
  width: 100%;
  padding-top: 100px;
  
  .leaflet-container {
    height: calc(100vh - 100px);
    width: 100%;
    filter: hue-rotate(180deg) saturate(0.4) brightness(0.9) contrast(1.2);
    border-radius: 0 0 16px 16px;
    overflow: hidden;
  }
  
  .leaflet-control-container {
    filter: none;
  }
  
  .leaflet-popup-content-wrapper,
  .leaflet-popup-tip {
    filter: none;
  }
`

const PopupContent = styled.div`
  min-width: 200px;
  padding: 8px;
`

const BusinessName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #002677;
`

const BusinessInfo = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
  
  ${props => props.$isCustomer ? `
    background: #54AD18;
    color: white;
  ` : `
    background: #F88806;
    color: white;
  `}
`

const LastPhotoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`

const MenuItems = styled.div`
  font-size: 12px;
  color: #005EB8;
  font-weight: 500;
`

const Legend = styled.div`
  position: absolute;
  bottom: 100px;
  left: 16px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 94, 184, 0.15);
  border: 1px solid rgba(0, 94, 184, 0.1);
  z-index: 1000;
  min-width: 140px;
`

const LegendTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #002677;
  margin-bottom: 12px;
  text-align: center;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const LegendIcon = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: bold;
  
  ${props => props.$type === 'customer' && `
    background: #54AD18;
  `}
  
  ${props => props.$type === 'unknown' && `
    background: #F88806;
  `}
`

// Custom icons for different business types
const createCustomIcon = (isCustomer, isOldData) => {
  const color = isCustomer ? '#54AD18' : '#F88806'
  const opacity = isOldData ? '0.8' : '1'
  const pulseAnimation = isCustomer === null ? 'animation: pulse 2s infinite;' : ''
  
  return L.divIcon({
    html: `
      <div style="
        background: ${color}; 
        opacity: ${opacity};
        width: 28px; 
        height: 28px; 
        border-radius: 50%; 
        border: 4px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 0 0 2px rgba(0,94,184,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        font-weight: bold;
        position: relative;
        z-index: 1000;
        ${pulseAnimation}
      ">
        ${isCustomer ? '✓' : '?'}
      </div>
      <style>
        @keyframes pulse {
          0% { box-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 0 0 0 rgba(248,136,6,0.7); }
          70% { box-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 0 0 10px rgba(248,136,6,0); }
          100% { box-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 0 0 0 rgba(248,136,6,0); }
        }
      </style>
    `,
    className: 'custom-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  })
}

const getDataAge = (lastPhotoDate) => {
  if (!lastPhotoDate) return null
  const now = new Date()
  const diffTime = Math.abs(now - lastPhotoDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

function MapView() {
  const [businesses] = useState(parisBusinesses)
  
  // Paris center coordinates
  const parisCenter = [48.8566, 2.3522]

  return (
    <MapContainer_Styled>
      <Header>
        <HeaderTitle>Danone Scout</HeaderTitle>
        <HeaderSubtitle>
          <span>Bonjour {currentUser.name.split(' ')[0]} 👋</span>
          <PointsBadge>
            <Star size={14} style={{ marginRight: '4px' }} />
            {currentUser.points} pts
          </PointsBadge>
        </HeaderSubtitle>
      </Header>

      <MapWrapper>
        <MapContainer
          center={parisCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            subdomains={['a','b','c','d']}
          />
          
          {businesses.map((business) => {
            const dataAge = getDataAge(business.lastPhotoDate)
            const isOldData = dataAge && dataAge > 30
            
            return (
              <Marker
                key={business.id}
                position={business.coordinates}
                icon={createCustomIcon(business.isDanoneCustomer, isOldData)}
              >
                <Popup>
                  <PopupContent>
                    <BusinessName>{business.name}</BusinessName>
                    <BusinessInfo>{business.address}</BusinessInfo>
                    
                    <StatusBadge $isCustomer={business.isDanoneCustomer}>
                      {business.isDanoneCustomer ? 'Danone Customer' : 'Unknown Status'}
                    </StatusBadge>
                    
                    {business.lastPhotoDate && (
                      <LastPhotoInfo>
                        <Calendar size={12} />
                        Last photo: {dataAge} days ago
                        {isOldData && ' (OLD DATA - More points!)'}
                      </LastPhotoInfo>
                    )}
                    
                    {business.menuItems.length > 0 && (
                      <MenuItems>
                        Danone waters: {business.menuItems.join(', ')}
                      </MenuItems>
                    )}
                    
                    {!business.isDanoneCustomer && (
                      <MenuItems style={{ color: '#F88806' }}>
                        💧 Take a photo to discover water products! (+100 pts)
                      </MenuItems>
                    )}
                  </PopupContent>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </MapWrapper>

      <Legend>
        <LegendTitle>💧 Water Scouting</LegendTitle>
        <LegendItem>
          <LegendIcon $type="customer">✓</LegendIcon>
          <span>Danone Customer</span>
        </LegendItem>
        <LegendItem>
          <LegendIcon $type="unknown">?</LegendIcon>
          <span>Unknown Status</span>
        </LegendItem>
      </Legend>
    </MapContainer_Styled>
  )
}

export default MapView
