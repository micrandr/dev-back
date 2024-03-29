import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const FileManager = lazy(() => import('../pages/FileManager'));
//const Tables = lazy(() => import('../pages/Tables'));
const ListSalles = lazy(() => import('../pages/Salles/ListSalles'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Sessions = lazy(() => import('../pages/Sessions'));
const CreateSession = lazy(() => import('../pages/Sessions/CreateSession'));
const EditSession = lazy(() => import('../pages/Sessions/EditSession'));
const FicheSession = lazy(() => import('../pages/Sessions/FicheSession'));
const ListUsers = lazy(() => import('../pages/Users/ListUsers'));
const CreateUsers = lazy(() => import('../pages/Users/CreateUsers'));
const EditUsers = lazy(() => import('../pages/Users/EditUsers'));
const FicheUsers = lazy(() => import('../pages/Users/FicheUsers'));
const CreateUserAccess = lazy(() => import('../pages/Users/CreateUserAccess'));
const EditUserAccess = lazy(() => import('../pages/Users/EditUserAccess'));
const FicheUserAccess = lazy(() => import('../pages/Users/FicheUserAccess'));
const ListUserAccess = lazy(() => import('../pages/Users/ListUserAccess'));
const ListLearners = lazy(() => import('../pages/Users/ListLearners'));
const CreateLearner = lazy(() => import('../pages/Users/CreateLearner'));
const ListCustomers = lazy(() => import('../pages/Users/ListCustomers'));
const ListCompagnies = lazy(() => import('../pages/Users/ListCompagnies'));
const CreateCompany = lazy(() => import('../pages/Users/CreateCompany'));
const EditCompany = lazy(() => import('../pages/Users/EditCompany'));
const FicheCompany = lazy(() => import('../pages/Users/FicheCompany'));
const CreateUserSkills = lazy(() => import('../pages/Users/CreateUserSkills'));
const EditUserSkills = lazy(() => import('../pages/Users/EditUserSkills'));
const ListUserSkills = lazy(() => import('../pages/Users/ListUserSkills'));
const ViewUserSkill = lazy(() => import('../pages/Users/ViewUserSkill'));
const ListCourses = lazy(() => import('../pages/Courses/ListCourses'));
const CreateCourse = lazy(() => import('../pages/Courses/CreateCourse'));
const EditCourse = lazy(() => import('../pages/Courses/EditCourse'));
const FicheCourse = lazy(() => import('../pages/Courses/FicheCourse'));
const categoryCourse = lazy(() => import('../pages/Courses/CategoryCourse'));
const categoryCreateCourse = lazy(() => import('../pages/Courses/CategoryCreateCourse'));
const categoryEditCourse = lazy(() => import('../pages/Courses/CategoryEditCourse'));
const categoryFicheCourse = lazy(() => import('../pages/Courses/CategoryFicheCourse'));
const TypeCourses = lazy(() => import('../pages/Courses/TypeCourses'));
const TypeCreateCourse = lazy(() => import('../pages/Courses/TypeCreateCourse'));
const TypeEditCourse = lazy(() => import('../pages/Courses/TypeEditCourse'));
const TypeFicheCourse = lazy(() => import('../pages/Courses/TypeFicheCourse'));
const CustomMaterialReactTable = lazy(() => import('../pages/CustomMaterialReactTable'));


//Level
const LevelList = lazy(() => import('../pages/Courses/LevelList'));
const LevelCreate = lazy(() => import('../pages/Courses/LevelCreate'));
const LevelEdit = lazy(() => import('../pages/Courses/LevelEdit'));
const LevelView = lazy(() => import('../pages/Courses/LevelView'));

//Typologie
const TypeList = lazy(() => import('../pages/Users/TypeList'));
const TypeCreate = lazy(() => import('../pages/Users/TypeCreate'));
const TypeEdit = lazy(() => import('../pages/Users/TypeEdit'));
const TypeView = lazy(() => import('../pages/Users/TypeView'));

const ListRooms = lazy(() => import('../pages/Rooms/ListRooms'));
const CreateRoom = lazy(() => import('../pages/Rooms/CreateRoom'));
const EditRoom = lazy(() => import('../pages/Rooms/EditRoom'));
const FicheRoom = lazy(() => import('../pages/Rooms/FicheRoom'));
const ReactTable = lazy(() => import('../pages/ReactTable'));

const coreRoutes = [
  {
    path: '/courses',
    title: 'Formations',
    component: ListCourses,
  },
  {
    path: '/courses/create',
    title: 'Nouvelle formation',
    component: CreateCourse,
  },  
  {
    path: '/courses/edit/:id',
    title: 'Editer un programme de formation',
    component: EditCourse,
  }, 
  {
    path: '/courses/fiche/:id',
    title: 'Fiche programme de formation',
    component: FicheCourse,
  },
  {
    path: '/courses/types/create',
    title: 'Créer type de formations',
    component: TypeCreateCourse,
  },
  {
    path: '/courses/types',
    title: 'Type de formations',
    component: TypeCourses,
  }, 
  {
    path: '/courses/types/edit/:id',
    title: 'Editer Type de formations',
    component: TypeEditCourse,
  },  
  {
    path: '/courses/types/fiche/:id',
    title: 'Fiche Type de formations',
    component: TypeFicheCourse,
  },     
  {
    path: '/courses/categories',
    title: 'Catégories',
    component: categoryCourse,
  },
  {
    path: '/courses/categories/create',
    title: 'Créer une catégorie',
    component: categoryCreateCourse,
  },  
  {
    path: '/courses/categories/edit/:id',
    title: 'Editer une catégorie',
    component: categoryEditCourse,
  },
  {
    path: '/courses/categories/fiche/:id',
    title: 'Fiche catégorie',
    component: categoryFicheCourse,
  },
  {
    path: '/levels',
    title: 'Niveau',
    component: LevelList,
  },
  {
    path: '/levels/create',
    title: 'Créer un niveau',
    component: LevelCreate,
  }, 
  {
    path: '/levels/edit/:id',
    title: 'Modifier un niveau',
    component: LevelEdit,
  }, 
  {
    path: '/levels/fiche/:id',
    title: 'Visualiser un niveau',
    component: LevelView
  },      
  {
    path: '/rooms',
    title: 'Salles',
    component: ListRooms,
  },
  {
    path: '/rooms/create',
    title: 'Nouvelle salle de formation',
    component: CreateRoom,
  }, 
  {
    path: '/rooms/edit/:id',
    title: 'Editer une salle de formation',
    component: EditRoom,
  },   
  {
    path: '/rooms/fiche/:id',
    title: 'Fiche salle de formation',
    component: FicheRoom,
  },     
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/salles',
    title: 'Salles',
    component: ListSalles,
  },
  {
    path: '/users',
    title: 'Users',
    component: ListUsers,
  },
  {
    path: '/users/create',
    title: 'Users',
    component: CreateUsers,
  },
  {
    path: '/users/edit/:id',
    title: 'Editer Users',
    component: EditUsers,
  },
  {
    path: '/users/fiche/:id',
    title: 'Fiche utilisateur',
    component: FicheUsers,
  },  
  {
    path: '/userskills',
    title: 'Liste compétences',
    component: ListUserSkills,
  },    
  {
    path: '/userskills/create',
    title: 'Fiche compétences',
    component: CreateUserSkills,
  },
  {
    path: '/userskills/edit/:id',
    title: 'Editer fiche compétences',
    component: EditUserSkills,
  },  
  {
    path: '/userskills/fiche/:id',
    title: 'Fiche compétence',
    component: ViewUserSkill,
  },    
  {
    path: '/learners',
    title: 'Inscrits',
    component: ListLearners,
  },
  {
    path: '/learners/create',
    title: 'Création nouveau participant',
    component: CreateLearner,
  },   
  {
    path: '/customers',
    title: 'Clients/Prospects',
    component: ListCustomers,
  },
  {
    path: '/customers/create',
    title: 'Création nouveau client',
    component: CreateLearner,
  }, 
  {
    path: '/useraccess',
    title: 'UsersAccess',
    component: ListUserAccess,
  },
  {
    path: '/useraccess/create',
    title: 'UsersAccess',
    component: CreateUserAccess,
  },
  {
    path: '/types',
    title: 'Type entreprise',
    component: TypeList,
  },
  {
    path: '/types/create',
    title: 'Créer un type entreprise',
    component: TypeCreate,
  }, 
  {
    path: '/types/edit/:id',
    title: 'Modifier un niveau',
    component: TypeEdit,
  }, 
  {
    path: '/types/fiche/:id',
    title: 'Visualiser un niveau',
    component: TypeView,
  }, 
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/sessions',
    title: 'Sessions',
    component: Sessions
  },
  {
    path: '/sessions/create',
    title: 'Nouvelle session',
    component: CreateSession,
  },
  {
    path: '/sessions/edit/:id',
    title: 'Editer une session',
    component: EditSession,
  },
  {
    path: '/sessions/fiche/:id',
    title: 'Fiche session de formation',
    component: FicheSession,
  },
  {
    path: '/compagnies',
    title: 'Compagnies',
    component: ListCompagnies
  },
  {
    path: '/compagnies/create',
    title: 'Création entreprise',
    component: CreateCompany
  },
  {
    path: '/compagnies/edit/:id',
    title: 'Modifier une entreprise',
    component: EditCompany
  },  
  {
    path: '/compagnies/fiche/:id',
    title: 'Fiche entreprise',
    component: FicheCompany
  },  
  {
    path: '/react-table',
    title: 'Table avec filtre',
    component: ReactTable
  },  
  {
    path: '/filemanager',
    title: 'Gestionnaire de fichiers',
    component: FileManager
  },
  {
    path: '/material-react-table',
    title: 'Test table React',
    component: CustomMaterialReactTable
  },  

];

const routes = [...coreRoutes];
export default routes;
