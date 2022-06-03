import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Card } from '../../../components/Card'
import { Item } from '../../../components/Item';
import { ToolBar } from '../../../components/ToolBar';
import UserAdd from '../components/UserAdd';
import UsersList from '../components/UsersList';



function User() {

  const { user }= useSelector(state => state.auth.user);
  const tabs = {
    users_list : "users_list",
    users_add : "users_add",
  };

  const [activeTab, setActiveTab] = useState(tabs.users_list);

  const tabsSwitcher = (tab) => {
    switch (tab) {
        case 'users_list':
            return (<UsersList/>);
        case 'users_add':
            return (<UserAdd  setActiveTab={setActiveTab} />);
        default:
            return (<UsersList/>);
    }
}


  const Toolbar = () => (
    <ToolBar>
        <Item title={"Liste"} onClick={() => setActiveTab(tabs.users_list)} activeTab={activeTab} name={tabs.users_list} tooltip={"Liste des utilisateurs"} />


                  <Item title={"Ajouter"}
                    onClick={() => setActiveTab(tabs.users_add) }
                    activeTab={activeTab}
                    name={  tabs.users_add}
                    tooltip={"Ajouter des utilisateurs"} 
                 />

    </ToolBar>
);
  return (
    <div className="content">
        <Card title={"Utilisateurs"} toolbar={<Toolbar />}  >
            {tabsSwitcher(activeTab)}
        </Card>
    </div>
  )
}

export default User