import React from 'react'
import ReactGA from 'react-ga4'

import { DownOutlined } from '@ant-design/icons'
import { Timeline, Card, Dropdown, Space, Button } from 'antd'

const Links = () => {
  const onClick = title => {
    ReactGA.event({
      category: 'UI',
      action: `roadmap link: ${title}`,
      label: title
    })
  }

  const links = [
    {
      title: 'the code',
      href: 'https://github.com/nodejavascript/word-cloud/tree/master/src'
    },
    {
      title: 'readme',
      href: 'https://github.com/nodejavascript/word-cloud'
    },
    {
      title: 'license (MIT)',
      href: 'https://github.com/nodejavascript/word-cloud/blob/master/LICENSE'
    }
  ]

  const menu = {
    items: [
      {
        key: 'group',
        type: 'group',
        label: '☞ contribute for fun'
      },
      ...links.map(({ title, href }) => {
        return {
          key: title,
          label: <Button type='link' href={href} target='_blank' onClick={() => onClick(title)}>{title}</Button>
        }
      })
    ]
  }

  return (
    <Dropdown
      menu={menu}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          github
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
}

const Roadmap = () => {
  const items = [
    {
      color: 'green',
      label: '2023-02-15',
      children: 'Create app'
    },
    {
      color: 'grey',
      label: 'todo',
      children: 'Integrate wordpos to add / remove weight to words https://www.npmjs.com/package/wordpos'
    },
    {
      color: 'grey',
      label: 'todo',
      children: 'create UI radios for getNouns, getVerbs, getAdjectives, getAdverbs'
    }
  ]

  return (
    <Card
      title='Roadmap'
      extra={<Links />}
    >
      <Timeline
        mode='left'
        items={items}
      />
    </Card>
  )
}

export default Roadmap
