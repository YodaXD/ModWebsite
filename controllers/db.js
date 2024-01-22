const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
/* Una funcion para crear una ID Random */  
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
/* Una funcion para sacar el identificador desde la base de datos con la key */
async function getIdentificatorFromKey(key) {
    const [rows, fields] = await db.query('SELECT * FROM yodauth WHERE `key` = ?', [key]);
    return rows[0].duid;
}
/* Una funcion para sacar el identificador desde la Key */
async function getKeyfromIdentificator(identificator) {
  const [rows, fields] = await db.query('SELECT * FROM yodauth WHERE `duid` = ?', [identificator]);
  return rows[0].key;
}
/* Una funcion para sacar el rango del usuario de la base de datos con el identificador */
async function getRankFromIdentificator(identificator) {
  const [rows, fields] = await db.query('SELECT * FROM yodauth WHERE `duid` = ?', [identificator]);
  return rows[0].type;
}
/* Una funcion para checkear si el usuario existe en la base de datos */
async function checkuser(identificator) {
  const [rows, fields] = await db.query('SELECT * FROM yodauth WHERE `duid` = ?', [identificator]);
  const length = rows.length;
  if (length == 0) {
    return false;
  }
  else if (length > 0) {
    return true;
  }
}
/* Una funcion para logear al usuario checkeando si la key existe en la base de datos */
async function login(key) {
  const [rows, fields] = await db.query('SELECT * FROM yodauth WHERE `key` = ?', [key]);
  const length = rows.length;
  if (length == 0) {
    return false;
  }
  else if (length > 0) {
    return true;
  }
}
/* Una funcion para registrar el usuario, cogiendo el identificador, creando una ID con la funcion MAKEID crea una tabla en la base de datos
antes de ello con la funcion checkuser identifica si el usuario esta ya registrado */
async function register(identificator){
  const key = makeid(24)
  const type ="user"
  const check = await checkuser(identificator)
    if (check == true){
      return "Ya tienes una cuenta"
    }
    else if (check == false){
     const [rows, fields] = await db.query('INSERT INTO yodauth (`duid`,`key`,`type`) VALUES(?,?,?)', [identificator,key,type]);   
     return `Tu cuenta ha sido creada correctamente, tu key es ${key}`
  }
};
/* Una funcion para checkear cuantos usuarios hay con el mismo RANGO */
async function typecount(type){
  const [rows, fields] = await db.query('SELECT * FROM yodauth WHERE `type` = ?', [type]);
  return rows.length.toString();
}
/* Una funcion para recoger datos de todos los usuarios que tengan el mismo rango */
async function getSpecificData(type){
  const [rows, fields] = await db.query('SELECT * FROM yodauth WHERE `type` = ?', [type]);
  return rows;
}
/* Una funcion para recoger la URL de la imagen con el identificador de la imagen */
async function getSpecificDataImage(identificator){
  const [rows, fields] = await db.query('SELECT * FROM yodauth WHERE `duid` = ?', [identificator]);
  return rows[0].image;
}
/* Una funcion para ecoger todos los datos de la base de datos */
async function getData(){
  const [rows, fields] = await db.query('SELECT * FROM yodauth');
  return rows;
}

module.exports = {getKeyfromIdentificator,getIdentificatorFromKey, getRankFromIdentificator,checkuser,register,typecount,login,getSpecificData, getData,getSpecificDataImage };