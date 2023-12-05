import { FaRegCreditCard } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { InvoiceModel } from "../../../model";
import Service from "../../../service";
import { EndPoints } from "../../../endpoint";
import { FaRegAddressBook } from "react-icons/fa";

{
  /* Je declare tous les services */
}

const service = new Service<InvoiceModel>(EndPoints.invoice);

{
  /* Je debute mon composant */
}

function List_facture() {
  {
    /* Je declare mes variable globale */
  }

  const [data, setData] = useState<InvoiceModel[]>();
  const [, setError] = useState(null);

  {
    /* Fonction pour recuperer les paiement */
  }

  function fetchData() {
    service
      .getAll()
      .then((data) => {
        console.log(data);

        let _data = data.response.Data;
        if (!Array.isArray(_data) && _data != undefined) {
          _data = [_data];
        }

        console.log(_data);

        setData(_data);
      })
      .catch((error) => setError(error));
  }

  {
    /* useEffect pour lancer les fetchs au chargement de la page */
  }

  useEffect(() => {
    fetchData();
  }, []);

  {
    /* Debut du composant */
  }

  return (
    <div>
      <form>
        <div className=" w-full h-2/6">
          {/* 1ere partie du Header */}

          <div className="bg-blue-200 h-1/6 w-full flex">
            Liste des factures
          </div>

          {/* Fin 1ere partie du Header */}

          {/* 2ieme partie du Header */}

          <div className=" h-5/6 w-full ">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"></div>
          </div>
        </div>
        {/* Fin 2ieme partie du Header */}

        {/* Debut de la table */}
        <div className=" w-full h-3/6">
          <div className="flex flex-col">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="text-gray-900 bg-white">
                  <div className="px-3 py-4 flex justify-center">
                    <table className="w-full text-md bg-blue-200 shadow-md rounded mb-4 mr-4">
                      <tbody>
                        <tr className="border-b">
                          <th className="text-left p-3 px-5">Date</th>
                          <th className="text-left p-3 px-5">Facture#</th>
                          <th className="text-left p-3 px-5">Client</th>
                          <th className="text-left p-3 px-5">Statut</th>
                          <th className="text-left p-3 px-5">Echeance</th>
                          <th className="text-left p-3 px-5">Payment</th>
                          <th className="text-left p-3 px-5">FCY</th>
                          <th className="text-left p-3 px-5">Montant</th>
                          <th className="text-left p-3 px-5">A payer</th>
                          <th className="text-left p-3 px-5">payer</th>
                          <th className="text-left p-3 px-5">Action</th>
                        </tr>
                        {data?.map((item, index) => {
                          console.log(item);
                          return (
                            <tr
                              key={index}
                              className="border-b hover:bg-orange-100 bg-gray-100"
                            >
                              <td className="p-3 px-5">
                                {" "}
                                {item.Creation_date}{" "}
                              </td>
                              <td className="p-3 px-5">
                                {item.Invoice_number}
                              </td>
                              <td className="p-3 px-5">{item.Id_customer}</td>
                              <td className="p-3 px-5">{item.Status}</td>
                              <td className="p-3 px-5">{item.Due_date}</td>
                              <td className="p-3 px-5">{item.Credit_apply}</td>
                              <td className="p-3 px-5">{item.Rate}</td>
                              <td className="p-3 px-5">{item.Amount}</td>
                              <td className="p-3 px-5">{item.Balance}</td>
                              <td className="p-3 px-5">
                                $
                                {parseFloat(item.Amount.replace(/\$|,/gm, "")) -
                                  parseFloat(
                                    item.Balance.replace(/\$|,/gm, "")
                                  )}
                              </td>
                              <td className="p-3 px-5">
                                {" "}
                                <Link
                                  to={`/Appliquer credit/${item.ID}/${parseFloat(item.Balance.replace(/\$|,/gm, ""))}`}
                                  className="flex mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                >
                                  Appliquer des Drédits
                                  <div className="px-2 pt-1">
                                    <FaRegCreditCard />
                                  </div>
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Fin de la table */}

        {/* Debut du footer */}
        <div className=" w-full h-1/6 flex">
          <div className="h-full w-full flex items-center">
            <div className="px-2">
              <Link
                to={"/Nouveau Paiement"}
                className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Nouveau Paiement
                <div className="px-2 pt-1">
                  <FaCartPlus />
                </div>
              </Link>
            </div>
            <div className="px-2">
              <Link
                to={"/Creer Invoice "}
                className="flex bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Creer une facture
                <div className="px-2 pt-1">
                  <FaRegAddressBook />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Fin du footer */}
      </form>
    </div>
  );
}

export default List_facture;
