import React, { useEffect, useState } from 'react'
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import { Container, Nav, Navbar, Table } from 'react-bootstrap';
import { FaCartArrowDown, FaTimes } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrashAlt } from "react-icons/fa";
import { DLT } from '../Redux/Action/Action';



const Header = () => {

  const [price, setPrice] = useState(0)
  // console.log(price);
  const getdata = useSelector((state) => state.cartreducer.carts)
  // console.log(getdata);
  const dispatch = useDispatch(0);
  const [anchorEl, setAnchorEl] = useState()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispatch(DLT(id))
  }

  const total = () => {
    let Price = 0;
    getdata.map((ele) => (
      Price = ele.price * ele.qnty + Price
    ))
    // console.log(Price);
    setPrice(Price);
  };

  useEffect(() => {
    total();
  }, [total])

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" style={{ height: '60PX' }}>
        <Container>
          <NavLink to="/" className='text-decoration-none text-light mx-3'>Add to cart</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className='text-decoration-none text-light'>Home</NavLink>
          </Nav>
          <Badge badgeContent={getdata.length} color="primary"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
            <FaCartArrowDown style={{ color: 'white', fontSize: '24px', cursor: 'pointer' }}></FaCartArrowDown>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {
            getdata.length ?
              <div className='card_details' style={{ width: "24remp", padding: 10 }}>
                <Table>
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getdata.map((e) => (
                        <>
                          <tr>
                            <td>
                              <NavLink to={`/Cads/${e.id}`} onClick={handleClose}>
                                <img src={e.thumbnail} style={{ width: '5rem', height: '5rem' }} alt="" />
                              </NavLink>
                            </td>
                            <td>
                              <p>{e.title}</p>
                              <p>Price : ₹{e.price}</p>
                              <p>Quantity : {e.qnty}</p>
                              <p style={{ color: 'red', fontSize: 20, cursor: 'pointer' }} onClick={() => dlt(e.id)}>
                                <FaTrashAlt className='smalltrash'></FaTrashAlt>
                              </p>
                            </td>
                            <td className='mt-5' style={{ color: 'red', fontSize: 20, cursor: 'pointer' }} onClick={() => dlt(e.id)}>
                              <FaTrashAlt className='largetrash'></FaTrashAlt>
                            </td>
                          </tr>
                        </>
                      ))
                    }
                    <p className='text-center'>Total : {price}</p>
                  </tbody>
                </Table>
              </div> :
              <div className='card_details d-flex justify-content-center align-content-around' style={{ width: '24rem', padding: 10, position: 'relative' }}>
                <FaTimes
                  onClick={handleClose}
                  style={{ position: 'absolute', top: 2, right: 20, fontSize: 24, cursor: 'pointer' }}></FaTimes>
                <p style={{ fontSize: 22 }}>Your Cart Is Empty</p>
              </div>
          }
        </Menu>
      </Navbar>
    </div>
  )
}

export default Header
