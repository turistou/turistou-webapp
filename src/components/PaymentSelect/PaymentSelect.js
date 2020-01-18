import React, { useMemo } from 'react'
import { Select } from 'antd'

import style from './style.module.scss'

const defaultProps = {
  onChange: () => {},
  isPaid: false,
}

const PaymentSelect = ({ isPaid, onChange }) => {
  const options = useMemo(
    () => [
      {
        id: 1,
        description: 'Pago',
        value: 'paid',
        className: style.paid,
      },
      {
        id: 2,
        description: 'A Pagar',
        value: 'unpaid',
        className: style.unpaid,
      },
    ],
    [],
  )

  return (
    <Select
      defaultValue={isPaid ? 'paid' : 'unpaid'}
      className={isPaid ? style.paid : style.unpaid}
      onChange={onChange}
    >
      {options.map(option => (
        <Select.Option key={option.id} value={option.value} className={option.className}>
          {option.description}
        </Select.Option>
      ))}
    </Select>
  )
}

PaymentSelect.defaultProps = defaultProps

export default PaymentSelect
