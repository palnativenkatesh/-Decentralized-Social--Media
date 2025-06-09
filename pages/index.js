import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import MessageFeed from '../components/MessageFeed';

export default function Home() {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  async function connectWallet() {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAddress(account);
  }

  async function signIn() {
    const msg = "Sign in to Decentralized Social!";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(msg);
    const address = await signer.getAddress();

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, signature, message: msg })
    });

    if (res.ok) setAddress(address);
    else alert("Authentication failed");
  }

  async function postMessage() {
    const res = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, message: inputMessage })
    });

    if (res.ok) {
      setInputMessage('');
      setMessage('Message posted!');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Decentralized Social Media</h1>
      {!address ? (
        <>
          <button onClick={connectWallet}>Connect Wallet</button>
          <button onClick={signIn}>Sign In with Ethereum</button>
        </>
      ) : (
        <div>
          <p>Logged in as: {address}</p>
          <textarea
            placeholder="What's on your mind?"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <br />
          <button onClick={postMessage}>Post</button>
          {message && <p>{message}</p>}
        </div>
      )}
      <MessageFeed />
    </div>
  );
}

