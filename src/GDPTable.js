import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const GDPTable = ({ chartData, width, height, color }) => {

    return (
        <TableContainer sx={{ maxWidth: width, maxHeight: height, marginTop: '50px' }}  component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Index</TableCell>
                        <TableCell align="right">Year</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {chartData.map((row, index) => (
                        <TableRow
                            key={index}
                        >
                            <TableCell component="th" scope="row">
                                {index++}
                            </TableCell>
                            <TableCell align="right">{row.DateTime.split('-')[0]}</TableCell>
                            <TableCell align="right">{row.Value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GDPTable;
