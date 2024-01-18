import React, { useRef, useState, useEffect, useMemo } from "react";
import { Box, Button, IconButton } from '@mui/material';
import Create from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  MaterialReactTable,  
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_VisibilityState,
  type MRT_DensityState,
  type MRT_PaginationState,  
  type MRT_SortingState,
} from 'material-react-table';
// import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import LinkAction from "../Buttons/LinkActions"


const TableDataList = ( data ) => {

  

    return (       

        <MaterialReactTable                      
            columns={data.columns}            
            initialState={{
              showGlobalFilter: true,              
            }}
            data={data.data}
            enableRowSelection={false}
            enableColumnOrdering           
            enableGlobalFilter={true}            
            enableFullScreenToggle={false}
            enableColumnActions={false}               
            renderTopToolbarCustomActions={( { table } ) => (
                <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }} className="bg-primary text-white">
                  <Button
                    color="primary"                    
                    onClick={() => {
                      window.location = data.createLink
                    }}            
                  >
                    <Create className="text-white" /> 

                    <span className="text-white">{data.createText}</span>

                  </Button>
                </Box>
              )}
        />

    )

}
export default TableDataList