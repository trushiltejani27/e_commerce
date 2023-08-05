import { green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, Add, REMOVE } from '../Redux/Action/Action';

const CardDetailes = () => {
  const [data, setData] = useState([])
  // console.log(data);


  const { id } = useParams()
  // console.log(id);


  const getdata = useSelector((state) => state.cartreducer.carts)
  // console.log(getdata);

  const histroy = useNavigate();

  const dispatch = useDispatch();


  const send = (e) => {
    dispatch(Add(e));
  }

  const dlt = (id) => {
    dispatch(DLT(id));
    histroy('/');
  }

  const remove = (item) => {
    dispatch(REMOVE(item))
  }

  const comare = () => {
    let comparedata = getdata.filter((e) => (
      e.id == id
    ))
    setData(comparedata);

  }
  useEffect(() => {
    comare();
  }, [id])

  return (
    <div className='container mt-2'>
      <h2 className='text-center'>Iteams Details Page</h2>
      <section className='container mt-3'>
        <div className="iteamsdetails">
          {
            data.map((e) => (
              <>
                <div className="items_img">
                  <img src={e.thumbnail} alt="" />
                </div>
                <div className="details">
                  <Table>
                    <tr>
                      <td>
                        <p> <strong>Name</strong> : {e.title}</p>
                        <p> <strong>Price</strong> : ₹ {e.price}</p>
                        <p> <strong>Category</strong> : {e.category}</p>
                        <p> <strong>Total</strong> : ₹{e.price * e.qnty}</p>
                        <div className='mt-5 d-flex justify-content-between align-align-content-center' style={{ width: 100, cursor: 'pointer', background: '#ddd', color: '#111' }}>
                          <span style={{ fontSize: 24 }} onClick={e.qnty <= 1 ? () => dlt(e.id) : () => remove(e)}>-</span>
                          <span style={{ fontSize: 22 }}>{e.qnty}</span>
                          <span style={{ fontSize: 24 }} onClick={() => send(e)}>+</span>
                        </div>
                      </td>
                      <td>
                        <p> <strong>Rating : </strong><span style={{ background: 'green', color: '#fff', padding: '2px 5px', borderRadius: "5px" }}>{e.rating}★</span></p>
                        <p> <strong>Description:</strong><span>{e.description}</span></p>
                        <p> <strong>Remove :</strong><FaTrashAlt style={{ color: 'red', fontSize: 20, cursor: 'pointer' }} onClick={() => dlt(e.id)}></FaTrashAlt></p>
                      </td>
                    </tr>
                  </Table>
                </div>
              </>
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default CardDetailes
