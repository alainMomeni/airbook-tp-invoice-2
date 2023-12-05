import { FaRegCreditCard } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { PaymentModel } from "../../../model";
import Service from "../../../service";
import { EndPoints } from "../../../endpoint";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

{
  /* Je declare tous les services */
}

const service = new Service<PaymentModel>(EndPoints.payment);

{
  /* Je debute mon composant */
}

function Table_appliquer_crédit() {
  {
    /* Je declare mes variable globale */
  }

  const navigate = useNavigate();
  const { id, amount } = useParams();
  const trueId = parseInt(id);
  const trueAmount = parseInt(amount);
  const [data, setData] = useState<PaymentModel[]>();
  const [invoiceId, setInvoiceId] = useState([]);
  const formRef = useRef();
  const [creditAmount, setCreditAmount] = useState(0);
  const [amountTotal, setAmountTotal] = useState(trueAmount - creditAmount);
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
    /* useEffect pour lancer les fetchs au chargement de la page */
  }

  useEffect(() => {
    fetchData();
  }, []);

  {
    /* Fonction pour recuperer l'Id et les montant de chaque paiement */
  }

  function handleChange(event, val) {
    console.log(val);
    console.log(event.target.value);
    console.log(id);
    const amount = event.target.value;
    const id_pay = parseInt(val);
    const inv = invoiceId;
    const anyKeyFilter = (item) => (obj) => Object.values(obj).includes(item);
    const filtered = inv.filter(anyKeyFilter(id_pay));
    console.log("filtre ==", filtered);
    if (filtered.length > 0) {
      inv.map((item) => {
        if (item.Id_payment_received === id_pay) {
          item.Amount_apply = amount;
        }
      });
      console.log("go");
    } else {
      inv.push({
        id_invoice: trueId,
        Amount_apply: amount,
        Id_payment_received: id_pay,
      });
      setInvoiceId(inv);
    }
    console.log("invoiceId == ", invoiceId);
    let totalCredid = 0;
    inv.filter(anyKeyFilter(id_pay));
    inv.map((item) => {
      totalCredid = totalCredid + parseFloat(item.Amount_apply);
      console.log(totalCredid);
    });
    console.log(totalCredid);
    setCreditAmount(totalCredid);
    setAmountTotal(trueAmount - totalCredid);
    console.log(creditAmount);
  }

  {
    /* Fonction pour creer le paiement */
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post(
        "https://api-airbook.onrender.com/invoicepaymentreceivedsmultiple",
        invoiceId
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.response.Message);
        console.log(res.data.response.Error);
        setEtat(res.data.response.Message);
        setErrorEtat(res.data.response.Error);
        if (!res.data.response.Error) {
          navigate("/Liste des factures");
        }
      })
      .catch((err) => console.log(err));
  }

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
          {/* 1ere partie du Header */}

          <div className="bg-blue-200 h-1/6 w-full flex">
            <div className="bg-blue-200 w-5/6 h-full ">
              Appliquer des Drédits
            </div>
            <div className="bg-blue-200 w-1/6 h-full ">
              Invoice Balance [NGN]: {amountTotal}{" "}
            </div>
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
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 px-5">Number</th>
                          <th className="text-left p-3 px-5">Date</th>
                          <th className="text-left p-3 px-5">Customer</th>
                          <th className="text-left p-3 px-5">Amount</th>
                          <th className="text-left p-3 px-5">Balance</th>
                          <th className="text-left p-3 px-5">Amount apply</th>
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
                              <td className="p-3 px-5">
                                <input
                                  onChange={(e) => handleChange(e, item.ID)}
                                  name="Amount"
                                  placeholder={(
                                    parseFloat(
                                      item.Amount.replace(/\$|,/gm, "")
                                    ) -
                                    parseFloat(
                                      item.Balance.replace(/\$|,/gm, "")
                                    )
                                  ).toString()}
                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                ></input>
                              </td>
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
          <div className="flex">
            <div className="w-4/6"></div>
            <div className="w-2/6 grid align-item-center">
              <div>Amount to Credit: {creditAmount}</div>
              <div className="p-2 border rounded w-96 h-full bg-gray-100">
                Solde de facture dû: {amountTotal}
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
                Utiliser credit
                <div className="px-2 pt-1">
                  <FaRegCreditCard />
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

export default Table_appliquer_crédit;
