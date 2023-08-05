import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import './Css/style.css'
import { useDispatch } from 'react-redux';
import { Add } from '../Redux/Action/Action';


const Cads = () => {
  const [products, setProducts] = useState([])

  const dispatch = useDispatch()


  const send = (e) => {
    dispatch(Add(e));
  }
  axios.get('https://dummyjson.com/products')
    .then(function (response) {
      setProducts(response.data.products);
      // console.log(response.data.products);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  return (
    <div className='container mt-3'>
      <h2 className='text-center'>Add to Card Projects</h2>
      <div className="row d-flex justify-content-center align-content-around">
        {
          products.map((element, id) => (
            <Card style={{ width: '18rem', border: 'none' }} className='mx-2 mt-4 card_style'>
              <Card.Img variant="top" src={element.thumbnail} style={{ height: '12rem' }} className='mt-3' />
              <Card.Body>
                <Card.Title>{element.title}</Card.Title>
                <Card.Text>
                  Price : ₹ {element.price}
                </Card.Text>
                <div className="button_div d-flex justify-content-center">
                  <Button variant="primary" className='col-lg-12' onClick={() => send(element)}>Add to Cart</Button>
                </div>
              </Card.Body>
            </Card>
          ))
        }
      </div>
    </div>
  )
}

export default Cads
