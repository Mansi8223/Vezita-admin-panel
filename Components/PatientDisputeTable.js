import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from '../styles/css/ConsultationTable.module.css'
import Link from 'next/link';

function PatientDisputeTable({data,searchTerm}) {
  // console.log(data,"patient")
    return (
        <TableContainer className={`col-9 col-md-11 col-xl-8 ${styles["table"]} table ml-12 mt-2 border-line rounded-12 bg-white oy-scroll`}>
          <Table size="small" aria-label="a dense table" >
            <TableHead className={`bg-secondary`}>
              <TableRow className={`table-header`}>
                <TableCell align="left">Patients name</TableCell>
                <TableCell align="left">No. of disputes</TableCell>
                <TableCell align="left">View details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data && data.filter((val)=>{
            if(searchTerm == ""){
              return val
            }else if(val.user.name.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
            }
            }).map((item,index)=>(
                <TableRow key={index+1} className={`table-body`}>
                  <TableCell component="th" scope="row">{item.user.name}</TableCell>
                  <TableCell align="left">2</TableCell>
                  <TableCell align="center">
                    <Link href={`/ViewPatientsDispute/${item.user._id}`}>
                    <button className={`btn-view`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.33618 19.2993C7.80098 18.7761 7.75898 18.0477 8.33618 17.4081L12.8326 12.7185L8.33618 8.02894C7.75898 7.38934 7.80098 6.65974 8.33618 6.14014C8.87018 5.61694 9.77258 5.65054 10.2742 6.14014C10.7758 6.62734 15.6766 11.7741 15.6766 11.7741C15.8036 11.8967 15.9046 12.0436 15.9736 12.2061C16.0426 12.3685 16.0782 12.5432 16.0782 12.7197C16.0782 12.8963 16.0426 13.071 15.9736 13.2334C15.9046 13.3959 15.8036 13.5428 15.6766 13.6653C15.6766 13.6653 10.7758 18.8097 10.2742 19.2993C9.77258 19.7901 8.87018 19.8225 8.33618 19.2993Z" fill="white"/>
                    </svg></button></Link>
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </TableContainer>
      )
}

export default PatientDisputeTable