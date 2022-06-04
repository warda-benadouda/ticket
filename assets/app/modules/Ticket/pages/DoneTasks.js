import React from 'react'
import { Card } from '../../../components/Card'
import { Table } from '../../../components/table/Table'
import { Th } from '../../../components/table/Th'

function DoneTasks() {
  return (
    <div className="content">
      <Card title={"Tâches effectuées"}  >
         <div className="card-body pt-0 pb-4">
            <Table>
                <thead>
                    <tr>
                        <th className="pl-0" minwidth={50} />
                        <Th minwidth={150} >Tache</Th>
                        <Th displayFrom="md" minwidth={120} >Fichier</Th>
                    </tr>
                </thead>
                    <tbody>   
                    </tbody>
            </Table> 
         </div>
        </Card>
    </div>
  )
}

export default DoneTasks