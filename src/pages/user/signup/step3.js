import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import styles from './style.module.scss'

@Form.create()
@connect(({ user }) => ({ user }))
class Complete extends Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    console.log(form)
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'user/COMPLETE',
          payload: values,
        })
      }
    })
  }

  render() {
    const {
      form,
      user: { fetching },
    } = this.props
    return (
      <div>
        <Helmet title="Sign up" />
        <div className={styles.title}>
          <h3>
            <strong>
              Por favor, complete seu cadastro para poder usufruir dos benefícios Turistou Organize
            </strong>
          </h3>
        </div>
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                <div className={styles.form}>
                  <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                    <Form.Item label="CEP">
                      {form.getFieldDecorator('zipcode', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, preencha o endereço completo da empresa',
                          },
                        ],
                      })(<Input size="default" />)}
                    </Form.Item>
                    <Form.Item label="Logradouro">
                      {form.getFieldDecorator('address', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, preencha o endereço completo da empresa',
                          },
                        ],
                      })(<Input size="default" />)}
                    </Form.Item>
                    <Form.Item label="Bairro">
                      {form.getFieldDecorator('area', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, preencha o endereço completo da empresa',
                          },
                        ],
                      })(<Input size="default" />)}
                    </Form.Item>
                    <Form.Item label="Número">
                      {form.getFieldDecorator('number', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, preencha o endereço completo da empresa',
                          },
                        ],
                      })(<Input size="default" type="number" />)}
                    </Form.Item>
                    <Form.Item label="Complemento">
                      {form.getFieldDecorator('complement', {
                        rules: [{ required: false }],
                      })(<Input size="default" />)}
                    </Form.Item>
                    <Form.Item label="UF">
                      {form.getFieldDecorator('fu', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, preencha o endereço completo da empresa',
                          },
                        ],
                      })(<Input size="default" />)}
                    </Form.Item>
                    <Form.Item label="Cidade">
                      {form.getFieldDecorator('city', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, preencha o endereço completo da empresa',
                          },
                        ],
                      })(<Input size="default" />)}
                    </Form.Item>
                    <div className="mb-3">
                      <Button
                        type="primary"
                        className="width-150 mr-4"
                        htmlType="submit"
                        loading={fetching}
                      >
                        Próxima etapa
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Complete
