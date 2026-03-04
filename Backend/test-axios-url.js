const axios = require('axios');

async function test() {
    console.log("Test 1: baseURL with slash, call with slash");
    const inst1 = axios.create({ baseURL: 'http://localhost:4000/api/' });
    console.log("Request to '/user/signup' ->", inst1.getUri({ url: '/user/signup' }));

    console.log("\nTest 2: baseURL NO slash, call with slash");
    const inst2 = axios.create({ baseURL: 'http://localhost:4000/api' });
    console.log("Request to '/user/signup' ->", inst2.getUri({ url: '/user/signup' }));

    console.log("\nTest 3: baseURL with slash, call NO slash");
    const inst3 = axios.create({ baseURL: 'http://localhost:4000/api/' });
    console.log("Request to 'user/signup' ->", inst3.getUri({ url: 'user/signup' }));
}

test();
