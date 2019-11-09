import React, { Component } from 'react'
import { Button, Row, Col } from 'antd'
import StopAddress from './StopAddress'

class ExcursionStopPoint extends Component {
  constructor() {
    super()

    this.state = { stopPoints: [] }
  }

  addStopPoint = () => {
    const { stopPoints } = this.state
    const last = stopPoints.length ? stopPoints[stopPoints.length - 1] : 0
    stopPoints.push(last + 1)
    this.setState({ stopPoints })
  }

  removeStopPoint = index => {
    let { stopPoints } = this.state
    stopPoints = stopPoints.filter(x => index !== x)
    this.setState({ stopPoints })
  }

  render() {
    const { stopPoints } = this.state
    const { form } = this.props
    const { getFieldDecorator, getFieldValue } = form

    getFieldDecorator('stopPointsKeys', { initialValue: stopPoints })
    const stopPointsKeys = getFieldValue('stopPointsKeys')

    return (
      <Row>
        <Col>
          {stopPointsKeys.map((x, index) => (
            <StopAddress
              key={index.toString()}
              index={x}
              removeStopPoint={this.removeStopPoint}
              {...this.props}
            />
          ))}
        </Col>
        <Col xs={{ span: 16, offset: 4 }} md={{ span: 8, offset: 8 }}>
          <Button block type="dashed" onClick={this.addStopPoint}>
            <i className="fa fa-plus mr-3" />
            Adicionar ponto de parada
          </Button>
        </Col>
      </Row>
    )
  }
}
export default ExcursionStopPoint
