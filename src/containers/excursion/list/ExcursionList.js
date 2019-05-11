import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button, Icon, Modal } from 'antd'
import { DateTime } from 'luxon'

import { EXCURSION_STATUS_ENUM } from 'constants/excursionStatus'
import { tableData as mockData } from 'mock/excursions'

class ExcursionList extends Component {
  constructor() {
    super()
    const tableData = mockData.map(x => {
      if (!x.vacacy) {
        x.vacacy = 'Sem vagas'
        x.textStyle = 'font-italic'
      } else if (x.vacacy / x.capacity > 0.75) x.textStyle = 'text-danger'
      else if (x.vacacy / x.capacity > 0.33) x.textStyle = 'text-warning'
      else x.textStyle = 'text-success'

      return x
    })
    this.state = { tableData }

    this.applyFilterOnTable = this.applyFilterOnTable.bind(this)
  }

  delete = id => {
    console.log('delete', id)
    // TODO: exclude...
    let { tableData } = this.state
    tableData = tableData.filter(x => x.id !== id)
    this.setState({ tableData })
  }

  handleDelete(id) {
    Modal.error({
      title: 'Deseja excluir esta excursão?',
      content: 'Esta ação não podera ser desfeita',
      okText: 'Sim',
      okType: 'danger',
      onOk: () => this.delete(id),
      okCancel: true,
      cancelText: 'Não',
    })
  }

  renderActionsButtons = id => (
    <div className="table-action-buttons">
      <Link to={`${id}/passenger`}>
        <Button ghost size="small" type="primary" title="Adicionar passageiro">
          <Icon type="user-add" />
        </Button>
      </Link>
      <Link to={`${id}/passenger/list`}>
        <Button ghost size="small" type="primary" title="Lista de passageiros">
          <Icon type="usergroup-add" />
        </Button>
      </Link>
      <Button ghost size="small" type="primary">
        <Icon type="edit" />
      </Button>
      <Button ghost size="small" type="danger" onClick={() => this.handleDelete(id)}>
        <Icon type="delete" />
      </Button>
    </div>
  )

  applyFilterOnTable(tableData) {
    const { query, statusId } = this.props

    if (Number.isInteger(statusId) && EXCURSION_STATUS_ENUM.all !== statusId) {
      const today = DateTime.local()
      tableData = tableData.filter(excursion => {
        const departure = DateTime.fromISO(excursion.departure)
        const regress = DateTime.fromISO(excursion.regress)

        switch (statusId) {
          case EXCURSION_STATUS_ENUM.current:
            return departure <= today && today <= regress
          case EXCURSION_STATUS_ENUM.done:
            return today >= regress
          case EXCURSION_STATUS_ENUM.nexties:
            return today <= departure
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
        title: 'Vagas',
        dataIndex: 'vacacy',
        key: 'vacacy',
        render: (x, a) => (
          <span className={a.textStyle}>
            {x} / {a.capacity}
          </span>
        ),
      },
      {
        title: 'Destino',
        dataIndex: 'destination',
        key: 'destination',
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

    return (
      <Table
        rowKey="id"
        className="utils__scrollTable"
        scroll={{ x: '100%' }}
        columns={tableColumns}
        dataSource={tableData}
        pagination={false}
      />
    )
  }
}

const mapStateToProps = state => ({
  statusId: state.excursion.statusId,
  query: state.excursion.query,
})

export default connect(mapStateToProps)(ExcursionList)
