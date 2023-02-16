import React from 'react'
import { Card, Space, Avatar, Typography } from 'antd'

const { Text, Title } = Typography

const SiteTitle = () => {
  return (
    <Space align='center' size='large' style={{ margin: 6 }}>
      <Avatar size={64} shape='square' src='https://res.cloudinary.com/nodejavascript-com/image/upload/v1676561965/word-cloud/wow_thrw2i.png' />
      <Title level={3}>word-cloud</Title>
    </Space>
  )
}

const SiteHeader = () => {
  return (
    <Card
      title={<SiteTitle />}
    >
      <Text italic>
        Generate an instant word cloud plot
      </Text>
    </Card>
  )
}

export default SiteHeader
