const http = require("http");
const v1 = require("./api/v1/api.v1.index");
const ProjectHelper = require("./api/v1/helper/project.helper");

http.createServer(v1.server).listen(v1.port, async () => {
  console.log(`
    _____________________________________
    
    RES SERVICE
      - HOST: ${ProjectHelper.getEnviromentValue("SERVICE_IP")}        
      - PORT: ${v1.port}        
    _____________________________________
  `);
});
