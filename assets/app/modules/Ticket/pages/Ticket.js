import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Card } from '../../../components/Card'
import { Item } from '../../../components/Item';
import { ToolBar } from '../../../components/ToolBar';
import TicketsList from '../components/TicketsList';
import AddTicket from '../components/AddTicket';

function Ticket() {

  const { user }= useSelector(state => state.auth.user);
  const hasRight = (user.roles.includes("ROLE_SUPER_ADMIN") || user.roles.includes("ROLE_ADMIN"));
  const tabs = {
    tickets_list : "tickets_list",
    tickets_add : "tickets_add",
  };

  const [activeTab, setActiveTab] = useState(tabs.tickets_list);

  const tabsSwitcher = (tab) => {
    switch (tab) {
        case 'tickets_list':
            return (<TicketsList/>);
        case 'tickets_add':
            return (<AddTicket   setActiveTab={setActiveTab} />);
        default:
            return (<TicketsList/>);
    }
}


  const Toolbar = () => (
    <ToolBar>
        <Item title={"Liste"} onClick={() => setActiveTab(tabs.tickets_list)} activeTab={activeTab} name={tabs.tickets_list} tooltip={"Liste des tickets"} />

            {
                hasRight && 
                  <Item title={"Ajouter"}
                    onClick={() => setActiveTab(tabs.tickets_add) }
                    activeTab={activeTab}
                    name={  tabs.tickets_add}
                    tooltip={"Ajouter des tickets"} 
                 />

            }
    </ToolBar>
);
  return (
    <div className="content">
        <Card title={"Tickets"} toolbar={<Toolbar />}  >
            {tabsSwitcher(activeTab)}
        </Card>
    </div>
  )
}

export default Ticket