import React, { Component } from 'react';
import { Table, Button, Icon, Checkbox } from 'semantic-ui-react';
import { injectIntl } from 'react-intl'
import { intersectionWith, isEqualWith, isEqual, differenceBy, last, find } from 'lodash';

class DataTable extends Component {
  state = {
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

  static customizer = (obj1, obj2) => {
    if (obj1.data.id === obj2.id) {
      return true
    }
    return false
  }

  static isEqualCustom (obj1, obj2) {
    return isEqualWith(obj1, obj2, DataTable.customizer)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps
    const { dataItems } = prevState
    let prevData = []
    dataItems.forEach(item => {
      prevData.push(item.data)
    })

    if (data.length < dataItems.length) {
      console.debug('table data deleted')
      let newDataItems = intersectionWith(dataItems, data, DataTable.isEqualCustom)
      console.debug(newDataItems)
      return {
        dataItems: newDataItems
      }
    } else if (data.length > dataItems.length) {
      console.debug('table data added', data, dataItems)
      // TODO, use identifier
      let addedData = differenceBy(data, prevData, 'id')
      let lastItem = last(dataItems)
      let rowIndex = lastItem ? lastItem.rowIndex + 1 : 0
      let newDataItems = [ ...dataItems ]
      addedData.forEach(d => {
        newDataItems.push({
          rowIndex: rowIndex,
          checked: false,
          data: d
        })
        rowIndex++
      })
      console.debug(newDataItems)
      return {
        dataItems: newDataItems
      }
    } else {
      if (!isEqual(data, prevData)) {
        console.debug('table data edited', data, dataItems)
        let newDataItems = []
        dataItems.forEach(d => {
          let newData = find(data, (o) => o.id === d.data.id)
          newDataItems.push({
            rowIndex: d.rowIndex,
            checked: d.checked,
            data: newData
          })
        })
        console.debug(newDataItems)
        return {
          dataItems: newDataItems
        }
      }
    }
    return null;
  }

  selectAll = (e, data) => {
    const { dataItems } = this.state
    dataItems.forEach(item => {
      item.checked = data.checked
    })
    this.setState({
      dataItems: dataItems
    })
  }

  select = (e, data, item) => {
    const { dataItems } = this.state
    dataItems.forEach(i => {
      if (i.rowIndex === item.rowIndex) {
        i.checked = data.checked
      }
    })
    this.setState({
      dataItems: dataItems
    })
  }

  getSelectedCount = (dataItems) => {
    let selectedCount = 0
    dataItems.forEach(i => {
      if (i.checked) {
        selectedCount++
      }
    })
    return selectedCount
  }

  isSelectAllChecked = () => {
    const { dataItems } = this.state
    const selectedCount = this.getSelectedCount(dataItems)
    if (selectedCount === 0) {
      return false
    } else if (selectedCount === dataItems.length) {
      return true
    }
  }

  isSelectAllIndeterminate = () => {
    const { dataItems } = this.state
    const selectedCount = this.getSelectedCount(dataItems)
    if (selectedCount > 0 && selectedCount !== dataItems.length) {
      return true
    } else {
      return false
    }
  }

  dataTable = () => {
    const { config } = this.props
    let content = []
    if (config.headerActions) {
      let btnIndex = 0
      config.headerActions.forEach((action) => {
        content.push(
          <Button key={`header-action-btn-${btnIndex}`} basic size='small'
            onClick={() => { action.onClick(this.state.dataItems) }}>
            <Icon color={action.iconColor} name={action.icon} />
            {this.props.intl.formatMessage({ id: action.text })}
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
          {this.props.intl.formatMessage({ id: cell['name'] })}
        </Table.HeaderCell>
      )
      cellIndex++
    })

    // 创建操作列表头
    if (config.rowActions) {
      headerCells.push(
        <Table.HeaderCell key={`header-${cellIndex}`}>
          {this.props.intl.formatMessage({ id: 'table-operation-title' })}
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
      let cellRender = cell.hasOwnProperty('cellRenderer')
      let cellContent
      if (cellRender) {
        let cellRenderer = cell['cellRenderer']
        cellContent = cellRenderer(item.data[field])
      } else {
        cellContent = item.data[field]
      }
      rowCells.push(
        <Table.Cell key={`cell-${item.rowIndex}-${cellIndex}`}>{cellContent}</Table.Cell>
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
          {this.props.intl.formatMessage({ id: action.text })}
        </Button>
      )
      btnIndex++
    })
    return actionBtns
  }

  render() {
    return this.dataTable()
  }
}

export default injectIntl(DataTable)