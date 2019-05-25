import React, { Component } from 'react'
import { Row, Col, Form, Select, InputNumber, DatePicker, Button, Icon, Modal } from 'antd'

import { paymentType } from 'constants/options'

const dateFormat = 'DD/MM/YYYY'
const MAX_INSTALLMENT = 10
const Installment = ({ form, price, index }) => (
  <div>
    <Col md={6}>
      <Form.Item label="Vencimento da primeira parcela">
        {form.getFieldDecorator(`paymentFirstDue[${index}]`, {
          rules: [{ required: false }],
        })(<DatePicker size="default" format={dateFormat} />)}
      </Form.Item>
    </Col>
    <Col md={6}>
      <Form.Item label="Parcelas">
        {form.getFieldDecorator(`installmentAmount[${index}]`, {
          rules: [{ required: false }],
        })(
          <Select size="default">
            {[...Array(MAX_INSTALLMENT).keys()]
              .map(x => x + 1)
              .map(x => (
                <Select.Option key={x} value={x}>
                  {x === 1 ? (
                    'Á vista'
                  ) : (
                    <span>
                      {x}&times; ({(price / x).toFixed(2)})
                    </span>
                  )}
                </Select.Option>
              ))}
          </Select>,
        )}
      </Form.Item>
    </Col>
  </div>
)

class PaymentConditions extends Component {
  constructor() {
    super()

    this.state = { isInstallable: false }

    this.handleChangePaymentCondition = this.handleChangePaymentCondition.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove(id) {
    const { removePayment } = this.props
    Modal.error({
      title: 'Excluir pagamento?',
      content: 'Esta ação removerá o pagamento do histórico e não poderá ser desfeita!',
      okText: 'Sim',
      okType: 'danger',
      onOk: () => removePayment(id),
      okCancel: true,
      cancelText: 'Não',
    })
  }

  handleChangePaymentCondition(value) {
    // TODO: ???
    const filter = paymentType.filter(x => x.value === value)
    console.log('filter', filter)
    if (filter.length) {
      const { isInstallable } = filter[0]
      this.setState({ isInstallable })
    }
  }

  render() {
    const { form, index } = this.props
    const { isInstallable } = this.state

    return (
      <Row>
        <Col md={6}>
          <Form.Item label="Forma de pagamento">
            {form.getFieldDecorator(`paymentConditions[${index}]`, {
              rules: [{ required: false }],
            })(
              <Select size="default" onChange={this.handleChangePaymentCondition}>
                {paymentType.map(x => (
                  <Select.Option key={x.value} value={x.value} title={x.label}>
                    {x.label}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col md={4}>
          <Form.Item label="Valor">
            {form.getFieldDecorator(`paymentValue[${index}]`, {
              rules: [{ required: false }],
            })(<InputNumber precision={2} />)}
          </Form.Item>
        </Col>

        {isInstallable && <Installment {...this.props} price={230.0} />}

        <Col md={2} className="float-right">
          <Button
            type="danger"
            className="button-side-field float-right"
            onClick={() => this.handleRemove(index)}
          >
            <Icon type="delete" />
          </Button>
        </Col>
      </Row>
    )
  }
}

export default PaymentConditions
