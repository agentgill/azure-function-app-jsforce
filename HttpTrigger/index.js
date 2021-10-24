'use strict';

const jsforce = require('jsforce');

module.exports = async function (context, req) {
  context.log('Hello Mike');

  context.log('JavaScript HTTP trigger function processed a request.');

  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? 'Hello, ' + name + '. This HTTP triggered function executed successfully.'
    : 'This HTTP!!! triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
  context.log('Start Salesforce!');

  loginSalesforce();

  context.log('End Salesforce!');
};

async function loginSalesforce() {
  const conn = new jsforce.Connection({
    loginUrl: 'https://login.salesforce.com',
  });
  let loginDetails = await conn.login(
    process.env.SF_USERNAME,
    process.env.SF_PASSWORD,
    function (err, userInfo) {
      if (err) {
        return console.error(err);
      }
    }
  );
  console.log(loginDetails);
}
