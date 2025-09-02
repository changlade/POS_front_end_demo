import React, { useState } from 'react'
import styled from 'styled-components'
import { Trophy, Star, Camera, TrendingUp, Medal, Crown } from 'lucide-react'
import { mockUsers, currentUser, recentActivities } from '../data/mockData'

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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const Subtitle = styled.p`
  color: #666;
  font-size: 16px;
  margin: 0;
`

const TabContainer = styled.div`
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const Tab = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  background: ${props => props.$active ? 'linear-gradient(135deg, #005EB8 0%, #00ACED 100%)' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#666'};
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
`

const LeaderboardCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const PodiumContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 20px 0;
`

const PodiumPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  max-width: 100px;
`

const PodiumBar = styled.div`
  width: 100%;
  background: ${props => 
    props.$place === 1 ? 'linear-gradient(135deg, #F88806 0%, #EF3340 100%)' :
    props.$place === 2 ? 'linear-gradient(135deg, #57BAB7 0%, #00ACED 100%)' :
    'linear-gradient(135deg, #54AD18 0%, #00843D 100%)'
  };
  height: ${props => 
    props.$place === 1 ? '80px' :
    props.$place === 2 ? '60px' :
    '40px'
  };
  border-radius: 8px 8px 0 0;
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
  position: relative;
`

const PodiumIcon = styled.div`
  font-size: 24px;
  ${props => props.$place === 1 && `
    animation: bounce 2s infinite;
  `}
  
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

const PodiumUser = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #002677;
  margin-bottom: 4px;
`

const PodiumPoints = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #005EB8;
`

const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const UserRow = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: ${props => props.$isCurrentUser ? 'linear-gradient(135deg, #005EB8 0%, #00ACED 100%)' : '#f8f9fa'};
  color: ${props => props.$isCurrentUser ? 'white' : '#333'};
  border-radius: 12px;
  border: ${props => props.$isCurrentUser ? '2px solid #F88806' : 'none'};
  position: relative;
  transition: all 0.3s ease;
  
  ${props => props.$isCurrentUser && `
    box-shadow: 0 4px 15px rgba(0, 94, 184, 0.3);
  `}
`

const RankBadge = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.$isCurrentUser ? 'rgba(255, 255, 255, 0.2)' : '#005EB8'};
  color: ${props => props.$isCurrentUser ? 'white' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  margin-right: 16px;
`

const UserInfo = styled.div`
  flex: 1;
`

const UserName = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 4px;
`

const UserDepartment = styled.div`
  font-size: 12px;
  opacity: 0.8;
`

const UserStats = styled.div`
  text-align: right;
`

const Points = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 4px;
`

const PhotoCount = styled.div`
  font-size: 12px;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
`

const CurrentUserBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #F88806;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 12px;
  text-transform: uppercase;
`

const ActivityCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const ActivityTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #002677;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`

const ActivityAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #005EB8 0%, #00ACED 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
`

const ActivityInfo = styled.div`
  flex: 1;
`

const ActivityUser = styled.div`
  font-weight: 600;
  color: #002677;
  font-size: 14px;
`

const ActivityDetails = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`

const ActivityPoints = styled.div`
  background: #54AD18;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
`

function Leaderboard() {
  const [activeTab, setActiveTab] = useState('leaderboard')

  const sortedUsers = [...mockUsers].sort((a, b) => b.points - a.points)
  const topThree = sortedUsers.slice(0, 3)
  const restOfUsers = sortedUsers.slice(3)

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return 'Just now'
    if (hours === 1) return '1 hour ago'
    return `${hours} hours ago`
  }

  return (
    <Container>
      <Header>
        <Title>
          <Trophy size={32} />
          Leaderboard
        </Title>
        <Subtitle>Compete with your colleagues!</Subtitle>
      </Header>

      <TabContainer>
        <Tab 
          $active={activeTab === 'leaderboard'}
          onClick={() => setActiveTab('leaderboard')}
        >
          Rankings
        </Tab>
        <Tab 
          $active={activeTab === 'activity'}
          onClick={() => setActiveTab('activity')}
        >
          Recent Activity
        </Tab>
      </TabContainer>

      {activeTab === 'leaderboard' && (
        <>
          <LeaderboardCard>
            <PodiumContainer>
              {/* Second place */}
              <PodiumPlace>
                <PodiumBar $place={2}>
                  <PodiumIcon $place={2}>🥈</PodiumIcon>
                </PodiumBar>
                <PodiumUser>{topThree[1]?.name.split(' ')[0]}</PodiumUser>
                <PodiumPoints>{topThree[1]?.points} pts</PodiumPoints>
              </PodiumPlace>

              {/* First place */}
              <PodiumPlace>
                <PodiumBar $place={1}>
                  <PodiumIcon $place={1}>👑</PodiumIcon>
                </PodiumBar>
                <PodiumUser>{topThree[0]?.name.split(' ')[0]}</PodiumUser>
                <PodiumPoints>{topThree[0]?.points} pts</PodiumPoints>
              </PodiumPlace>

              {/* Third place */}
              <PodiumPlace>
                <PodiumBar $place={3}>
                  <PodiumIcon $place={3}>🥉</PodiumIcon>
                </PodiumBar>
                <PodiumUser>{topThree[2]?.name.split(' ')[0]}</PodiumUser>
                <PodiumPoints>{topThree[2]?.points} pts</PodiumPoints>
              </PodiumPlace>
            </PodiumContainer>

            <UsersList>
              {restOfUsers.map((user, index) => {
                const isCurrentUser = user.id === currentUser.id
                return (
                  <UserRow key={user.id} $isCurrentUser={isCurrentUser}>
                    {isCurrentUser && <CurrentUserBadge>You</CurrentUserBadge>}
                    <RankBadge $isCurrentUser={isCurrentUser}>
                      {index + 4}
                    </RankBadge>
                    <UserInfo>
                      <UserName>{user.name}</UserName>
                      <UserDepartment>{user.department}</UserDepartment>
                    </UserInfo>
                    <UserStats>
                      <Points>{user.points} pts</Points>
                      <PhotoCount>
                        <Camera size={12} />
                        {user.photosSubmitted} photos
                      </PhotoCount>
                    </UserStats>
                  </UserRow>
                )
              })}
            </UsersList>
          </LeaderboardCard>
        </>
      )}

      {activeTab === 'activity' && (
        <ActivityCard>
          <ActivityTitle>
            <TrendingUp size={24} />
            Recent Activity
          </ActivityTitle>
          {recentActivities.map((activity) => (
            <ActivityItem key={activity.id}>
              <ActivityAvatar>
                📸
              </ActivityAvatar>
              <ActivityInfo>
                <ActivityUser>{activity.userName}</ActivityUser>
                <ActivityDetails>
                  Took a photo at {activity.businessName}
                  <br />
                  {formatTimeAgo(activity.timestamp)}
                </ActivityDetails>
              </ActivityInfo>
              <ActivityPoints>+{activity.points}</ActivityPoints>
            </ActivityItem>
          ))}
        </ActivityCard>
      )}
    </Container>
  )
}

export default Leaderboard
