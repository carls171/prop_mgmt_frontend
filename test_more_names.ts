import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const propertyId = 1;
  const randomId = Math.floor(Math.random() * 1000000);
  
  const names = ['pk', 'uid', 'uuid', 'key', 'record_id', 'row_id'];

  for (const n of names) {
    console.log(`Testing field name: ${n}`);
    try {
      const res = await axios.post(`${API_TARGET}/income/${propertyId}`, {
        [n]: randomId,
        amount: 100,
        date: '2026-04-12',
        description: 'Test'
      }, {
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
      });
      console.log(`SUCCESS with ${n}: ${res.status}`);
      return;
    } catch (err: any) {
      console.log(`  ${n} failed: ${err.response?.status}`);
      if (err.response?.data?.detail && typeof err.response.data.detail === 'string') {
        if (err.response.data.detail.includes('cannot be null')) {
          console.log('  Reason: cannot be null');
        } else if (err.response.data.detail.includes('STRING cannot be inserted')) {
          console.log('  Reason: type error');
        }
      }
    }
  }
}

test();
