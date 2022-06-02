import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Card } from '../../../components/Card'
import { Item } from '../../../components/Item';
import { ToolBar } from '../../../components/ToolBar';
import DepartementAdd from '../components/DepartementAdd';
import DepartementsList from '../components/DepartementsList';



function Departement() {

  const { user }= useSelector(state => state.auth.user);
  const tabs = {
    departements_list : "departements_list",
    departements_add : "departements_add",
  };

  const [activeTab, setActiveTab] = useState(tabs.departements_list);

  const tabsSwitcher = (tab) => {
    switch (tab) {
        case 'departements_list':
            return (<DepartementsList/>);
        case 'departements_add':
            return (<DepartementAdd  setActiveTab={setActiveTab} />);
        default:
            return (<DepartementsList/>);
    }
}


  const Toolbar = () => (
    <ToolBar>
        <Item title={"Liste"} onClick={() => setActiveTab(tabs.departements_list)} activeTab={activeTab} name={tabs.departements_list} tooltip={"Liste des departements"} />
                  <Item title={"Ajouter"}
                    onClick={() => setActiveTab(tabs.departements_add) }
                    activeTab={activeTab}
                    name={  tabs.departements_add}
                    tooltip={"Ajouter des departements"} 
                 />

    </ToolBar>
);
  return (
    <div className="content">
        <Card title={"Departements"} toolbar={<Toolbar />}  >
            {tabsSwitcher(activeTab)}
        </Card>
    </div>
  )
}

export default Departement