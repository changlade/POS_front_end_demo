import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import MapView from './components/MapView'
import Camera from './components/Camera'
import Leaderboard from './components/Leaderboard'
import Rules from './components/Rules'
import Navigation from './components/Navigation'

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
  max-width: 430px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`

const ContentArea = styled.div`
  padding-bottom: 80px;
  min-height: calc(100vh - 80px);
`

function App() {
  return (
    <Router>
      <AppContainer>
        <ContentArea>
          <Routes>
            <Route path="/" element={<MapView />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/rules" element={<Rules />} />
          </Routes>
        </ContentArea>
        <Navigation />
      </AppContainer>
    </Router>
  )
}

export default App
