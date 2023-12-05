import { BrowserRouter, Routes, Route } from 'react-router-dom'
import List_facture from './components/table/list_facture';
import Table_appliquer_crédit from './components/table/table_appliquer_crédit';
import Table_create_invoice from './components/table/table_create_invoice';
import Table_creation_payment from './components/table/table_creation_payment';

function App() {
  return (
    <div className="w-screen h-screen">

    <BrowserRouter>
      <Routes> 
         <Route path='/' element= { <List_facture /> } />
         <Route path='/Nouveau Paiement' element= { <Table_creation_payment /> } />
         <Route path='/Creer Invoice' element= { <Table_create_invoice /> } />
         <Route path='/Liste des factures' element= { <List_facture /> } />
         <Route path='/Appliquer credit/:id/:amount' element= { <Table_appliquer_crédit /> } />
      </Routes>
    </BrowserRouter>      

    </div>
  );
}

export default App;
