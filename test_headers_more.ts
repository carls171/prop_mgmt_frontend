import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const propertyId = 1;
  const randomId = Math.floor(Math.random() * 1000000);
  
  const headers = ['id', 'income_id', 'income-id', 'X-ID', 'X-Income-ID'];

  for (const h of headers) {
    console.log(`Testing header: ${h}`);
    try {
      const res = await axios.post(`${API_TARGET}/income/${propertyId}`, {
        amount: 100,
        date: '2026-04-12',
        description: 'Test'
      }, {
        headers: { 
          'Content-Type': 'application/json', 
          'accept': 'application/json',
          [h]: randomId.toString()
        }
      });
      console.log(`SUCCESS with ${h}: ${res.status}`);
      return;
    } catch (err: any) {
      console.log(`  ${h} failed: ${err.response?.status}`);
      if (err.response?.data?.detail && typeof err.response.data.detail === 'string') {
        if (err.response.data.detail.includes('STRING cannot be inserted')) {
           console.log('  Reason: STRING error');
        }
      }
    }
  }
}

test();
