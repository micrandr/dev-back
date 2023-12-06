import Breadcrumb from '../../components/Breadcrumb';
import DataCreateCustomer from '../../components/DataCreateCustomer';

const CreateCustomer = () => {
    return (
        <>
            <Breadcrumb pageName="Création nouveau client" />

            <div className="flex flex-col gap-10">        
                <DataCreateCustomer />
            </div>
        </>

    )
}

export default CreateCustomer;