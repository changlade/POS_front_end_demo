import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Camera as CameraIcon, Upload, MapPin, Star, CheckCircle, X, Edit3, Zap, Eye, AlertCircle } from 'lucide-react'
import { parisBusinesses, pointsSystem, currentUser, getRandomProductDetection, findNearestBusiness, getRandomMockLocation } from '../data/mockData'

const Container = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px 16px;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #002677;
  margin: 0 0 8px 0;
`

const Subtitle = styled.p`
  color: #666;
  font-size: 16px;
  margin: 0;
`

const CameraSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const CameraPlaceholder = styled.div`
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px dashed #005EB8;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #00ACED;
    background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%);
  }
`

const CameraIcon_Styled = styled(CameraIcon)`
  color: #005EB8;
  margin-bottom: 12px;
`

const CameraText = styled.div`
  color: #005EB8;
  font-weight: 600;
  text-align: center;
  line-height: 1.4;
`

const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`

const BusinessSelector = styled.div`
  margin-bottom: 24px;
`

const SelectorLabel = styled.label`
  display: block;
  font-weight: 600;
  color: #002677;
  margin-bottom: 8px;
  font-size: 16px;
`

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  color: #333;
  
  &:focus {
    outline: none;
    border-color: #005EB8;
  }
`

const LocationSection = styled.div`
  margin-bottom: 24px;
`

const LocationCard = styled.div`
  background: ${props => props.$status === 'detecting' ? 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' : 
                      props.$status === 'success' ? 'linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%)' :
                      'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)'};
  border: 2px solid ${props => props.$status === 'detecting' ? '#005EB8' : 
                                props.$status === 'success' ? '#54AD18' : '#EF3340'};
  border-radius: 12px;
  padding: 16px;
  position: relative;
`

const LocationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  gap: 8px;
  margin-bottom: 8px;
`

const LocationIcon = styled.div`
  font-size: 20px;
  ${props => props.$detecting && `
    animation: pulse 2s infinite;
  `}
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`

const LocationText = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$status === 'detecting' ? '#005EB8' : 
                    props.$status === 'success' ? '#00843D' : '#721c24'};
`

const DetectedBusinessCard = styled.div`
  background: white;
  border: 2px solid #54AD18;
  border-radius: 8px;
  padding: 12px;
  margin-top: 8px;
`

const BusinessRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DetectedBusinessDetails = styled.div`
  flex: 1;
`

const DetectedBusinessName = styled.div`
  font-weight: 700;
  color: #002677;
  font-size: 16px;
  margin-bottom: 4px;
`

const BusinessMeta = styled.div`
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
`

const DistanceBadge = styled.span`
  background: #54AD18;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
`

const OverrideButton = styled.button`
  background: #F88806;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #e07705;
  }
`

const BusinessInfo = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-top: 12px;
`

const BusinessName = styled.h3`
  margin: 0 0 8px 0;
  color: #002677;
  font-size: 18px;
`

const BusinessDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
`

const PointsPreview = styled.div`
  background: linear-gradient(135deg, #54AD18 0%, #00843D 100%);
  color: white;
  padding: 16px;
  border-radius: 12px;
  margin: 16px 0;
  text-align: center;
`

const PointsText = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
`

const PointsSubtext = styled.div`
  font-size: 12px;
  opacity: 0.9;
`

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #005EB8 0%, #00ACED 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 94, 184, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const SuccessModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`

const SuccessContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  max-width: 300px;
  width: 100%;
`

const SuccessIcon = styled(CheckCircle)`
  color: #54AD18;
  margin-bottom: 16px;
`

const SuccessTitle = styled.h2`
  color: #002677;
  margin: 0 0 8px 0;
  font-size: 24px;
`

const SuccessText = styled.p`
  color: #666;
  margin: 0 0 16px 0;
`

const SuccessPoints = styled.div`
  background: #54AD18;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
`

const CloseButton = styled.button`
  background: #005EB8;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`

const ProcessingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`

const ProcessingContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  max-width: 350px;
  width: 100%;
`

const ProcessingIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`

const ProcessingTitle = styled.h2`
  color: #002677;
  margin: 0 0 8px 0;
  font-size: 24px;
`

const ProcessingText = styled.p`
  color: #666;
  margin: 0 0 24px 0;
  font-size: 14px;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
`

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #005EB8 0%, #00ACED 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
  width: ${props => props.$progress}%;
`

const ProgressText = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 16px;
`

const ResultsModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`

const ResultsContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  max-width: 400px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`

const ResultsHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
`

const ResultsIcon = styled(CheckCircle)`
  color: #54AD18;
  margin-bottom: 16px;
`

const ResultsTitle = styled.h2`
  color: #002677;
  margin: 0 0 8px 0;
  font-size: 24px;
`

const ResultsSubtitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 14px;
`

const ProductCard = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 2px solid #005EB8;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 20px;
  }
`

const ProductsContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
`

const ProductCounter = styled.div`
  background: #54AD18;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
`

const ProductHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`

const ProductBrand = styled.div`
  background: #005EB8;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
`

const ProductName = styled.h3`
  color: #002677;
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`

const ProductDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
`

const ProductDescription = styled.div`
  font-size: 13px;
  color: #666;
  font-style: italic;
  margin-bottom: 16px;
  line-height: 1.4;
`

const ProductDetail = styled.div`
  font-size: 14px;
  color: #666;
`

const ProductLabel = styled.span`
  font-weight: 600;
  color: #002677;
`

const PriceSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  border: 2px dashed #54AD18;
`

const PriceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`

const PriceLabel = styled.div`
  font-weight: 600;
  color: #002677;
  display: flex;
  align-items: center;
  gap: 8px;
`

const DetectedPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #54AD18;
`

const ConfidenceScore = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
`

const PriceEditSection = styled.div`
  margin-top: 12px;
`

const PriceInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  
  &:focus {
    outline: none;
    border-color: #005EB8;
  }
`

const EditButton = styled.button`
  background: #F88806;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    background: #e07705;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`

const SecondaryButton = styled.button`
  flex: 1;
  background: #f8f9fa;
  color: #666;
  border: 2px solid #e0e0e0;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #e9ecef;
  }
`

const PrimaryButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #005EB8 0%, #00ACED 100%);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 94, 184, 0.3);
  }
`

function Camera() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedBusinessId, setSelectedBusinessId] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState('')
  const [progress, setProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [detectedProducts, setDetectedProducts] = useState([])
  const [editingPrices, setEditingPrices] = useState({})
  const [customPrices, setCustomPrices] = useState({})
  const [detectedBusiness, setDetectedBusiness] = useState(null)
  const [editingBusiness, setEditingBusiness] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState('detecting') // 'detecting', 'success', 'error'
  const fileInputRef = useRef(null)
  
  // Get user location on component mount
  React.useEffect(() => {
    detectUserLocation()
  }, [])
  
  const detectUserLocation = () => {
    setLocationStatus('detecting')
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })
          const nearest = findNearestBusiness(latitude, longitude)
          setDetectedBusiness(nearest)
          setLocationStatus('success')
        },
        (error) => {
          console.log('Geolocation error:', error)
          // Use mock location for demo
          const mockLocation = getRandomMockLocation()
          setUserLocation(mockLocation)
          const nearest = findNearestBusiness(mockLocation.lat, mockLocation.lng)
          setDetectedBusiness(nearest)
          setLocationStatus('success')
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      )
    } else {
      // Geolocation not supported, use mock location
      const mockLocation = getRandomMockLocation()
      setUserLocation(mockLocation)
      const nearest = findNearestBusiness(mockLocation.lat, mockLocation.lng)
      setDetectedBusiness(nearest)
      setLocationStatus('success')
    }
  }

  const selectedBusiness = detectedBusiness || parisBusinesses.find(b => b.id === parseInt(selectedBusinessId))

  const calculatePoints = (business) => {
    if (!business) return 0
    
    if (business.isDanoneCustomer === null) {
      return pointsSystem.newBusinessPhoto
    }
    
    if (!business.lastPhotoDate) {
      return pointsSystem.knownBusinessPhotoOld + pointsSystem.bonusOldData
    }
    
    const daysSinceLastPhoto = Math.floor((new Date() - business.lastPhotoDate) / (1000 * 60 * 60 * 24))
    
    if (daysSinceLastPhoto > 90) {
      return pointsSystem.knownBusinessPhotoOld + pointsSystem.bonusOldData
    } else if (daysSinceLastPhoto > 30) {
      return pointsSystem.knownBusinessPhotoOld
    } else {
      return pointsSystem.knownBusinessPhotoRecent
    }
  }

  const handlePhotoSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedPhoto(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!selectedPhoto || !selectedBusiness) return

    const points = calculatePoints(selectedBusiness)
    setEarnedPoints(points)
    
    // Start processing simulation
    setProcessing(true)
    setProgress(0)
    
    // Step 1: Uploading
    setProcessingStep('Uploading image...')
    await simulateProgress(0, 20, 1000)
    
    // Step 2: Processing with Databricks
    setProcessingStep('Analyzing image with Databricks AI...')
    await simulateProgress(20, 60, 2000)
    
    // Step 3: OCR and product detection
    setProcessingStep('Scanning for multiple Danone water products...')
    await simulateProgress(60, 85, 1500)
    
    // Step 4: Price extraction
    setProcessingStep('Extracting prices for detected products...')
    await simulateProgress(85, 100, 1000)
    
    // Generate detection results for multiple products
    const products = getRandomProductDetection()
    setDetectedProducts(products)
    
    // Initialize custom prices for all products
    const initialPrices = {}
    products.forEach(product => {
      initialPrices[product.id] = product.detectedPrice
    })
    setCustomPrices(initialPrices)
    
    setProcessing(false)
    setShowResults(true)
  }
  
  const simulateProgress = (startProgress, endProgress, duration) => {
    return new Promise(resolve => {
      const steps = 20
      const increment = (endProgress - startProgress) / steps
      const stepDuration = duration / steps
      let currentProgress = startProgress
      
      const interval = setInterval(() => {
        currentProgress += increment
        setProgress(Math.min(currentProgress, endProgress))
        
        if (currentProgress >= endProgress) {
          clearInterval(interval)
          resolve()
        }
      }, stepDuration)
    })
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    setSelectedPhoto(null)
    setSelectedBusinessId('')
    setEarnedPoints(0)
    setEditingBusiness(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  
  const handleCloseResults = () => {
    setShowResults(false)
    setDetectedProducts([])
    setEditingPrices({})
    setCustomPrices({})
  }
  
  const handleConfirmResults = () => {
    setShowResults(false)
    setShowSuccess(true)
    // Reset form
    setTimeout(() => {
      setSelectedPhoto(null)
      setSelectedBusinessId('')
      setDetectedProducts([])
      setEditingPrices({})
      setCustomPrices({})
      setEditingBusiness(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }, 100)
  }
  
  const handleEditPrice = (productId) => {
    setEditingPrices(prev => ({ ...prev, [productId]: true }))
  }
  
  const handleSavePrice = (productId) => {
    if (customPrices[productId]) {
      setDetectedProducts(prev => 
        prev.map(product => 
          product.id === productId 
            ? { ...product, detectedPrice: customPrices[productId] }
            : product
        )
      )
    }
    setEditingPrices(prev => ({ ...prev, [productId]: false }))
  }
  
  const handlePriceChange = (productId, price) => {
    setCustomPrices(prev => ({ ...prev, [productId]: price }))
  }

  const isSubmitDisabled = !selectedPhoto || (!detectedBusiness && !selectedBusinessId)

  return (
    <Container>
      <Header>
        <Title>📸 Scout Mission</Title>
        <Subtitle>Capture menu pictures to earn points!</Subtitle>
      </Header>

      <CameraSection>
        <CameraPlaceholder onClick={() => fileInputRef.current?.click()}>
          {selectedPhoto ? (
            <PreviewImage src={selectedPhoto} alt="Selected menu" />
          ) : (
            <>
              <CameraIcon_Styled size={48} />
              <CameraText>
                Tap to take a photo<br />
                or upload from gallery
              </CameraText>
            </>
          )}
          <FileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoSelect}
          />
        </CameraPlaceholder>
      </CameraSection>

      <LocationSection>
        <SelectorLabel>📍 Business Location</SelectorLabel>
        
        <LocationCard $status={locationStatus}>
          <LocationHeader>
            <LocationIcon $detecting={locationStatus === 'detecting'}>
              {locationStatus === 'detecting' ? '🔍' : 
               locationStatus === 'success' ? '✅' : '❌'}
            </LocationIcon>
            <LocationText $status={locationStatus}>
              {locationStatus === 'detecting' ? 'Detecting your location...' :
               locationStatus === 'success' ? 'Location detected' : 'Location detection failed'}
            </LocationText>
          </LocationHeader>
          
          {detectedBusiness && locationStatus === 'success' && (
            <DetectedBusinessCard>
              <BusinessRow>
                <DetectedBusinessDetails>
                  <DetectedBusinessName>{detectedBusiness.name}</DetectedBusinessName>
                  <BusinessMeta>
                    <span>{detectedBusiness.type}</span>
                    <DistanceBadge>{detectedBusiness.distance}m away</DistanceBadge>
                    <span style={{ 
                      color: detectedBusiness.isDanoneCustomer ? '#54AD18' : '#F88806',
                      fontWeight: '600'
                    }}>
                      {detectedBusiness.isDanoneCustomer ? '✓ Customer' : '? Unknown'}
                    </span>
                  </BusinessMeta>
                </DetectedBusinessDetails>
                <OverrideButton onClick={() => setEditingBusiness(!editingBusiness)}>
                  {editingBusiness ? 'Cancel' : 'Change'}
                </OverrideButton>
              </BusinessRow>
            </DetectedBusinessCard>
          )}
        </LocationCard>
        
        {editingBusiness && (
          <BusinessSelector style={{ marginTop: '16px' }}>
            <SelectorLabel>Override Detected Business</SelectorLabel>
            <Select
              value={selectedBusinessId}
              onChange={(e) => {
                setSelectedBusinessId(e.target.value)
                if (e.target.value) {
                  setEditingBusiness(false)
                }
              }}
            >
              <option value="">Choose a different business...</option>
              {parisBusinesses.map((business) => (
                <option key={business.id} value={business.id}>
                  {business.name} - {business.type}
                </option>
              ))}
            </Select>
          </BusinessSelector>
        )}

        {selectedBusiness && (
          <BusinessInfo>
            <BusinessName>{selectedBusiness.name}</BusinessName>
            <BusinessDetails>
              <DetailRow>
                <MapPin size={14} />
                {selectedBusiness.address}
              </DetailRow>
              <DetailRow>
                <span style={{ 
                  color: selectedBusiness.isDanoneCustomer ? '#54AD18' : '#F88806',
                  fontWeight: '600'
                }}>
                  {selectedBusiness.isDanoneCustomer ? '✓ Danone Customer' : '? Unknown Status'}
                </span>
              </DetailRow>
              {selectedBusiness.lastPhotoDate && (
                <DetailRow>
                  Last photo: {Math.floor((new Date() - selectedBusiness.lastPhotoDate) / (1000 * 60 * 60 * 24))} days ago
                </DetailRow>
              )}
              {selectedBusiness.distance && (
                <DetailRow>
                  Distance: {selectedBusiness.distance}m away
                </DetailRow>
              )}
            </BusinessDetails>

            <PointsPreview>
              <PointsText>
                <Star size={20} style={{ marginRight: '8px' }} />
                +{calculatePoints(selectedBusiness)} Points
              </PointsText>
              <PointsSubtext>
                {selectedBusiness.isDanoneCustomer === null 
                  ? 'New business discovery bonus!'
                  : calculatePoints(selectedBusiness) > 50
                    ? 'Old data bonus included!'
                    : 'Thanks for keeping data fresh!'
                }
              </PointsSubtext>
            </PointsPreview>
          </BusinessInfo>
        )}
      </LocationSection>

      <SubmitButton 
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        <Upload size={20} />
        Submit Photo
      </SubmitButton>

      {processing && (
        <ProcessingModal>
          <ProcessingContent>
            <ProcessingIcon>🤖</ProcessingIcon>
            <ProcessingTitle>Processing Image</ProcessingTitle>
            <ProcessingText>{processingStep}</ProcessingText>
            <ProgressBar>
              <ProgressFill $progress={progress} />
            </ProgressBar>
            <ProgressText>{Math.round(progress)}% Complete</ProgressText>
          </ProcessingContent>
        </ProcessingModal>
      )}
      
      {showResults && detectedProducts.length > 0 && (
        <ResultsModal>
          <ResultsContent>
            <ResultsHeader>
              <ResultsIcon size={48} />
              <ResultsTitle>
                {detectedProducts.length === 1 ? 'Water Product Detected!' : `${detectedProducts.length} Water Products Detected!`}
              </ResultsTitle>
              <ResultsSubtitle>
                Databricks AI has identified {detectedProducts.length === 1 ? 'a Danone water product' : `${detectedProducts.length} Danone water products`}
              </ResultsSubtitle>
            </ResultsHeader>
            
            {detectedProducts.length > 1 && (
              <ProductCounter>
                💧 {detectedProducts.length} different water products found
              </ProductCounter>
            )}
            
            <ProductsContainer>
              {detectedProducts.map((product, index) => (
                <ProductCard key={product.id}>
                  <ProductHeader>
                    <ProductBrand>{product.brand}</ProductBrand>
                    <ProductName>{product.productName}</ProductName>
                  </ProductHeader>
                  
                  <ProductDetails>
                    <ProductDetail>
                      <ProductLabel>Category:</ProductLabel><br />
                      {product.category}
                    </ProductDetail>
                    <ProductDetail>
                      <ProductLabel>Size:</ProductLabel><br />
                      {product.size}
                    </ProductDetail>
                  </ProductDetails>
                  
                  {product.description && (
                    <ProductDescription>
                      {product.description}
                    </ProductDescription>
                  )}
                  
                  <PriceSection>
                    <PriceHeader>
                      <PriceLabel>
                        <Eye size={16} />
                        Detected Price
                      </PriceLabel>
                      {!editingPrices[product.id] && (
                        <EditButton onClick={() => handleEditPrice(product.id)}>
                          <Edit3 size={12} />
                          Edit
                        </EditButton>
                      )}
                    </PriceHeader>
                    
                    {editingPrices[product.id] ? (
                      <PriceEditSection>
                        <PriceInput
                          type="text"
                          value={customPrices[product.id] || product.detectedPrice}
                          onChange={(e) => handlePriceChange(product.id, e.target.value)}
                          placeholder="Enter correct price (e.g., €4.50)"
                          autoFocus
                        />
                        <ButtonGroup style={{ marginTop: '12px' }}>
                          <SecondaryButton onClick={() => setEditingPrices(prev => ({ ...prev, [product.id]: false }))}>
                            Cancel
                          </SecondaryButton>
                          <PrimaryButton onClick={() => handleSavePrice(product.id)}>
                            Save Price
                          </PrimaryButton>
                        </ButtonGroup>
                      </PriceEditSection>
                    ) : (
                      <>
                        <DetectedPrice>{product.detectedPrice}</DetectedPrice>
                        <ConfidenceScore>
                          Confidence: {Math.round(product.confidence * 100)}%
                        </ConfidenceScore>
                      </>
                    )}
                  </PriceSection>
                </ProductCard>
              ))}
            </ProductsContainer>
            
            <ButtonGroup>
              <SecondaryButton onClick={handleCloseResults}>
                <X size={16} style={{ marginRight: '8px' }} />
                Retake Photo
              </SecondaryButton>
              <PrimaryButton onClick={handleConfirmResults}>
                <Zap size={16} style={{ marginRight: '8px' }} />
                Confirm & Earn {earnedPoints} pts
              </PrimaryButton>
            </ButtonGroup>
          </ResultsContent>
        </ResultsModal>
      )}
      
      {showSuccess && (
        <SuccessModal>
          <SuccessContent>
            <SuccessIcon size={64} />
            <SuccessTitle>Success!</SuccessTitle>
            <SuccessText>
              Your photo and price data have been saved successfully!
              {detectedProducts.length > 0 && (
                <><br /><br />
                {detectedProducts.length === 1 ? (
                  <><strong>{detectedProducts[0].productName}</strong> at <strong>{detectedProducts[0].detectedPrice}</strong></>
                ) : (
                  <><strong>{detectedProducts.length} water products</strong> detected and saved with prices</>
                )}
                </>
              )}
            </SuccessText>
            <SuccessPoints>+{earnedPoints} Points Earned!</SuccessPoints>
            <CloseButton onClick={handleCloseSuccess}>
              Continue
            </CloseButton>
          </SuccessContent>
        </SuccessModal>
      )}
    </Container>
  )
}

export default Camera
