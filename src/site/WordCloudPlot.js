import React, { createRef } from 'react'
import ReactGA from 'react-ga4'

import { saveSvgAsPng } from 'save-svg-as-png'

import { DownloadOutlined } from '@ant-design/icons'
import { Space, Button } from 'antd'
import { WordCloud } from '@ant-design/plots'

const returnFilename = () => {
  const date = (new Date()).getTime()
  return `word-cloud-nodejavascript-${date}.png`
}

const WordCloudPlot = ({ data }) => {
  if (!data) return null

  const config = {
    data,
    wordField: 'word',
    weightField: 'value',
    colorField: 'word',
    renderer: 'svg',
    wordStyle: {
      fontSize: [24, 96]
    },
    interactions: [
      {
        type: 'element-active'
      }
    ],
    random: () => 0.5,
    state: {
      active: {
        style: {
          lineWidth: 1
        }
      }
    }
  }

  const wordcloudRef = createRef()

  const handleSave = () => {
    ReactGA.event({
      category: 'UI',
      action: 'download png'
    })
    const svgElement = wordcloudRef.current.querySelector('svg')
    saveSvgAsPng(svgElement, returnFilename())
  }

  return (
    <Space direction='vertical' style={{ display: 'flex' }} size='large'>
      <Button type='primary' size='small' ghost icon={<DownloadOutlined />} onClick={handleSave}>
        Download PNG
      </Button>
      <span ref={wordcloudRef}>
        <WordCloud {...config} />
      </span>
    </Space>
  )
}

export default WordCloudPlot
