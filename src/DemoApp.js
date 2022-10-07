import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import ABI_JSON from './abi.json';

function App() {
  const [uri, setUri] = useState('');
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contractAddress = '0xbe1fba6e405c0380007f053ca0a2174f04fee4e7';
  const ABI = ABI_JSON
  const contract = new ethers.Contract(contractAddress, ABI, signer);
 

  const getUri = async () => {
    try {
      const uri = await contract.baseTokenURI();
      setUri(uri);
    } catch (error) {
      console.log("getUri Error: ", error);
    }
  }

  async function updateUri() {
    var new_uri = document.getElementById('texto-uri').value;
    try {
    await contract.setBaseTokenURI(new_uri);
    } catch (error) {
      console.log("updateUri Error: ", error);
    }

  }

  getUri()
  .catch(console.error)

  return (
    <div className="container">
      <div className="row mt-5">

        <div className="col">
          <h3>Stored URI</h3>
          <p>{uri}</p>
        </div>

        <div className="col">
          <h3>Update Uri</h3>
          <input type="text" id="texto-uri" name="name" />


          <button type="submit" className="btn btn-dark" 
onClick={updateUri}>Update</button>
        </div>
      </div>
    </div>
  );

}


export default App;