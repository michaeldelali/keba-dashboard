import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Image } from '@themesberg/react-bootstrap';
import  QRCode  from "qrcode";

function QrCodeGen(props) {
  const [imageUrl, setImageUrl] = useState("");
  	const [url, setUrl] = useState('')
	// const [qr, setQr] = useState('')
    const [table, setTable] = useState(props.link)

     useEffect(() => {
        const GenerateQRCode = () => {
            QRCode.toDataURL(url, {
                width: 800,
                margin: 2,
                color: {
                    dark: '#335383FF',
                    light: '#EEEEEEFF'
                }
            }, (err, url) => {
                if (err) return console.error(err)
    
                console.log(url)
                setImageUrl(url)
            })
     
        }
            async function generateNow () {
                const url = `${process.env.REACT_APP_BASE_URL}/tables/scanTable?branchId=${table.branchId}&number=${table.number}`
                setUrl(()=>url)
                GenerateQRCode()
            }
   
            generateNow()
    }, [table, url])

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "table_"+table.number+"_qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
      <Container fluid className="bg-light py-5">
          <Row>
              <Row>
                  <Col>
                      <h1>QR Code for table {table.number}</h1>
                      <p className="lead">Scan the QR code to view the menu and order food.</p>
                  </Col>
              </Row>
              <Row className="my-5 d-flex justify-content-center align-item-center">
                  <Col xs={12} md={6}>
                      <Image src={imageUrl} alt="QR code" fluid />
                  </Col>
                  <Col xs={12} md={6} className="d-flex align-items-center" fluid>
                      {imageUrl && (
                          <Button
                          className="w-100"
                              variant="primary"
                              size="lg"
                              block
                              onClick={downloadQRCode}
                          >
                              Download QR Code
                          </Button>
                      )}
                  </Col>
              </Row>
          </Row>
      </Container>
  );
}

export default QrCodeGen;


// import QRCode from 'qrcode'
// import { useState } from 'react'
// import { useEffect } from 'react'
// import { Button, Col, Row } from '@themesberg/react-bootstrap';
// import axios from '../api/axios';


// function QrCodeGen(props) {
// 	const [url, setUrl] = useState('')
// 	const [qr, setQr] = useState('')
//     const [table, setTable] = useState(props.link)
//     console.log("PROPS IN QRCODE:: ",table);

//     useEffect(() => {
//         const GenerateQRCode = () => {
//             // make a post request to the https://www.qrcode-monkey.com
//             // api to generate a qr code
//             // axios.post('https://qrcode-monkey.p.rapidapi.com/qr/custom', {
//             //     "data": "https://www.qrcode-monkey.com",
//             //     "config": {
//             //         "body": "circle",
//             //         "logo": "#facebook"
//             //     },
//             //     "size": 300,
//             //     "download": false,
//             //     "file": "svg"
//             // })
//             // .then((response) => {
//             //     setQr(response.data)
//             // }
//             // )
//             // .catch((error) => {
//             //     console.log(error)
//             // }
//             // )
//             QRCode.toDataURL(url, {
//                 width: 800,
//                 margin: 2,
//                 color: {
//                     dark: '#335383FF',
//                     light: '#EEEEEEFF'
//                 }
//             }, (err, url) => {
//                 if (err) return console.error(err)
    
//                 console.log(url)
//                 setQr(url)
//             })
     
//         }
//             async function generateNow () {
//                 const url = `${process.env.REACT_APP_BASE_URL}/tables/scanTable?branchId=${table.branchId}&number=${table.number}`
//                 setUrl(()=>url)
//                 GenerateQRCode()
//             }
   
//             generateNow()
//     }, [table, url])


	

// 	return (
// 		<Row className='d-flex flex-row justify-content-center'>
// 			<h1>QR Code for Table Number {props.link.number}</h1>
// 			{/* <input 
// 				type="text"
// 				placeholder="e.g. https://google.com"
// 				value={url}
// 				onChange={e => setUrl(e.target.value)} />
// 			<button onClick={GenerateQRCode}>Generate</button> */}
// 			{qr && <>
// 				<img src={qr} alt='qr_code'/>
//                 <Button href={qr} download={"table_"+props.link.number+".png"}>Download</Button>
// 			</>}
//         </Row>
// 	)
// }

// export default QrCodeGen