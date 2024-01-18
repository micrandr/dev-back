import { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MaterialReactTable, 
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_DensityState,
  type MRT_SortingState,
  type MRT_VisibilityState,
} from 'material-react-table';
import UserDataService from '../services/UserServices';
import TableDataList from './Lists/TableDataList';
import LinkAction from './Buttons/LinkActions'
import Swal from 'sweetalert2';
import UserService from '../services/UserServices';
import DocumentStatus from './Documents/DocumentStatus'
import { data, type Person } from '../data/makeData';

//column definitions...
const columns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
  {
    accessorKey: 'salary',
    header: 'Salary',
  },
];
//end

const API_URI = 'https://localhost:8000/'

type Users = {
  userName: "",  
  userFirstName: "",
  userAddress: ""

}


const DataListUsers = () => {

  const navigate = useNavigate()
  const [users, setUsers] = useState<any[]>([]);

  // table react table 
  const isFirstRender = useRef(true);

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] = useState<MRT_VisibilityState>(
    {},
  );
  const [density, setDensity] = useState<MRT_DensityState>('comfortable');
  const [globalFilter, setGlobalFilter] = useState<string | undefined>(
    undefined,
  );
  const [showGlobalFilter, setShowGlobalFilter] = useState(false);
  const [showColumnFilters, setShowColumnFilters] = useState(false);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  //load state from local storage
  useEffect(() => {
    const columnFilters = window.localStorage.getItem('mrt_columnFilters_table_1');
    const columnVisibility = window.localStorage.getItem(
      'mrt_columnVisibility_table_1',
    );
    const density = window.localStorage.getItem('mrt_density_table_1');
    const globalFilter = window.localStorage.getItem('mrt_globalFilter_table_1');
    const showGlobalFilter = window.localStorage.getItem(
      'mrt_showGlobalFilter_table_1',
    );
    const showColumnFilters = window.localStorage.getItem(
      'mrt_showColumnFilters_table_1',
    );
    const sorting = window.localStorage.getItem('mrt_sorting_table_1');

    if (columnFilters) {
      setColumnFilters(JSON.parse(columnFilters));
    }
    if (columnVisibility) {
      setColumnVisibility(JSON.parse(columnVisibility));
    }
    if (density) {
      setDensity(JSON.parse(density));
    }
    if (globalFilter) {
      setGlobalFilter(JSON.parse(globalFilter) || undefined);
    }
    if (showGlobalFilter) {
      setShowGlobalFilter(JSON.parse(showGlobalFilter));
    }
    if (showColumnFilters) {
      setShowColumnFilters(JSON.parse(showColumnFilters));
    }
    if (sorting) {
      setSorting(JSON.parse(sorting));
    }
    isFirstRender.current = false;
  }, []);

  //save states to local storage
  useEffect(() => {
    if (isFirstRender.current) return;
    window.localStorage.setItem(
      'mrt_columnFilters_table_1',
      JSON.stringify(columnFilters),
    );
  }, [columnFilters]);

  useEffect(() => {
    if (isFirstRender.current) return;
    window.localStorage.setItem(
      'mrt_columnVisibility_table_1',
      JSON.stringify(columnVisibility),
    );
  }, [columnVisibility]);

  useEffect(() => {
    if (isFirstRender.current) return;
    window.localStorage.setItem('mrt_density_table_1', JSON.stringify(density));
  }, [density]);

  useEffect(() => {
    if (isFirstRender.current) return;
    window.localStorage.setItem(
      'mrt_globalFilter_table_1',
      JSON.stringify(globalFilter ?? ''),
    );
  }, [globalFilter]);

  useEffect(() => {
    if (isFirstRender.current) return;
    window.localStorage.setItem(
      'mrt_showGlobalFilter_table_1',
      JSON.stringify(showGlobalFilter),
    );
  }, [showGlobalFilter]);

  useEffect(() => {
    if (isFirstRender.current) return;
    localStorage.setItem(
      'mrt_showColumnFilters_table_1',
      JSON.stringify(showColumnFilters),
    );
  }, [showColumnFilters]);

  useEffect(() => {
    if (isFirstRender.current) return;
    window.localStorage.setItem('mrt_sorting_table_1', JSON.stringify(sorting));
  }, [sorting]);

  // end react table config

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then(response => {
        setUsers(response.data['hydra:member']);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUser = (id: string) => {

    Swal.fire({
      title: 'Vous êtes sur ?',
      text: "Cette action sera irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer'
    }).then((result) => {
      if (result.isConfirmed) {

        UserDataService.remove(id)

        Swal.fire(
          'Supprimé !',
          'Cet objet a été bien supprimé.',
          'success'
        )
        navigate('/users')
      }
    });
    
  }

  const roomCreateUrl = "/users/create/"
  const roomCreateText = 'Nouveau formateur'

  //const columns = useMemo<MRT_ColumnDef<Users>[]>(

  const columnsUsers: MRT_ColumnDef<Users>[] = [
      {
        accessorKey: 'userName',
        header: 'Nom',
      },
      {
        accessorKey: 'userFirstName',
        header: 'Prénom'
      },
      {
        accessorKey: 'userAddress',
        header: 'Adresse',
        size: 2
      },
      {
        accessorKey: 'userPhone',
        header: 'Téléphone',
        size: 2
      },
      {
        accessorKey: 'userMobile',
        header: 'Mobile',
        size: 2
      },
      {
        accessorKey: 'userDepartment',
        header: 'Département',
        size: 2
      },   
      {
        accessorKey: 'companyName',
        header: 'Nom Entreprise',
        size: 2
      },                    
      {
        accessorKey: 'companyType',
        header: 'Type',
        size: 2
      }, 
      {
        accessorKey: 'userSkills',
        header: 'Compétences',
        size: 2
      },
      {
        id: "actionColumnRoom",
        header: "Actions",
        size: 2,
        accessorFn: (row) => {

          const userEditUrl = "/users/edit/"+row?.id
          const userFicheUrl = "/users/fiche/"+row?.id
          const userDeleteUrl = "/users/delete/"+row?.id
          
          return (
            
            <LinkAction 
              editLink={userEditUrl} 
              ficheLink={userFicheUrl} 
              deleteLink={userDeleteUrl} 
              objectId={row.id} 
              objectName="users" 
              objectData={UserService} 
            />
          )
        }
      }
    ]


  

  return (    
    // <MaterialReactTable
    //   columns={columns}
    //   data={data}
    //   onColumnFiltersChange={setColumnFilters}
    //   onColumnVisibilityChange={setColumnVisibility}
    //   onDensityChange={setDensity}
    //   onGlobalFilterChange={setGlobalFilter}
    //   onShowColumnFiltersChange={setShowColumnFilters}
    //   onShowGlobalFilterChange={setShowGlobalFilter}
    //   onSortingChange={setSorting}
    //   state={{
    //     columnFilters,
    //     columnVisibility,
    //     density,
    //     globalFilter,
    //     showColumnFilters,
    //     showGlobalFilter,
    //     sorting,
    //   }}
    // />
    <TableDataList data={users} columns={columnsUsers} createLink={roomCreateUrl} createText={roomCreateText} isFirstRender={isFirstRender} />
  );
};

export default DataListUsers;
