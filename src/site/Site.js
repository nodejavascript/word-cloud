import React, { useState } from 'react'

import { Space } from 'antd'

import WordCloudPlot from './WordCloudPlot'
import FormTextArea from './FormTextArea'

const Site = () => {
  const [wordCloudData, setWordCloudData] = useState()

  return (
    <Space direction='vertical' size='large' style={{ display: 'flex' }}>
      <WordCloudPlot wordCloudData={wordCloudData} />
      <FormTextArea setWordCloudData={setWordCloudData} />
    </Space>
  )
}

export default Site
