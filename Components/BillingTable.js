import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function BillingTable({data,searchTerm}) {
  return (
    <TableContainer className={`col-9 col-md-11 col-xl-8 table ml-12 mt-5 h-538 border-line rounded-12 bg-white oy-scroll`}>
          <Table size="small" aria-label="a dense table" >
            <TableHead className={`bg-secondary`}>
              <TableRow className={`table-header`}>
                <TableCell align="left">Doctors name</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Speciality</TableCell>
                <TableCell align="left">Earning</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data && data.filter((val)=>{
            if(searchTerm == ""){
              return val
            }else if(val.docter.fullName.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
            }
            }).map((item,index)=>(
                <TableRow key={index+1} className={`table-body`}>
                  <TableCell component="th" scope="row">{item.docter.fullName}</TableCell>
                  <TableCell align="left">{item.docter.city}</TableCell>
                  <TableCell align="left">{item.docter.specialization && item.docter.specialization.map((a,index)=>(<h5 className={`f-400 l-22`} key={index+1}>{a.specializationId.name}</h5>))}</TableCell>
                  <TableCell align="left">{item.totalRevenue}</TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
  )
}

export default BillingTable