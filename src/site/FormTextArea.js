import React, { useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'

import ReactGA from 'react-ga4'

import { Button, Form, Input, message } from 'antd'

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

  const [mutationWordCloudParagaraph, { error, data }] = useMutation(MUTATION_WORD_CLOUD_PARAGRAPH)

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

  const onFinish = ({ paragraph }) => {
    ReactGA.event({
      category: 'UI',
      action: 'onFinish submission'
    })

    mutationWordCloudParagaraph({
      variables: {
        wordCloudParagaraphInput: { paragraph }
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
        label='Paste paragraph(s)'
        name='paragraph'
      >
        <TextArea rows={8} />
      </Form.Item>

      <Button type='primary' htmlType='submit'>
        Submit
      </Button>

      <Button type='link' danger onClick={onClearForm}>
        Clear form
      </Button>

    </Form>

  )
}

export default FormTextArea
