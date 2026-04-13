import axios from 'axios';
import qs from 'qs';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const propertyId = 1;
  const randomId = Math.floor(Math.random() * 1000000);
  
  console.log('Testing form-urlencoded...');
  try {
    const res = await axios.post(`${API_TARGET}/income/${propertyId}`, qs.stringify({
      income_id: randomId,
      amount: 100,
      date: '2026-04-12',
      description: 'Test'
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'accept': 'application/json' }
    });
    console.log(`SUCCESS: ${res.status}`);
  } catch (err: any) {
    console.log(`FAILED: ${err.response?.status || err.message}`);
  }
}

test();
