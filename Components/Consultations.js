import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
function Consultations({data,searchTerm}) {
    return (
        <TableContainer className={`col-9 col-md-11 col-xl-8 table ml-12 mt-5 border-line rounded-12 bg-white oy-scroll`}>
          <Table size="small" aria-label="a dense table" >
            <TableHead className={`bg-secondary`}>
              <TableRow className={`table-header`}>
                <TableCell align="left">Patients name</TableCell>
                <TableCell align="left">Consultation for</TableCell>
                <TableCell align="left">Booking type</TableCell>
                <TableCell align="left">Booking slot</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data && data.filter((val)=>{
            if(searchTerm == ""){
              return val
            }else if(val.fullName.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
            }
            }).map((item,index)=>(
                <TableRow key={index+1} className={`table-body`}>
                  <TableCell component="th" scope="row">{item.patient.name}</TableCell>
                  {item.apointments&&<TableCell align="left">{item.apointments[item.apointments.length-1].slot.consultationFor}</TableCell>}
                  {item.apointments&&<TableCell align="center">{item.apointments[item.apointments.length-1].slot.sessionType[0]}</TableCell>}
                  {item.apointments&&<TableCell align="center">{item.apointments[item.apointments.length-1].slot.startTime.split('T')[0] + ',  ' + item.apointments[item.apointments.length-1].slot.startTime.split('T')[1].split('.')[0]}</TableCell>}
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
      )
}

export default Consultations