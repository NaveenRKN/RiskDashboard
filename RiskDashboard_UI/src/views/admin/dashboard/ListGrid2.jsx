import React, { useMemo } from 'react';
import { Box, Stack } from '@mui/material';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import PropTypes from "prop-types";

const ListGrid2 = (props) => {
    const { data } = props;
    const columns = useMemo(
        () => [
            {
                header: 'Practice',
                accessorKey: 'practice',
                size: 150,
                GroupedCell: ({ cell, row }) => (
                    <Box sx={{ color: 'primary.main' }}>
                        <strong>{cell.getValue()} </strong> ({row.subRows?.length})
                    </Box>
                ),
            },
            {
                header: 'Project Name',
                accessorKey: 'projectName',
                size: 500,
                GroupedCell: ({ cell, row }) => (
                    <Box sx={{ color: 'primary.main' }}>
                        <strong>{cell.getValue()} </strong> ({row.subRows?.length})
                    </Box>
                ),
            },
            {
                header: 'Risk Type',
                accessorKey: 'type',
            },
            {
                header: 'Risk Rating',
                accessorKey: 'riskRating',

            },
            {
                header: 'Status',
                accessorKey: 'status',
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        defaultColumn: {
            minSize: 1,
            maxSize: 200,
            size: 200,
        },
        enableColumnResizing: true,
        enableGrouping: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        enableTopToolbar: false,
        pinnedRowBackgroundColor: "#fff000",
        initialState: {
            density: 'comfortable',
            expanded: false,
            grouping: ['practice', 'projectName'],
            pagination: { pageIndex: 0, pageSize: 10 },
            sorting: [{ id: 'practice', desc: false }],
        },
        muiToolbarAlertBannerChipProps: { color: 'primary' },
        muiTableContainerProps: { sx: { maxHeight: 700 } },
        muiTableHeadCellProps: {
            sx: (theme) => ({ background: "#4B49AC", color: "#fff" }),
        },
        muiTablePaperProps: {
            elevation: 0,
            sx: { borderRadius: '0', border: '1px dashed #e0e0e0', },
        },
        muiTableBodyProps: {
            sx: {
                '& tr:nth-of-type(odd) > td': { backgroundColor: '#f5f5f5', },
            },
        },
    });
    return <MaterialReactTable table={table} />;
};
export default ListGrid2;
ListGrid2.propTypes = {
    data: PropTypes.any,
    cell: PropTypes.any,
    row: PropTypes.any,
  };
  