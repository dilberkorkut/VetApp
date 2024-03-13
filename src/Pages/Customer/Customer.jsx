import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
// import UpdateIcon from "@mui/icons-material/Update";
import UpdateIcon from "@mui/icons-material/Edit";

import {
  getCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomerFunc,
} from "../../API/customer";
import "./Customer.css";

//------------------------------Use State-----------------------------

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [reload, setReload] = useState(true);
  const [search, setSearch] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });
  const [updateCustomer, setUpdateCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  //------------------------------Use Effect-----------------------------
  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
      setSearchResults(data);
    });
    setReload(false);
  }, [reload]);

  //------------------------------New Customer-----------------------------
  const handleNewCustomer = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
    console.log(newCustomer);
  };

  const handleNewCustomerBtn = () => {
    console.log(newCustomer);
    createCustomer(newCustomer).then(() => {
      setReload(true);
    });
    setNewCustomer({
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  console.log(customers);

  //------------------------------Delete Customer-----------------------------
  const handleDelete = (id) => {
    deleteCustomer(id).then(() => {
      setReload(true);
    });
  };

  //------------------------------Update Customer-----------------------------
  const handleUpdateCustomerInputs = (event) => {
    setUpdateCustomer({
      ...updateCustomer,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateCustomerBtn = () => {
    updateCustomerFunc(updateCustomer).then(() => {
      setReload(true);
    });
    setUpdateCustomer({
      name: "",
      phone: "",
      mail: "",
      address: "",
      city: "",
    });
  };

  const handleUpdateIcon = (customer) => {
    console.log(customer);
    setUpdateCustomer(customer);
  };

  //------------------------------Search Customer-----------------------------
  const handleSearch = () => {
    const filteredCustomer = searchResults.filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase())
    );
    setCustomers(filteredCustomer);
  };

  return (
    <div className="container">
      {/*--------------------------New Customer Input Button------------------------ */}
      <div className="customer-newcustomer">
        <h1>Musteri Yonetimi</h1>
        <h3>Musteri Ekle</h3>

        <input
          type="text"
          placeholder="Adi"
          name="name"
          value={newCustomer.name}
          onChange={handleNewCustomer}
        />
        <input
          type="text"
          placeholder="Telefon"
          name="phone"
          value={newCustomer.phone}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="E-mail"
          name="mail"
          value={newCustomer.mail}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="Adres"
          name="address"
          value={newCustomer.address}
          onChange={handleNewCustomer}
        />

        <input
          type="text"
          placeholder="Sehir"
          name="city"
          value={newCustomer.city}
          onChange={handleNewCustomer}
        />

        <button onClick={handleNewCustomerBtn}>Create</button>
      </div>

      {/* -------------------------Update Customer Input Button------------------------ */}
      <div className="customer-updatecustomer">
        <h3>Musteri Guncelle</h3>

        <input
          type="text"
          placeholder="Adi"
          name="name"
          value={updateCustomer.name}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Telefon"
          name="phone"
          value={updateCustomer.phone}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="E-mail"
          name="mail"
          value={updateCustomer.mail}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Adres"
          name="address"
          value={updateCustomer.address}
          onChange={handleUpdateCustomerInputs}
        />
        <input
          type="text"
          placeholder="Sehir"
          name="city"
          value={updateCustomer.city}
          onChange={handleUpdateCustomerInputs}
        />
        <button onClick={handleUpdateCustomerBtn}>Update</button>
      </div>

      {/* ---------------------------Search Customer Input Button------------------------ */}
      <div className="search-bar">
      <h3>Musteri Ara</h3>
        <input
          type="text"
          placeholder="isim giriniz... "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* ------------------------------List Customer ----------------------------- */}
      <div className="list">
        <h3>Musteri Listesi</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Ad Soyadi</th>
                <th>E-mail</th>
                <th>Adres</th>
                <th>Sehir</th>
                <th>Telefon</th>
                <th>Islemler</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.mail}</td>
                  <td>{customer.address}</td>
                  <td>{customer.city}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <span onClick={() => handleUpdateIcon(customer)}>
                      <UpdateIcon />
                    </span>
                    <span onClick={() => handleDelete(customer.id)}>
                      <DeleteIcon />
                    </span>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Customer;


























































{
  /* <div className="list">
        <h2>Customer Listesi</h2>
        
        {customers.map((customer) => (
          <div key={customer.id}>
            <h3>
              {customer.name} {customer.id}
              <span id={customer.id} onClick={() => handleDelete(customer.id)}>
                <DeleteIcon />
              </span>{" "}
              <span onClick={() => handleUpdateIcon(customer)}>
                {" "}
                <UpdateIcon />{" "}
              </span>
            </h3>{" "}
            {customer.address}
          </div>
        ))}
      </div> */
}
//     </>
//   );
// }

// export default Customer;
