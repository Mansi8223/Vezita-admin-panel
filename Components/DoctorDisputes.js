import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function DoctorDisputes({data,searchTerm}) {
    return (
        <TableContainer className={`col-9 col-md-11 col-xl-8 table ml-12 mt-5 border-line rounded-12 bg-white oy-scroll`}>
          <Table size="small" aria-label="a dense table" >
            <TableHead className={`bg-secondary`}>
              <TableRow className={`table-header`}>
                <TableCell align="left">Dispute id</TableCell>
                <TableCell align="left">Dispute</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data && data.filter((val)=>{
            if(searchTerm == ""){
              return val
            }else if(val._id.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
            }
            }).map((item,index)=>(
                <TableRow key={index+1} className={`table-body`}>
                  <TableCell component="th" scope="row">{item._id}</TableCell>
                  <TableCell align="left">{item.message}</TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
      )
}

export default DoctorDisputes