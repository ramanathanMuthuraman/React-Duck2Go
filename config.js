//localhost configuration
var PORT = 3000;
var HOSTNAME = "http://localhost";

//Cloud 9 Configuration (https://c9.io/)
if(process.env.PORT && process.env.C9_HOSTNAME){
	PORT = process.env.PORT;
	HOSTNAME = process.env.C9_HOSTNAME;
}
//codio Configuration (https://codio.com/)
if(process.env.CODIO_BOX_DOMAIN){
    //http://forum.codio.com/t/please-export-hostname-environment-variable/1607
    HOSTNAME = process.env.CODIO_BOX_DOMAIN;
}

module.exports = {
	"PORT" : PORT,
	"HOSTNAME" : HOSTNAME
}