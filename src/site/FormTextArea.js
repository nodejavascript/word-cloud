import React from 'react'
import ReactGA from 'react-ga4'

import { extract } from 'words-n-numbers'

import { Button, Form, Input, message } from 'antd'

const { TextArea } = Input

const returnAntDWordCloudData = paragraph => {
  const wordsArray = extract(paragraph)

  return [...new Set(wordsArray)].map(word => {
    return {
      word,
      value: wordsArray.filter(i => i === word).length
    }
  })
}

const FormTextArea = ({ setWordCloudData }) => {
  const [form] = Form.useForm()

  const onFinish = ({ paragraph }) => {
    if (!paragraph) {
      ReactGA.event({
        category: 'UI',
        action: 'onFinish error'
      })

      return message.error('Submit something')
    }

    ReactGA.event({
      category: 'UI',
      action: 'onFinish submission'
    })

    setWordCloudData(returnAntDWordCloudData(paragraph))
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
