import { Link } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
const CreateCompanyLinkAction = () => {

    return (

        <div className="p-2 text-right">
            [<CreateIcon sx={{width:18}} className="text-black"></CreateIcon>
            <Link to="/compagnies/create" target="_blank" className="text-black">Nouvelle entreprise?</Link>]
        </div>

    )

}

export default CreateCompanyLinkAction;