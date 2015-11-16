var Intercom = require('intercom-client');
var config = require('./config');
var chalk = require('chalk');

/**
 *  @param {Mozaik} mozaik
 */
const client = function(mozaik) {

  mozaik.loadApiConfig(config);

  const intercomClient = new Intercom.Client({ 
    appId: config.get('intercom.appId'), 
    appApiKey: config.get('intercom.token') 
  }).usePromises();

  const apiCalls = {

    getCompanies() {
      mozaik.logger.info(chalk.yellow(`[intercom] calling companies for appId : ${config.get('intercom.appId')}`));
      return intercomClient.companies.list().then(res => res.body.companies);
    },

    getUsers() {
      mozaik.logger.info(chalk.yellow(`[intercom] calling users for appId : ${config.get('intercom.appId')}`));
      return intercomClient.users.list().then(res => res.body.users);
    },

    getContacts() {
      mozaik.logger.info(chalk.yellow(`[intercom] calling contacts for appId : ${config.get('intercom.appId')}`));
      return intercomClient.contacts.list().then(res => res.body);      
    }

  };

  return apiCalls;

};

module.exports = client;