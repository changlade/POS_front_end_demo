import React from 'react'
import styled from 'styled-components'
import { BookOpen, Star, Trophy, Camera, MapPin, Award, Lightbulb } from 'lucide-react'
import { gameRules, pointsSystem } from '../data/mockData'

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

const RulesCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #002677;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`

const RulesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const RuleItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`

const RuleIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #005EB8 0%, #00ACED 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
`

const RuleText = styled.div`
  flex: 1;
  color: #333;
  font-size: 14px;
  line-height: 1.5;
`

const PointsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
`

const PointsItem = styled.div`
  background: linear-gradient(135deg, #54AD18 0%, #00843D 100%);
  color: white;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
`

const PointsValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
`

const PointsLabel = styled.div`
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.3;
`

const TipsCard = styled.div`
  background: linear-gradient(135deg, #F3D03E 0%, #F88806 100%);
  color: #002677;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
`

const TipTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`

const TipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const TipItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  line-height: 1.5;
`

const TipBullet = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #002677;
  margin-top: 8px;
  flex-shrink: 0;
`

const ContactCard = styled.div`
  background: linear-gradient(135deg, #005EB8 0%, #00ACED 100%);
  color: white;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
`

const ContactTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px 0;
`

const ContactText = styled.p`
  margin: 0 0 16px 0;
  opacity: 0.9;
  font-size: 14px;
`

const ContactButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
`

const iconMapping = {
  'Photo Guidelines': Camera,
  'Points System': Star,
  'Leaderboard': Trophy,
  'Best Practices': Award
}

function Rules() {
  return (
    <Container>
      <Header>
        <Title>
          <BookOpen size={32} />
          Game Rules
        </Title>
        <Subtitle>Learn how to maximize your points!</Subtitle>
      </Header>

      {gameRules.map((section, index) => {
        const IconComponent = iconMapping[section.title] || BookOpen
        
        return (
          <RulesCard key={index}>
            <SectionTitle>
              <IconComponent size={24} />
              {section.title}
            </SectionTitle>
            
            {section.title === 'Points System' ? (
              <>
                <PointsGrid>
                  <PointsItem>
                    <PointsValue>{pointsSystem.newBusinessPhoto}</PointsValue>
                    <PointsLabel>New Business Discovery</PointsLabel>
                  </PointsItem>
                  <PointsItem>
                    <PointsValue>{pointsSystem.knownBusinessPhotoOld}</PointsValue>
                    <PointsLabel>Old Data Update (30+ days)</PointsLabel>
                  </PointsItem>
                  <PointsItem>
                    <PointsValue>{pointsSystem.knownBusinessPhotoRecent}</PointsValue>
                    <PointsLabel>Recent Data Update</PointsLabel>
                  </PointsItem>
                  <PointsItem>
                    <PointsValue>+{pointsSystem.bonusOldData}</PointsValue>
                    <PointsLabel>Very Old Data Bonus (90+ days)</PointsLabel>
                  </PointsItem>
                </PointsGrid>
                
                <RulesList style={{ marginTop: '16px' }}>
                  {section.rules.map((rule, ruleIndex) => (
                    <RuleItem key={ruleIndex}>
                      <RuleIcon>{ruleIndex + 1}</RuleIcon>
                      <RuleText>{rule}</RuleText>
                    </RuleItem>
                  ))}
                </RulesList>
              </>
            ) : (
              <RulesList>
                {section.rules.map((rule, ruleIndex) => (
                  <RuleItem key={ruleIndex}>
                    <RuleIcon>✓</RuleIcon>
                    <RuleText>{rule}</RuleText>
                  </RuleItem>
                ))}
              </RulesList>
            )}
          </RulesCard>
        )
      })}

      <TipsCard>
        <TipTitle>
          <Lightbulb size={24} />
          Pro Tips
        </TipTitle>
        <TipsList>
          <TipItem>
            <TipBullet />
            <span>Look for businesses with orange question marks - they offer the highest points!</span>
          </TipItem>
          <TipItem>
            <TipBullet />
            <span>Check the "last photo" date on known businesses - older data means more points.</span>
          </TipItem>
          <TipItem>
            <TipBullet />
            <span>Take clear, well-lit photos that show all menu items clearly.</span>
          </TipItem>
          <TipItem>
            <TipBullet />
            <span>Visit different neighborhoods to discover new Danone partner locations.</span>
          </TipItem>
          <TipItem>
            <TipBullet />
            <span>Check the leaderboard regularly to stay motivated and competitive!</span>
          </TipItem>
        </TipsList>
      </TipsCard>

      <ContactCard>
        <ContactTitle>Need Help?</ContactTitle>
        <ContactText>
          Have questions about the game or encountered a technical issue? 
          Our support team is here to help you succeed!
        </ContactText>
        <ContactButton>
          Contact Support
        </ContactButton>
      </ContactCard>
    </Container>
  )
}

export default Rules
