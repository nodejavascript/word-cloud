import React from 'react'

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
    if (!paragraph) return message.error('Submit something')
    setWordCloudData(returnAntDWordCloudData(paragraph))
  }

  const onClearForm = () => form.resetFields()

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
