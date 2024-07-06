
import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColumnMenu, GridRowSelectionModel } from '@mui/x-data-grid';
import moment from "moment"
import SendMail from "./../../../assets/images/mail.gif"
import PropTypes from "prop-types";
import { useDefaultDates } from '@mui/x-date-pickers/internals';

const ListGrid = (props) => {
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const { data, selectedRow, flag,gridClearFlag} = props;
    const diffDays = (d1, d2) => {
        var ndays;
        var tv1 = d1.valueOf();
        var tv2 = d2.valueOf();
        ndays = (tv2 - tv1) / 1000 / 86400;
        ndays = Math.round(ndays - 0.5);
        return ndays+' Days';
    }
    const sendEmail = (id) => { 
        const selectedIDs = new Set(id);
        const selectedRowData = data.filter((row) =>
            selectedIDs.has(row.id)
        ) 
        let emailList=[];
        for (let i=0 ;i<selectedRowData.length;i++){
            if(selectedRowData[i].owner){
                emailList.push({
                    riskId:selectedRowData[i].riskId,
                    owner:selectedRowData[i].owner,
                    isEmailSend:null,
                    targetClosureDate:selectedRowData[i].targetClosuerDate,
                    emailFor: flag==true?"A": "T"
                })
            }
        } 
        selectedRow(emailList?emailList:[])  
    } 
    
    const columns = [
        { field: 'practice', headerName: 'Practice', width: 60, cellClassName: 'super-app-theme--cell',},
        { field: 'projectName', headerName: 'Project', width: 130, },
        { field: 'owner', headerName: 'Owner', width: 150, },
        { field: 'status', headerName: 'Status', width: 80, },
        {
            field: 'targetClosuerDate', headerName: 'Target Closuer Date', width: 100,
            valueFormatter: params =>
                params.value ? diffDays(new Date(params?.value),new Date()): new Date(),
        },
        {
            field: 'isEmailSend', headerName: 'Mail Send', width: 100, 
            renderCell: (params) => {
                return (
                <>
                        {params.value ? <img src={SendMail} width={"50px"} /> : ""}
                </>
              );} ,
        },

    ],
    WipColumn=[
        { field: 'practice', headerName: 'Practice', width: 60, cellClassName: 'super-app-theme--cell',},
        { field: 'projectName', headerName: 'Project', width: 130, },
        { field: 'owner', headerName: 'Owner', width: 150, },
        { field: 'status', headerName: 'Status', width: 80, },
        {
            field: 'isEmailSend', headerName: 'Mail Send', width: 100, 
            renderCell: (params) => {
                return (
                <>
                        {params.value ? <img src={SendMail} width={"50px"} /> : ""}
                </>
              );} ,
        },
    ]

    const CustomColumnMenu = (props) => {
        return (
            <GridColumnMenu
                {...props}
                slots={{
                    columnMenuColumnsItem: null,
                }}
            />
        );
    };
    useEffect(()=>{
        if(gridClearFlag){
            setRowSelectionModel([])
        }
    },[gridClearFlag])
    return (
        <div id="footer">
            <Box sx={{
                height: 400
            }}> 
                <DataGrid
                    checkboxSelection
                    onRowSelectionModelChange={(id) => { 
                        setRowSelectionModel(id);
                        sendEmail(id)
                    }}
                    rowSelectionModel={rowSelectionModel}
                    rows={data ? data : []}
                    columns={flag==true? WipColumn:columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    slots={{ columnMenu: CustomColumnMenu }}
                    pageSizeOptions={[10]}
                />
            </Box>
        </div>
    )
}

export default ListGrid;
ListGrid.propTypes = {
    data: PropTypes.any,
    setFilterRiskDataFunction: PropTypes.any,
    selectedRow: PropTypes.any,
    gridClearFlag: PropTypes.any,
    flag:PropTypes.any
  };
  