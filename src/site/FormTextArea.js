import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import ReactGA from 'react-ga4'

import { Button, Form, Input, message, Checkbox } from 'antd'

const { TextArea } = Input

const MUTATION_WORD_CLOUD_PARAGRAPH = gql`
  mutation mutationWordCloudSubmission ($wordCloudSubmissionInput: WordCloudSubmissionInput!) {
    wordCloudSubmission (wordCloudSubmissionInput: $wordCloudSubmissionInput ) {
      meta {
        totalWordsCount
        uniqueWordsCount
        uniqueWordsFilteredCount
      }
      uniqueWordsFiltered {
        word
        value
      }
    }
  }
`

const FormTextArea = ({ setWordCloudData }) => {
  const [form] = Form.useForm()
  const [reducewords, setReducewords] = useState(true)
  const [removeAdjectives, setRemoveAdjectives] = useState(true)
  const [removeCommon, setRemoveCommon] = useState(true)

  const [mutationWordCloudSubmission, { error, data, loading }] = useMutation(MUTATION_WORD_CLOUD_PARAGRAPH)

  useEffect(() => {
    if (data?.wordCloudSubmission) setWordCloudData(data.wordCloudSubmission)
  }, [data, setWordCloudData])

  useEffect(() => {
    if (error?.message) {
      message.error(error.message)
      ReactGA.event({
        category: 'UI',
        action: 'onFinish error',
        label: error.message
      })
    }
  }, [error])

  const onFinish = ({ paragraph, youtubeUri }) => {
    ReactGA.event({
      category: 'UI',
      action: 'onFinish submission'
    })

    mutationWordCloudSubmission({
      variables: {
        wordCloudSubmissionInput: { paragraph, youtubeUri, reducewords, removeAdjectives, removeCommon }
      }
    })
  }

  const onClearForm = () => {
    ReactGA.event({
      category: 'UI',
      action: 'resetFields'
    })
    return form.resetFields()
  }

  return (
    <Form
      form={form}
      name='form_item_path'
      layout='vertical'
      onFinish={onFinish}
      autoComplete='off'
    >

      <Form.Item
        label='Youtube (link) to plot video transcript'
        name='youtubeUri'
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Paste paragraph(s)'
        name='paragraph'
      >
        <TextArea rows={5} />
      </Form.Item>

      <Form.Item>
        <Checkbox checked={reducewords} onClick={() => setReducewords(!reducewords)}>Reduce words</Checkbox>
        <Button type='link' onClick={() => window.open('https://github.com/Lissy93/remove-words/blob/master/words.txt', '_blank')}>more info...</Button>
      </Form.Item>

      <Form.Item>
        <Checkbox checked={removeAdjectives} onClick={() => setRemoveAdjectives(!removeAdjectives)}>Remove adjectives</Checkbox>
        <Button type='link' onClick={() => window.open('https://github.com/rgbkrk/adjectives/blob/master/index.js', '_blank')}>more info...</Button>
      </Form.Item>

      <Form.Item>
        <Checkbox checked={removeCommon} onClick={() => setRemoveCommon(!removeCommon)}>Remove common words </Checkbox>
        <Button type='link' onClick={() => window.open('https://github.com/jonschlinkert/common-words/blob/master/words.json', '_blank')}>more info...</Button>
      </Form.Item>

      <Button type='primary' htmlType='submit' loading={loading}>
        Submit
      </Button>

      <Button type='link' danger onClick={onClearForm}>
        Reset form
      </Button>

    </Form>

  )
}

export default FormTextArea
