import React, { memo, useState, useEffect } from "react";
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import {
    AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList,
    FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn
} from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const GridBase = () => {
    const columns = [
        {
            title: 'Name', field: 'name', filtering: true, cellStyle: {
                color: '#2196f3',
                cursor: 'pointer'
            },
            render: (rowData) => {
                return (
                    <div onClick={() => onRowClick(rowData)}>{rowData.name}</div>
                )
            }

        },
        { title: 'Capital Name', field: 'capital' },
        { title: 'Total Population', field: 'population', type: 'numeric' },
        { title: 'Region', field: 'region' }
    ]
    const history = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async (query) => {
        try {
            let url = 'https://restcountries.com/v2/all';
            let res = await fetch(url);
            let result = await res.json();
            setData(result);
        } catch (error) {
            alert("Something went wrong. Please try again later");
        }
    }

    const onRowClick = (rowData) => {
        history(`/country/${rowData.name}`);
    }

    return (
        <Grid container >
            <Grid item sm={12} md={12} lg={12} xl={12}>
                <MaterialTable
                    icons={tableIcons}
                    options={{
                        pageSize: 10, headerStyle: {
                            backgroundColor: '#2684cf',
                            color: '#FFF'
                        },
                        filtering: true
                    }}
                    columns={columns}
                    data={data}
                    title="Country List"
                />
            </Grid>
        </Grid>
    )
}

export default memo(GridBase);