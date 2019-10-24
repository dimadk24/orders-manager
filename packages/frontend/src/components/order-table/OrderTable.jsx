import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import './OrderTable.css'

export default function OrderTable({ rows }) {
  return (
    <Paper className="order-table__root">
      <Table className="order-table__table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID заказа</TableCell>
            <TableCell align="center">Телефон</TableCell>
            <TableCell align="center">Улица</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.street}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

OrderTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      phone: PropTypes.string,
      street: PropTypes.string,
    })
  ),
}

OrderTable.defaultProps = {
  rows: [],
}
