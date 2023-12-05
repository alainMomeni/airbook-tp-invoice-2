import { useEffect, useState } from "react";
import { useRef } from "react";
import { FaRegSave } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../model/customer.model";
import { InvoiceModel, TravelItemModel } from "../../../model";
import Service from "../../../service";
import { EndPoints } from "../../../endpoint";
import moment from "moment";

{/* Je declare tous les services */}

const service = new Service<CustomerModel>(EndPoints.customer);
const service2 = new Service<TravelItemModel>(EndPoints.travelItem);
const service3 = new Service<InvoiceModel>(EndPoints.invoice);

{/* Je debute mon composant */}

function Table_create_invoice() {

  {/* Je declare mes variable globale */}

  const formRef = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState<CustomerModel[]>();
  const [data2, setData2] = useState<TravelItemModel[]>();
  const [customerId, setCustomerId] = useState<number | undefined>(124);
  const [checked, setChecked] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [etat, setEtat] = useState("");
  const [errorEtat, setErrorEtat] = useState("");
  const [total, setTotal] = useState(0);
  const [, setError] = useState(null);

  {/* Fonction pour recuperer les utilisateurs */}

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

  {/* Fonction pour recuperer l'Id du customer selectioner  */}

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCustomerId(parseInt(value));
  };

  {/* Fonction pour creer l'invoice  */}  

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("AirBookingIds"));
    const data3 = {};
    formData.forEach((val, key) => {
      const condList = ["Id_customer"];

      if (condList.includes(key)) {
        val = +val;
      }

      if (["Creation_date"].includes(key)) {
        val = moment(val).format();
      }
      data3[key as keyof InvoiceModel] = val;
    });

    if (!data3) {
      throw Error("no data form");
    }
    data3["AirBookingIds"] = checked;
    data3["Status"] = "unpaid";
    data3["Balance"] = data3["Amount"];
    data3["Slug"] = parseInt(Math.random() * 10000000);
    console.log(data3);
    service3.create(data3).then((data3) => {
      console.log(data3);
      setEtat(data3.response.Message);
      setErrorEtat(data3.response.Error);
      if (!data3.response.Error) {
        navigate("/Liste des factures");
      }
      let _data3 = data3.response.Data;
      if (!Array.isArray(_data3) && _data3 != undefined) {
        _data3 = [_data3];
      }
      console.log(_data3);
    });
  }

 {/* Fonction pour recuperer les travel item cocher */}

  function handleChecked(event, val) {
    console.log(val);
    let updateAmount = [...totalAmount];
    let updatedList = [...checked];
    const id = parseInt(event.target.value);
    const amount = parseFloat(val.replace(/\$|,/gm, ""));
    if (event.target.checked) {
      updateAmount = [...totalAmount, amount];
      updatedList = [...checked, id];
    } else {
      updateAmount.splice(checked.indexOf(amount), 1);
      updatedList.splice(checked.indexOf(id), 1);
    }
    setChecked(updatedList);
    const v = updateAmount.reduce((sum, currentVal) => sum + currentVal, 0);
    setTotalAmount(updateAmount);
    console.log(totalAmount);
    console.log(v);
    setTotal(v);
  }

{/* Fonction pour recuperer les travel item du customer */}

  function fetchData2() {
    console.log("Selected value:", customerId);
    service2
      .findOne(`1?id_customer=${customerId}`)
      .then((data2) => {
        console.log(data2);
        const _data2 = data2.response.Data;
        console.log(_data2.Model);
        setData2(_data2.Model);
      })
      .catch((error) => setError(error));
  }

{/* useEffect pour lancer les fetchs au chargement de la page */}  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData2();
  }, [customerId]);

{/* Fonction pour recuperer le statut apres soumission du formulaire */}

  function returnEtat() {
    return (
      <div className="bg-red-400">
        {" "}
        {etat} {errorEtat}{" "}
      </div>
    );
  }

{/* Debut du composant */}

  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className=" w-full h-2/6">
          {/* Debut Header du formulaire */}

          <div className="bg-blue-200 h-1/6 w-full flex">
            <div className="bg-blue-200 w-5/6 h-full ">Creer une facture</div>
            <div className="bg-blue-200 w-1/6 h-full "></div>
          </div>

          {/* Fin du Header */}

          {/* Debut du formulaire principal */}

          <div className=" h-5/6 w-full ">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="h-full w-full flex">
                <div className="mb-4 h-full w-1/6 px-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Customer Name
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Id_customer"
                    name="Id_customer"
                    placeholder="ID"
                    onChange={handleChange}
                  >
                    {data?.map((item, key) => {
                      return (
                        <option value={item.ID} key={key}>
                          {item.Customer_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-4 h-full w-1/6 px-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Invoice Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Invoice_number"
                    type="text"
                    placeholder="Invoice Number"
                    name="Invoice_number"
                  />
                </div>

                <div className="mb-4 h-full w-1/6 px-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Creation date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Creation_date"
                    type="date"
                    placeholder="Creation date"
                    name="Creation_date"
                  />
                </div>
                <div className="mb-4 h-full w-1/6 px-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Due date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Due_date"
                    type="date"
                    placeholder="Due date"
                    name="Due_date"
                  />
                </div>
                <div className="mb-4 h-full w-2/6 px-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Montant
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Amount"
                    type="text"
                    placeholder="Montant"
                    name="Amount"
                    value={total}
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
                          <th className="text-left p-3 px-5">Choix</th>
                          <th className="text-left p-3 px-5">Date</th>
                          <th className="text-left p-3 px-5">Facture#</th>
                          <th className="text-left p-3 px-5">Order#</th>
                          <th className="text-left p-3 px-5">Montant</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data2?.map((item, index) => {
                          console.log(item);
                          return (
                            <tr
                              key={index}
                              className="border-b hover:bg-orange-100 bg-gray-100"
                            >
                              <td className="p-3 px-5">
                                <input
                                  type="checkbox"
                                  name="AirBookingIds"
                                  value={item.ID}
                                  onChange={(e) =>
                                    handleChecked(e, item.Total_price)
                                  }
                                ></input>
                              </td>
                              <td className="p-3 px-5">{item.Issuing_date}</td>
                              <td className="p-3 px-5">{item.Id_invoice}</td>
                              <td className="p-3 px-5">{item.Ticket_number}</td>
                              <td className="p-3 px-5">{item.Total_price}</td>
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

export default Table_create_invoice;
