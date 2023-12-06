import Breadcrumb from '../../components/Breadcrumb';
import DataCreateLearner from '../../components/DataCreateLearner';

const CreateLearner = () => {
    return (
        <>
            <Breadcrumb pageName="Création nouveau participant" />

            <div className="flex flex-col gap-10">        
                <DataCreateLearner />
            </div>
        </>

    )
}

export default CreateLearner;