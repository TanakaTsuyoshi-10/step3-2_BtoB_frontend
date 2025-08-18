const https = require('https');
const { URLSearchParams } = require('url');

const testAuth = () => {
  const data = new URLSearchParams();
  data.set('username', 'admin@example.com');
  data.set('password', 'StrongP@ssw0rd!');

  const options = {
    hostname: 'app-002-gen10-step3-2-py-oshima2.azurewebsites.net',
    port: 443,
    path: '/api/v1/login/access-token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://app-002-gen10-step3-2-node-oshima2.azurewebsites.net'
    }
  };

  const req = https.request(options, (res) => {
    console.log(`\n=== PRODUCTION E2E TEST RESULT ===`);
    console.log(`Status: ${res.statusCode}`);
    console.log(`CORS Headers:`);
    Object.keys(res.headers).filter(h => h.includes('access-control')).forEach(h => {
      console.log(`  ${h}: ${res.headers[h]}`);
    });
    
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log(`Response Body: ${responseData}`);
      try {
        const parsed = JSON.parse(responseData);
        if (parsed.access_token) {
          console.log('✅ Authentication successful!');
          console.log(`Access token received: ${parsed.access_token.substring(0, 20)}...`);
        } else {
          console.log('❌ Authentication failed - no access token');
        }
      } catch (e) {
        console.log('❌ Could not parse JSON response');
      }
      console.log('==================================\n');
    });
  });

  req.on('error', (e) => {
    console.error(`❌ Request error: ${e.message}`);
  });

  req.write(data.toString());
  req.end();
};

testAuth();