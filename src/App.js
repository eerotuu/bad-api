import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'

const addr = 'https://bad-api-assignment.reaktor.com/'
const timeInterval = 300000

function App() {

  const didMount = useRef(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [type, setType] = useState('jackets')
  const [jackets, setJackets] = useState([])
  const [shirts, setShirts] = useState([])
  const [accessories, setAccesories] = useState([])
 
  useEffect(() => {
    if(!didMount.current) {
      request()
      setInterval(request, timeInterval)
      didMount.current = true
    } 
  }, [])

  const request = async () => {
   
    const headers = { 
      headers: { 
        'Accept': 'application/json'
      } 
    }
    const types = ['jackets', 'shirts', 'accessories']
    const product_requests = []
    types.forEach(t => {
      product_requests.push(axios.get(`${addr}products/${t}`, headers))
    })

    Promise.all(product_requests).then(results => {
      let combined_results = []
      let manufacturers = []
      let availability_requests = []

      // combine product data
      results.forEach(response => {
        combined_results = combined_results.concat(response.data)
      })
      // create availability requests for each manufacturer
      combined_results.forEach(e => {
        if(typeof(e.manufacturer) !== 'undefined'  && !manufacturers.includes(e.manufacturer)){
          manufacturers.push(e.manufacturer)
          availability_requests.push(axios.get(`${addr}availability/${e.manufacturer}`, headers))
        }
      })

      Promise.all(availability_requests).then(results => {
        let arr = []

        // combine availability data
        results.forEach(response => {
          arr = arr.concat(response.data.response)
        })

        // merge products and availability
        let result = [...[combined_results, arr].reduce((a, c) => (
          c.forEach(o => {
            if(typeof(o.id) !== 'undefined') {
              let id = (o.id).toLowerCase()
              if(a.has(id)) {
                if(typeof(o.DATAPAYLOAD) !== 'undefined') {
                  o.DATAPAYLOAD = o.DATAPAYLOAD.replace(/<[^>]*>|\\n| /g, '')
                }
                a.set(id, Object.assign(a.get(id), o))
              } else if(typeof(o.type) !== 'undefined') { 
                o.DATAPAYLOAD = 'UNKNOWN'
                a.set(id, o)
              }   
            }
            
          }), a
        ), new Map).values()];

        // seperate result into category arrays for reducing render times when switching category
        let j = []
        let s = []
        let a = []
        result.forEach(e => {
          if (e.type === 'jackets') {
            j.push(e)
          }
          else if (e.type === 'shirts') {
            s.push(e)
          }
          else if (e.type === 'accessories') {
            a.push(e)
          }
        })
        setJackets(j)
        setShirts(s)
        setAccesories(a)
        setData(j)
        setLoading(false)
      })
    })
  }

  const handleJacketClick = () => {
    setType("Jackets")
    setData(jackets)
  }

  const handleShirtClick = () => {
    setType("Shirts")
    setData(shirts)
  }

  const handleAccessoriesClick = () => {
    setType("Accessories")
    setData(accessories)
  }

  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Bad-Api</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={handleJacketClick}>Jackets</Nav.Link>
            <Nav.Link onClick={handleShirtClick}>Shirts</Nav.Link>
            <Nav.Link onClick={handleAccessoriesClick}>Accessories</Nav.Link>
          </Nav>
      </Navbar>

      <Content data={data} type={type} loading={loading} />

    </div>
  )
}

const Content = ({ data, type, loading }) => {

  const rows = () => {
    return data.map((product, i) => {
        return (
          <tr key={i}>
            <td>{product.name}</td>
            <td>{product.color.join(', ')}</td>
            <td>{product.manufacturer}</td>
            <td>{product.price}</td>
            <td>{product.DATAPAYLOAD}</td>
          </tr>
        )
    })
  }

  return (
    <Container>
        <Row className="justify-content-center" style={{margin: "1rem"}}> 
          <h1>{type}</h1>
        </Row>
        <Row className="justify-content-center">
        {loading
        ? <Spinner animation="border" style={{width: "10rem", height: "10rem"}}/>    
        : <Table responsive size="sm">
            <thead>
              <tr>
                <th>Product name</th>
                <th>Available colors</th>
                <th>Manufacturer</th>
                <th>Price</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>{rows()}</tbody>
          </Table>        
        }
        </Row>
      </Container>
  )
}

export default App;