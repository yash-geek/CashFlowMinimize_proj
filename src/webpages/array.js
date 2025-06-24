import React, { Fragment, useState, useRef } from "react";
// MUI imports
import { fade, withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { TableHead } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import minCashFlow from "./script"

var finalAns = [];
var personColumn = [];
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "60%",
    padding: "5px 6px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);

const buttonStyle = {
  backgroundColor: "white",
  border: "1px solid rgb(255, 255, 255)",
  borderRadius: 2,
  color: "#e68a29",
  textAlign: 'center',
  textDecoration: 'none',
  fontSize: 'inherit',
  fontWeight: 800,
  padding: "5px 8px 5px 8px",
  ':hover': {
    cursor: 'pointer',
    backgroundColor: "#ffff9b",
    color: "#fd0808"
  }
};

export default function DataTableVariable() {
  // Table
  const classes = useStyles();
  const [rowValue, setRowValue] = useState(0);
  const [columnsValue, setColumnsValue] = useState(0);
  const [tableCellsData, setTableCellsData] = useState();
  const [tableArrayData] = useState([[]]);
  const ref = useRef(null);
  const [showResult, setShowResult] = useState(false);


  const getUniqueKeyFromArrayIndex = (rowNum, columnNum) => {
    return `${rowNum}-${columnNum}`;
  };
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeHandler = (e) => {
    let [row, col] = e.target.name.split("-");
    if (row === col) {
      e.target.value = 0;
    }
    let value = parseFloat(e.target.value) || 0;

    // if (isNaN(value) || value < 0) {
    //   e.target.value = 0; 
    //   return; 
    // }
    if (isNaN(value) || value < 0) {
      setErrorMessage('Please enter a valid non-negative number.');
      e.target.value = 0; // Clear the input or set to default value (e.g., 0)
      return;
    } else {
      setErrorMessage(''); // Clear error message if input is valid
    }

    if (value < 0) {
      e.target.value = 0; // Optionally reset to 0 or handle as needed to prevent negative values
      return;
    }

    if (row === col) {
      value = 0; // Ensure diagonal values are always 0
    }

    //console.log(e.target.name, value);
    setTableCellsData({
      ...tableCellsData,
      [e.target.name]: value
    });
    setShowResult(false);
    row = parseInt(row);
    col = parseInt(col);

    if (!tableArrayData[row]) {
      tableArrayData[row] = [];
    }
    tableArrayData[row][col] = value;
  };


  const generateTable = () => {
    let table = [];
    // let head = []
    // for(let i = 0; i < columnsValue; i++)
    // head.push(
    //   <td>
    //     <strong style={{borderRadius: 4,
    // position: "relative",
    // border: "1px solid #ced4da",
    // fontSize: 16,
    // width: "60%",
    // padding: "5px 6px"
    // }}>To Person {i+1}</strong>
    //   </td>
    // );
    // table.push(
    //   <TableHead style={{ backgroundColor: "#e68a29" }}>
    //     <TableRow >
    //       <div style={{ paddingTop: 20, paddingLeft: 5, color: "#000000" }}></div>
    //       <TableCell>{head}</TableCell>
    //     </TableRow>
    //   </TableHead> 
    
    // );
    for (let i = 0; i < rowValue; i++) {
      let children = [];
      for (let j = 0; j < columnsValue; j++) {
        i === j ?
          children.push(
            <td>
              <BootstrapInput
                value={0}
                name={getUniqueKeyFromArrayIndex(i, j)}
                onChange={onChangeHandler}
              />
            </td>
          ) : children.push(
            <td>
              <BootstrapInput
                name={getUniqueKeyFromArrayIndex(i, j)}
                onChange={onChangeHandler}
              />
            </td>
          );
      }
      //   console.log(children);
      table.push(
        <TableHead style={{ backgroundColor: "#e68a29" }}>
          <TableRow key={i}>
            <div style={{ paddingTop: 20, paddingLeft: 5, color: "#000000" }}>Person {i + 1} has to pay</div>
            <TableCell>{children}</TableCell>
          </TableRow>
        </TableHead> 
      
      );
      //   console.log(tableCellsData);
    }
    return table;
  };

  //creating the graph
  function addZeros(array) {
    var graph = [];
    for (var i = 0; i < rowValue; i++) {
      var col = [];
      for (var j = 0; j < columnsValue; j++) {
        col.push(0);
      }
      graph[i] = col;
    }

    for (var p = 0; p < array.length; p++)
      for (i = 0; i < array[p].length; i++) {
        if (array[p][i] === undefined || array[p][i] === Array(0))
          graph[p][i] = 0;
        // document.write(array[p][i] + " ");
        else
          graph[p][i] = array[p][i];
      }

    finalAns = [];
    finalAns = minCashFlow(graph);
  }

  function handleChangeInPersons(e) {
    setRowValue(e.target.value);
    setColumnsValue(e.target.value);
    setShowResult(false);
    personColumn = [];
    for (var i = 0; i < e.target.value; i++) {
      personColumn.push(`Person ${i + 1} `);
    }
  }

  function handleChangeInResult(e) {
    if (tableArrayData.length === 0 || rowValue === 0 || columnsValue === 0)
      return;
    addZeros(tableArrayData)
    setShowResult(true);
  }

  return (
    <Fragment>
      <div>


        <div className={"rowColumnsNumber"} style={{ marginTop: 20, display: "flex" }}>
          <h4 style={{ paddingRight: 20 }}>Enter total number of persons involved in cash flow: </h4>
          <TextField
            id="Row-number"
            label="Persons"
            type="number"
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: "3", max: "10", step: "1" }}
            onChange={handleChangeInPersons}
            variant="outlined"
          />
        </div>
        <div>
          <h4>
            For each cell, enter the amount that Person i: "the left most row" has to pay to Person j : "people of that row".values are set 0 by default, any character or negative input will be taken as zero.
            <br />Note: Diagonals values represent the person itself and are bound to be zero.
          </h4>
        </div>
        <br />
        <div>
          <div className={"TableContainer"}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                {/* <div style={{paddingLeft: 165}}>
            {personColumn.map((item, index) => {
                    return <div style={{float: "left", width: 100/{rowValue}, paddingRight: 97}}>
                      {`To ${item}`}
                    </div>
                  })}
            </div> */}
                <TableBody style={{ backgroundColor: "#e68a29" }} ref={ref}>{generateTable()}</TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ paddingTop: 30 }}>
            <input type="button" style={buttonStyle} onClick={handleChangeInResult} value={showResult ? "Result" : "Compute"} />
          </div>
          <div>
            {showResult ?
              <table style={{ color: 'white' ,border:'1px solid black',padding:'5px',margin:'10px'}}>{
              finalAns.map((item, index) => {
                return <tr style={{ color: 'white' }}>
                  <td style={{ color: 'white',padding:'2px',margin:'2px'}}>{item}</td>
                </tr>
              })}
              </table>
              : null}
          </div>
          <h5>Welcome <br />used : graph, greedy, heaps</h5>
        </div>
        </div>
    </Fragment>
  );
}