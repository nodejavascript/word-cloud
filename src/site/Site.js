import React, { useState, useEffect } from 'react'

import { Space } from 'antd'

import WordCloudPlot from './WordCloudPlot'
import FormTextArea from './FormTextArea'

const Site = () => {
  const [wordCloudData, setWordCloudData] = useState()

  useEffect(() => {
    if (wordCloudData) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [wordCloudData])

  return (
    <Space direction='vertical' size='large' style={{ display: 'flex' }}>
      <WordCloudPlot wordCloudData={wordCloudData} />
      <FormTextArea setWordCloudData={setWordCloudData} />
    </Space>
  )
}

export default Site
