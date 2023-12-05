import { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PaymentModel } from "../../../model";
import Service from "../../../service";
import { EndPoints } from "../../../endpoint";
import { useRef } from "react";

{
  /* Je declare tous les services */
}

const service = new Service<PaymentModel>(EndPoints.payment);

{
  /* Je debute mon composant */
}

function Table_creation_payment() {
  {
    /* Je declare mes variable globale */
  }

  const [data, setData] = useState<PaymentModel[]>();
  const formRef = useRef();
  const [etat, setEtat] = useState("");
  const [errorEtat, setErrorEtat] = useState("");
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
    /* Fonction pour soumettre le formulaire */
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("Slug"));
    const data = {};
    formData.forEach((val, key) => {
      const condList = ["Slug"];
      if (condList.includes(key)) {
        val = +val;
      }
      data[key as keyof InvoiceModel] = val;
    });
    if (!data) {
      throw Error("no data form");
    }
    data["Balance"] = data["Amount"];
    console.log(data);
    service.create(data).then((data) => {
      console.log(data);
      setEtat(data.response.Message);
      setErrorEtat(data.response.Error);
      if (!data.response.Error) {
        location.reload();
      }
      let _data = data.response.Data;
      if (!Array.isArray(_data) && _data != undefined) {
        _data = [_data];
      }
      console.log(_data);
    });
  }

  {
    /* useEffect pour lancer les fetchs au chargement de la page */
  }

  useEffect(() => {
    fetchData();
  }, []);

  {
    /* Fonction pour recuperer le statut apres soumission du formulaire */
  }

  function returnEtat() {
    return (
      <div className="bg-red-400">
        {" "}
        {etat} {errorEtat}{" "}
      </div>
    );
  }

  {
    /* Debut du composant */
  }

  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className=" w-full h-2/6">
          {/* Debut Header du formulaire */}

          <div className="bg-blue-200 h-1/6 w-full flex">
            <div className="bg-blue-200 w-5/6 h-full ">Nouveau Paiement</div>
          </div>

          {/* Fin du Header */}

          {/* Debut du formulaire principal */}

          <div className=" h-5/6 w-full ">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="h-full w-full flex">
                <div className="mb-4 h-full w-2/6 px-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Number"
                    type="text"
                    name="Number"
                    placeholder="Number"
                  />
                </div>
                <div className="mb-4 h-full w-2/6 px-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Amount
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Amount"
                    type="text"
                    name="Amount"
                    placeholder="Amount"
                  />
                </div>
                <div className="mb-4 h-full w-2/6 px-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Slug
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    name="Slug"
                    placeholder="Slug"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Fin du formulaire principal */}

        {/* Debut de la table */}
        <div className=" w-full h-3/6">
          <div className="flex flex-col">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="text-gray-900 bg-white">
                  <div className="px-3 py-4 flex justify-center">
                    <table className="w-full text-md bg-blue-200 shadow-md rounded mb-4 mr-4">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 px-5">Number</th>
                          <th className="text-left p-3 px-5">Date</th>
                          <th className="text-left p-3 px-5">Customer</th>
                          <th className="text-left p-3 px-5">Amount</th>
                          <th className="text-left p-3 px-5">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.map((item, index) => {
                          console.log(item);
                          return (
                            <tr
                              key={index}
                              className="border-b hover:bg-orange-100 bg-gray-100"
                            >
                              <td className="p-3 px-5">{item.Number}</td>
                              <td className="p-3 px-5">{item.Date}</td>
                              <td className="p-3 px-5">{item.Id_customer}</td>
                              <td className="p-3 px-5">{item.Amount}</td>
                              <td className="p-3 px-5">{item.Balance}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                {etat == "" && errorEtat == "" ? "" : returnEtat()}
              </div>
            </div>
          </div>
        </div>
        {/* Fin de la table */}

        {/* Debut du footer du formulaire */}
        <div className=" w-full h-1/6 flex">
          <div className="h-full w-full flex items-center">
            <div className="px-2">
              <button
                className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Enregistrer
                <div className="px-2 pt-1">
                  <FaRegSave />
                </div>
              </button>
            </div>
            <div className="px-2">
              <Link
                to={"/Liste des factures"}
                className="flex bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Factures
                <div className="px-2 pt-1">
                  <FaFileInvoiceDollar />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Fin du footer du formulaire */}
      </form>
    </div>
  );
}

export default Table_creation_payment;
