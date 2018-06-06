import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


function CustomizedTable(props) {
  const { classes, items } = props;
  console.log(props)
  if(!items)
  return null;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} style={{marginTop:'80px', marginLeft: '150px', width:'70%' }}>
        <TableHead>
          <TableRow>
            <CustomTableCell>MAIN HEAD</CustomTableCell>
            <CustomTableCell numeric>PART NAME</CustomTableCell>
            <CustomTableCell numeric>PART NUMBER</CustomTableCell>
            <CustomTableCell numeric>QUANTITY</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(items).map((item, index) => {
            let purchaseItem = items[item];
            return (
              <TableRow className={classes.row} key={index}>
                <CustomTableCell>{purchaseItem.mainHead}</CustomTableCell>
                <CustomTableCell numeric>{purchaseItem.partName}</CustomTableCell>
                <CustomTableCell numeric>{purchaseItem.partNumber}</CustomTableCell>
                <CustomTableCell numeric>{purchaseItem.quantityPurchase}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
