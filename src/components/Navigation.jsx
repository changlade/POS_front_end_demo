import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Map, Camera, Trophy, BookOpen } from 'lucide-react'

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  background: #FFFFFF;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${props => props.$isActive ? '#005EB8' : '#666'};
  transition: color 0.2s ease;
  padding: 8px 12px;
  border-radius: 8px;
  
  &:hover {
    color: #005EB8;
  }
`

const NavIcon = styled.div`
  margin-bottom: 4px;
`

const NavLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Map, label: 'Map' },
    { path: '/camera', icon: Camera, label: 'Camera' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/rules', icon: BookOpen, label: 'Rules' }
  ]

  return (
    <NavContainer>
      {navItems.map(({ path, icon: Icon, label }) => (
        <NavItem 
          key={path} 
          to={path} 
          $isActive={location.pathname === path}
        >
          <NavIcon>
            <Icon size={20} />
          </NavIcon>
          <NavLabel>{label}</NavLabel>
        </NavItem>
      ))}
    </NavContainer>
  )
}

export default Navigation
