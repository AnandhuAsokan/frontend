import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./home.css";

function Orders() {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const signOut = () =>{
    localStorage.removeItem('token');
    navigate('/');
}

  return (
    <div className="content">
      <h2 className="text-light text-center my-4"> Order history </h2>
      <div style={{position:"absolute", top:30, right:50}}>
        <Link to='/home' className="btn btn-outline-light">Home</Link>
        <Link onClick={signOut} className="btn btn-outline-light ml-3"> Sign Out</Link>        
        </div>
      <div className="container-fluid" id="card-container">
        <table className="table table-borderless" id="home">
          <tbody>
            {Data.map((product, index) => (
              <tr key={index} className="row align-items-center">
                <td
                  className="col-lg-4 col-md-4 col-sm-12 text-center"
                  id="history-img"
                >
                  <img
                    src={`http://localhost:8000/${product.Image}`}
                    alt="thumbnail"
                    className="img-fluid rounded"
                    style={{
                      maxHeight: "200px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td
                  className="col-lg-4 col-md-4 col-sm-12 text-center"
                  id="Product_name"
                  style={{ wordWrap: "break-word" }}
                >
                  <h5 className="text-light">{product.Name}</h5>
                  <p className="text-light">{product.Description}</p>
                  <p className="text-light" style={{ fontSize: "1.2rem" }}>
                    MRP :{product.Price}
                  </p>
                  <p className="text-light">
                    you bought it for{" "}
                    <span style={{ fontSize: "1.2rem" }}>
                      {product.lastPrice}{" "}
                    </span>{" "}
                    (after discount and adding GST )
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
