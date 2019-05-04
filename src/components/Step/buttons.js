import React, { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

import actions from 'redux/step/actions'

class StepButtonsActions extends Component {
  constructor(props) {
    super(props)

    this.dispatchStep = this.dispatchStep.bind(this)
    this.dispatchStep(1)
  }

  dispatchStep(step) {
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { current: step },
    })
  }

  render() {
    const { current: step, lastStep } = this.props
    return (
      <div>
        <Button onClick={() => this.dispatchStep(step - 1)} disabled={step === 1}>
          Voltar
        </Button>
        <Button onClick={() => this.dispatchStep(step + 1)} disabled={step === lastStep}>
          Próximo
        </Button>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  current: store.step.current,
})

export default connect(mapStateToProps)(StepButtonsActions)
