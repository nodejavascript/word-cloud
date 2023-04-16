import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import ReactGA from 'react-ga4'

import { Button, Form, Input, message, Checkbox } from 'antd'

const { TextArea } = Input

const MUTATION_WORD_CLOUD_PARAGRAPH = gql`
  mutation mutationWordCloudParagaraph ($wordCloudParagaraphInput: WordCloudParagaraphInput!) {
    wordCloudParagaraph (wordCloudParagaraphInput: $wordCloudParagaraphInput ) {
      word
      value
    }
  }
`

const FormTextArea = ({ setWordCloudData }) => {
  const [form] = Form.useForm()
  const [reducewords, setReducewords] = useState(true)

  const [mutationWordCloudParagaraph, { error, data, loading }] = useMutation(MUTATION_WORD_CLOUD_PARAGRAPH)

  useEffect(() => {
    if (data?.wordCloudParagaraph) setWordCloudData(data.wordCloudParagaraph)
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

    mutationWordCloudParagaraph({
      variables: {
        wordCloudParagaraphInput: { paragraph, youtubeUri, reducewords }
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
      </Form.Item>

      <Button type='primary' htmlType='submit' loading={loading}>
        Submit
      </Button>

      <Button type='link' danger onClick={onClearForm}>
        Clear form
      </Button>

    </Form>

  )
}

export default FormTextArea
