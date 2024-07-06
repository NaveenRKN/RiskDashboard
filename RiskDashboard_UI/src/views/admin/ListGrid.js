import Box from "@mui/material/Box";
import { DataGrid, GridColumnMenu } from "@mui/x-data-grid";
import React from "react";
import PropTypes from "prop-types";

const ListGrid = (props) => {
  const { data } = props;
  const columns = [
    {
      field: "projectName",
      headerName: "Project Name",
      width: 350,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "riskRating",
      headerName: "Risk Rating",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Risk Status",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "type",
      headerName: "Risk Type",
      width: 250,
      headerClassName: "super-app-theme--header",
    },
  ];

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
  return (
    <div id="footer">
      <Box
        sx={{
          height: 400,
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{ columnMenu: CustomColumnMenu }}
          pageSizeOptions={[10]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default ListGrid;
ListGrid.propTypes = {
  data: PropTypes.any, 
};
