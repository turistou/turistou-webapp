import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'antd'

import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'
import SkeletonForm from 'components/SkeletonForm/SkeletonForm'
import passengerActions from 'redux/passengerDetail/actions'
import excursionActions from 'redux/excursionDetail/actions'

@Form.create()
class PassengerForm extends Component {
  constructor(props) {
    super(props)

    const {
      getExcursion,
      match: { params },
    } = props
    getExcursion(params.excursionId)
  }

  saveStepHandler = (fields, doSuccess) => {
    const { form, saveStep } = this.props
    form.validateFields(fields, { first: true }, (error, values) => {
      if (!error) {
        saveStep(values)

        doSuccess()
      }
    })
  }

  render() {
    const { isLoading, currentStep, formSteps, form } = this.props

    return (
      <SkeletonForm isLoading={isLoading} rows={3}>
        <Form layout="vertical" className="passenger-form">
          {formSteps.map((x, i) => (
            <div key={x.title} style={{ display: currentStep === i ? 'block' : 'none' }}>
              <x.component form={form} />
              <div className="form-actions">
                <FormStepButtonsActions
                  lastStep={formSteps.length - 1}
                  validationFields={x.fields}
                  onSaveStep={this.saveStepHandler}
                  onSaveFormAndAddNew={this.onSaveFormAndAddNew}
                />
              </div>
            </div>
          ))}
        </Form>
      </SkeletonForm>
    )
  }
}

const mapStateToProps = ({ step }) => ({
  currentStep: step.current,
})

const mapDispatchToProps = dispatch => ({
  saveStep: values => dispatch({ type: passengerActions.SET_STATE, payload: values }),
  saveForm: values => dispatch({ type: passengerActions.SAVE_PASSENGER, payload: values }),
  getExcursion: excursionId =>
    dispatch({ type: excursionActions.GET_EXCURSION_BY_ID, id: excursionId }),
})

export default connect(mapStateToProps, mapDispatchToProps)(PassengerForm)
