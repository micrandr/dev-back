import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SubjectIcon from '@mui/icons-material/Subject';

const DocumentStatus = ( status, id ) => {

    return (

        <>
            <PictureAsPdfIcon className="bg-danger m-2" />
            <SubjectIcon className="bg-success m-2" />
        </>
    )
}

export default DocumentStatus