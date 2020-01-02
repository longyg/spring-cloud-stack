import React, { Component } from 'react';
import { Table, Button, Icon, Checkbox } from 'semantic-ui-react';
import { injectIntl } from 'react-intl'

class DataTable extends Component {
  state = {
    selectStatus: 'no', // no, all, partial,
    dataItems: []
  }

  tableConfig = {
    compact: true,
    celled: true,
    striped: true,
    sortable: true,
    singleLine: true,
    size: 'small'
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    let currentData = []
    prevState.dataItems.forEach(item => {
      currentData.push(item.data)
    })
    // 当传入的data发生变化的时候，更新state
    if (data !== currentData) {
      let dataItems = []
      let rowIndex = prevState.dataItems.length
      data.forEach(i => {
        let find = false
        prevState.dataItems.forEach(item => {
          if (item.data.id === i.id) {
            dataItems.push(item)
            find = true
          }
        })
        if (!find) {
          dataItems.push({
            rowIndex: rowIndex,
            checked: false,
            data: i
          })
          rowIndex++
        }
      })
      return {
          ...prevState,
          dataItems: dataItems
      };
    }
    // 否则，对于state不进行任何操作
    return null;
  }

  dataItems = () => {
    const { data } = this.props
    let dataItems = []
    let rowIndex = 0
    data.forEach((item) => {
      dataItems.push({
        rowIndex: rowIndex,
        checked: false,
        data: item
      })
      rowIndex++
    })
    return dataItems
  }

  selectAll = (e, data) => {
    const { dataItems } = this.state
    dataItems.forEach(item => {
      item.checked = data.checked
    })
    this.setState({
      selectStatus: data.checked ? 'all' : 'no',
      dataItems: dataItems
    })
  }

  select = (e, data, item) => {
    const { dataItems } = this.state
    let selectedCount = 0
    dataItems.forEach(i => {
      if (i.rowIndex === item.rowIndex) {
        i.checked = data.checked
      }
      if (i.checked) {
        selectedCount++
      }
    })

    let selectStatus
    if (selectedCount === 0) {
      selectStatus = 'no'
    } else if (selectedCount === dataItems.length) {
      selectStatus = 'all'
    } else {
      selectStatus = 'partial'
    }
    this.setState({
      selectStatus: selectStatus,
      dataItems: dataItems
    })
  }

  isSelectAllChecked = () => {
    return this.state.selectStatus === 'all' ? true : false
  }

  isSelectAllIndeterminate = () => {
    return this.state.selectStatus === 'partial' ? true : false
  }

  dataTable = () => {
    const { config } = this.props
    let content = []
    if (config.headerActions) {
      let btnIndex = 0
      config.headerActions.forEach((action) => {
        content.push(
          <Button key={`header-action-btn-${btnIndex}`} basic size='small' 
            onClick={() => {action.onClick(this.state.dataItems)}}>
            <Icon color={action.iconColor} name={action.icon} />
            {this.props.intl.formatMessage({id: action.text})}
          </Button>
        )
        btnIndex++
      })
    }
    content.push(
      <Table key='table' {...this.tableConfig}>
        {this.tableHeader()}
        {this.tableBody()}
      </Table>
    )
    return content
  }

  tableHeader = () => {
    let headerCells = []
    let cellIndex = 0

    // 创建表头选择所有行的checkbox
    const { config } = this.props
    if (config.checkboxColumn) {
      headerCells.push(
        <Table.HeaderCell key={`header-${cellIndex}`} textAlign='center' verticalAlign='middle'>
          <Checkbox
            checked={this.isSelectAllChecked()}
            indeterminate={this.isSelectAllIndeterminate()}
            onChange={this.selectAll}></Checkbox>
        </Table.HeaderCell>
      )
      cellIndex++
    }

    // 创建数据列表头
    config.columnDefs.forEach((cell) => {
      headerCells.push(
        <Table.HeaderCell key={`header-${cellIndex}`}>
          {this.props.intl.formatMessage({id: cell['name']})}
        </Table.HeaderCell>
      )
      cellIndex++
    })

    // 创建操作列表头
    if (config.rowActions) {
      headerCells.push(
        <Table.HeaderCell key={`header-${cellIndex}`}>
          {this.props.intl.formatMessage({id: 'table-operation-title'})}
        </Table.HeaderCell>
      )
    }
    return (
      <Table.Header>
        <Table.Row>
          {headerCells}
        </Table.Row>
      </Table.Header>
    )
  }

  tableBody = () => {
    return (
      <Table.Body>
        {this.createTableRows()}
      </Table.Body>
    )
  }

  createTableRows = () => {
    const { dataItems } = this.state
    let rows = []
    dataItems.forEach(item => {
      rows.push(this.createTableRow(item))
    })
    return rows
  }

  createTableRow = (item) => {
    const { config } = this.props
    let rowCells = []
    let cellIndex = 0

    if (config.checkboxColumn) {
      rowCells.push(
        <Table.Cell key={`cell-${item.rowIndex}-${cellIndex}`} textAlign='center' verticalAlign='middle'>
          <Checkbox 
            checked={item.checked} 
            onChange={(e, data) => this.select(e, data, item)} />
        </Table.Cell>
      )
      cellIndex++
    }

    config.columnDefs.forEach((cell) => {
      const field = cell['field']
      rowCells.push(
        <Table.Cell key={`cell-${item.rowIndex}-${cellIndex}`}>{item.data[field]}</Table.Cell>
      )
      cellIndex++
    })

    if (config.rowActions) {
      rowCells.push(
        <Table.Cell key={`cell-${item.rowIndex}-${cellIndex}`}>
          {this.createActionBtns(config.rowActions, item)}
        </Table.Cell>
      )
    }
    return (
      <Table.Row key={`row-${item.rowIndex}`}>
        {rowCells}
      </Table.Row>
    )
  }

  createActionBtns = (rowActions, item) => {
    let actionBtns = []
    let btnIndex = 0
    rowActions.forEach((action) => {
      actionBtns.push(
        <Button key={`btn-${item.rowIndex}-${btnIndex}`} basic size='tiny' onClick={(e) => action.onClick(e, item)}>
          <Icon color={action.iconColor} name={action.icon} />
          {this.props.intl.formatMessage({id: action.text})}
        </Button>
      )
      btnIndex++
    })
    return actionBtns
  }

  render() {
    console.log('render table', this.props)
    return this.dataTable()
  }
}

export default injectIntl(DataTable)