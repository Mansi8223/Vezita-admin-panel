import React from 'react'
import MenuItems from './MenuItems'
const MenuBar = () => {
  return (
    <div className={`d-flex d-flex-column d-align-start gap-1 p-4`}>
        <MenuItems value="DashBoard" activeImage="/assets/eva_grid-fill.svg" inactiveImage="/assets/eva_grid-fill_inactive.svg" path="/DashBoard" ></MenuItems>
        <MenuItems value="Reports" activeImage="/assets/entypo_bar-graph.svg" inactiveImage="/assets/entypo_bar-graph_inactive.svg" path="/Report" path1="/ViewConsultations/[id]" path2="/ViewDoctorsDispute/[id]" path3="/ViewPatientsDispute/[id]" haspath1="1" haspath2="1" haspath3="1" multipath="1"></MenuItems>
        <MenuItems value="Doctors" activeImage="/assets/doctor_active.png" inactiveImage="/assets/doctor_inactive.png" path="/Doctors" path1="/Doctors/[id]" path2="/AddDoctor" haspath1="1" haspath2="1" multipath="1"></MenuItems>
        <MenuItems value="Patients" activeImage="/assets/ph_person-fill.svg" inactiveImage="/assets/ph_person-fill_inactive.svg" path="/Patients" path1="/Patients/[id]" path2="/AddPatient" haspath1="1" haspath2="1" multipath="1"></MenuItems>
        <MenuItems value="Update Data" activeImage="/assets/ph_note-pencil-fill-active.svg" inactiveImage="/assets/ph_note-pencil-fill.svg" path="/UpdateData" multipath="0"></MenuItems>
        <MenuItems value="Messages" activeImage="/assets/ph_chat-circle-dots-fill-active.svg" inactiveImage="/assets/ph_chat-circle-dots-fill-inactive.svg" path="/Messages" path1="/PatientMessages" haspath1="1" multipath="1"></MenuItems>
        <MenuItems value="Billings" activeImage="/assets/ph_currency-money-active.svg" inactiveImage="/assets/ph_currency-money.svg" path="/Billing" multipath="0"></MenuItems>
        {/* <MenuItems value="Banners" activeImage="/assets/icomoon-free_bullhorn.svg" inactiveImage="/assets/icomoon-free_bullhorn_inactive.svg" path="/Banner" multipath="0"></MenuItems> */}
        <MenuItems value="Coupon" activeImage="/assets/coupon (1).png" inactiveImage="/assets/coupon.png" path="/Coupons" multipath="0"></MenuItems>
        <MenuItems value="Subcriptions" activeImage="/assets/calendar_active.png" inactiveImage="/assets/calendar_inactive.png" path="/Subscription" multipath="0"></MenuItems>
    </div>
  )
}

export default MenuBar
