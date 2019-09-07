import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button, Modal, Skeleton } from 'antd'
import { DateTime } from 'luxon'
import actions from 'redux/excursion/actions'

import { EXCURSION_STATUS_ENUM } from 'constants/excursionStatus'
import { tableData as mockData } from 'mock/excursions'

class ExcursionList extends Component {
  constructor() {
    super()
    const tableData = mockData.map(x => {
      const occupancy = x.passengersAmout / x.capacity

      const WARNING = 0.75
      const DANGER = 0.33

      if (occupancy < DANGER) x.textStyle = 'text-danger'
      else if (occupancy < WARNING) x.textStyle = 'text-warning'
      else x.textStyle = 'text-success'

      return x
    })
    this.state = {
      isLoading: true,
      tableData,
    }

    this.applyFilterOnTable = this.applyFilterOnTable.bind(this)
  }

  componentDidMount() {
    // TODO: remove after resolve fetches
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 1500)
  }

  remove = id => {
    console.log('remove', id)
    // TODO: exclude...
    let { tableData } = this.state
    tableData = tableData.filter(x => x.id !== id)
    this.setState({ tableData })
  }

  handleRemove(id) {
    Modal.error({
      title: 'Deseja remover esta excursão?',
      content: 'Esta ação não poderá ser desfeita',
      okText: 'Sim',
      okType: 'danger',
      onOk: () => this.remove(id),
      okCancel: true,
      cancelText: 'Não',
    })
  }

  renderActionsButtons = id => (
    <div className="table-action-buttons">
      <Link to={`${id}/passenger`}>
        <Button ghost size="small" type="primary" title="Adicionar passageiro">
          <i className="fa fa-user-plus" />
        </Button>
      </Link>
      <Link to={`${id}/passenger/list`}>
        <Button ghost size="small" type="primary" title="Lista de passageiros">
          <i className="fa fa-users" />
        </Button>
      </Link>
      <Link to={`./${id}`}>
        <Button ghost size="small" type="primary">
          <i className="fa fa-pencil" />
        </Button>
      </Link>
      <Button ghost size="small" type="danger" onClick={() => this.handleRemove(id)}>
        <i className="fa fa-trash" />
      </Button>
    </div>
  )

  applyFilterOnTable(tableData) {
    const { filter } = this.props
    const { query = '', statusId = EXCURSION_STATUS_ENUM.nexties } = filter

    if (Number.isInteger(statusId) && EXCURSION_STATUS_ENUM.all !== statusId) {
      const today = DateTime.local()
      tableData = tableData.filter(excursion => {
        const regress = DateTime.fromISO(excursion.regress)

        switch (statusId) {
          case EXCURSION_STATUS_ENUM.done:
            return today > regress
          case EXCURSION_STATUS_ENUM.nexties:
            return today <= regress
          default:
            return true
        }
      })
    }
    if (query) {
      tableData = tableData.filter(excursion => {
        const destination = excursion.destination.toLowerCase()
        if (destination.includes(query.toLowerCase())) return true
        return query.split(' ').every(q => {
          const partialQuery = q.toLowerCase().trim()
          return destination.includes(partialQuery)
        })
      })
    }
    return tableData
  }

  render() {
    let { tableData } = this.state
    tableData = this.applyFilterOnTable(tableData)

    const tableColumns = [
      {
        dataIndex: 'id',
        key: 'id',
        render: this.renderActionsButtons,
      },
      {
        title: 'Destino',
        dataIndex: 'destination',
        key: 'destination',
      },
      {
        title: 'Lotação',
        dataIndex: 'passengersAmout',
        key: 'passengersAmout',
        className: 'text-center',
        render: (x, a) => (
          <span className={a.textStyle}>
            {x} / {a.capacity}
          </span>
        ),
      },
      {
        title: 'Partida',
        dataIndex: 'departure',
        key: 'departure',
        sorter: (a, b) => a.age - b.age,
        render: x => new Date(x).toLocaleDateString(),
      },
      {
        title: 'Retorno',
        dataIndex: 'regress',
        key: 'regress',
        render: x => new Date(x).toLocaleDateString(),
      },
    ]

    const { isLoading } = this.state
    return (
      <Skeleton active loading={isLoading}>
        <Table
          rowKey="id"
          className="utils__scrollTable"
          scroll={{ x: '100%' }}
          columns={tableColumns}
          dataSource={tableData}
          pagination={false}
        />
      </Skeleton>
    )
  }
}

const mapStateToProps = ({ excursion: { isLoading, filter, listPayload } }) => ({
  isLoading,
  filter,
  listPayload,
})

const mapDispatchToProps = dispatch => ({
  removeItem: () => dispatch({ type: actions.DELETE_DATA }),
  removeItemSuccess: () => dispatch({ type: actions.DELETE_DATA_SUCCESS }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExcursionList)
