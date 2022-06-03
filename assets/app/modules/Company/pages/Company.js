import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Card } from '../../../components/Card'
import { Item } from '../../../components/Item';
import { ToolBar } from '../../../components/ToolBar';
import AddCompany from '../components/AddCompany ';
import CompaniesList from '../components/CompaniesList';


function Company() {

  const { user }= useSelector(state => state.auth.user);
  const tabs = {
    companies_list : "companies_list",
    companies_add : "companies_add",
  };

  const [activeTab, setActiveTab] = useState(tabs.companies_list);

  const tabsSwitcher = (tab) => {
    switch (tab) {
        case 'companies_list':
            return (<CompaniesList/>);
        case 'companies_add':
            return (<AddCompany   setActiveTab={setActiveTab} />);
        default:
            return (<CompaniesList/>);
    }
}


  const Toolbar = () => (
    <ToolBar>
        <Item title={"Liste"} onClick={() => setActiveTab(tabs.companies_list)} activeTab={activeTab} name={tabs.companies_list} tooltip={"Liste des entreprises"} />


                  <Item title={"Ajouter"}
                    onClick={() => setActiveTab(tabs.companies_add) }
                    activeTab={activeTab}
                    name={  tabs.companies_add}
                    tooltip={"Ajouter des entreprises"} 
                 />

    </ToolBar>
);
  return (
    <div className="content">
        <Card title={"Entreprises"} toolbar={<Toolbar />}  >
            {tabsSwitcher(activeTab)}
        </Card>
    </div>
  )
}

export default Company