const fs = require('fs');
const { execSync } = require('child_process');

if(!fs.existsSync(process.env.SERVICES_CONF_DIRENAME)) {
      let stdout = execSync(`sudo mkdir ${process.env.SERVICES_CONF_DIRENAME}`);
      console.log(stdout)
}