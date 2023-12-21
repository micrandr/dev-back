import Breadcrumb from '../../components/Breadcrumb';
import DataFicheCompany from '../../components/DataFicheCompany';

const FicheCompany = () => {
    return (
        <>
            <Breadcrumb pageName="Visualiser entreprise" />

            <div className="flex flex-col gap-10">        
                <DataFicheCompany />
            </div>
        </>

    )
}

export default FicheCompany;