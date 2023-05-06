import React from 'react'

import { Col, Row, Statistic } from 'antd'

const WordCloudStats = ({ meta }) => {
  if (!meta) return null

  return (
    <Row>
      <Col span={8}>
        <Statistic title='Total words' value={meta.totalWordsCount} />
      </Col>
      <Col span={8}>
        <Statistic title='Unique words' value={meta.uniqueWordsCount} />
      </Col>
      <Col span={8}>
        <Statistic title='Unqiue words filtered' value={meta.uniqueWordsFilteredCount} />
      </Col>
    </Row>
  )
}

export default WordCloudStats
