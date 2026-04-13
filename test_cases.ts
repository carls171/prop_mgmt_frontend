import axios from 'axios';

const API_TARGET = "https://prop-mgmt-api-1064799326078.us-central1.run.app";

async function test() {
  const propertyId = 1;
  const randomId = Math.floor(Math.random() * 1000000);
  
  const cases = ['incomeId', 'IncomeId', 'INCOME_ID', 'income_id', 'Income_id'];

  for (const c of cases) {
    console.log(`Testing field name: ${c}`);
    try {
      const res = await axios.post(`${API_TARGET}/income/${propertyId}`, {
        [c]: randomId,
        amount: 100,
        date: '2026-04-12',
        description: 'Test'
      }, {
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
      });
      console.log(`SUCCESS: ${res.status}`);
      return;
    } catch (err: any) {
      console.log(`FAILED: ${err.response?.status || err.message}`);
    }
  }
}

test();
