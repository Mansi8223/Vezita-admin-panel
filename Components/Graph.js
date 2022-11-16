import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from '../styles/css/Graph.module.css'
function Graph() {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
  const[state, setstate]=useState({
    options : {
      colors:["#3085F4"],
      chart: {
        id: "simple-chart"
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] //will be displayed on the x-asis
      }},
  series : [
  {
    name: "Sales", //will be displayed on the y-axis
    data:['23','45','34','56','78','26','57','46','75','43','72','32']
  }]
})
  // useEffect(()=>{
  //   // console.log("graph render")
  //   // console.log(props.graphData)
  //   // console.log(props.volGraphData)
  //   let arr= new Array(12).fill(0)
  //   let arra= new Array(12).fill(0)
  //   props.graphData.map((item,index)=>{
  //     return(
  //       arr[index]=item.numberoforders
  //     )
  //   })
  //   props.volGraphData.map((item,index)=>{
  //     return(
  //       arra[index]=item.totalAmount
  //     )
  //   })
  // },[props.graphData, props.volGraphData])
  return (
      <div className={`${styles["graph-wrapper"]} ml-12 mt-5 col-6 d-flex d-flex-column bg-subtle rounded-12`}>
        <h3 className={`mt-3 ml-5 f-500 l-28 text-darker`}>Total revenue</h3>
        <Chart className={`${styles["graph"]}`} options={state.options} series={state.series} type="line" />
      </div>
    
  )
}

export default Graph