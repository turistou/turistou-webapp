import React, { Component } from 'react'
import { Row, Col, InputNumber, Input, Switch, Button, Divider } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

class Price extends Component {
  render() {
    const { form, removePrice, data } = this.props
    const { key, id, description, price, ageInitial, ageFinal } = data

    form.getFieldDecorator(`ticketPrices[${key}].id`, { initialValue: id })

    return (
      <div>
        <Row>
          <Col xs={24} sm={16} md={8}>
            <FormItem label="Tipo de passagem">
              {form.getFieldDecorator(`ticketDescription[${key}]`, {
                initialValue: description,
                rules: [{ required: false }],
              })(<Input size="default" maxLength={30} />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={8} md={4}>
            <FormItem label="Preço">
              {form.getFieldDecorator(`ticketPrice[${key}]`, {
                initialValue: price,
                rules: [{ required: false }],
              })(<InputNumber size="default" maxLength={5} />)}
            </FormItem>
          </Col>

          <Col xs={5} sm={3} md={2}>
            <FormItem label="De">
              {form.getFieldDecorator(`isFrom[${key}]`, {
                valuePropName: 'checked',
                initialValue: !!ageInitial,
                rules: [{ required: false }],
              })(<Switch size="small" />)}
            </FormItem>
          </Col>
          <Col xs={19} sm={7} md={3}>
            <FormItem label="Idade">
              {form.getFieldDecorator(`ageInitial[${key}]`, {
                initialValue: ageInitial,
                rules: [{ required: false }],
              })(<InputNumber onClick={this.handleAbleFromAge} size="default" maxLength={6} />)}
            </FormItem>
          </Col>
          <Col xs={5} sm={{ span: 3, offset: 1 }} md={{ span: 2, offset: 0 }}>
            <FormItem label="até">
              {form.getFieldDecorator(`untilAge[${key}]`, {
                valuePropName: 'checked',
                initialValue: !!ageFinal,
                rules: [{ required: false }],
              })(<Switch size="small" />)}
            </FormItem>
          </Col>
          <Col xs={15} sm={7} md={3}>
            <FormItem label="Idade">
              {form.getFieldDecorator(`ageFinal[${key}]`, {
                initialValue: ageFinal,
                rules: [{ required: false }],
              })(<InputNumber size="default" maxLength={3} />)}
            </FormItem>
          </Col>
          <Col xs={4} sm={3} md={2}>
            <Button type="danger" className="button-side-field" onClick={() => removePrice(key)}>
              <i className="fa fa-trash" />
            </Button>
          </Col>
        </Row>
        <Divider dashed />
      </div>
    )
  }
}
export default Price
