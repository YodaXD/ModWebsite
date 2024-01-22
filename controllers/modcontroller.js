const { json } = require("express");
const express = require("express");

const fs = require("fs");
const app = require("express");

/* Una funcion para crear un archivo JSON con el identificador del usuario. */
function createpersonalgh(identificator){
    if (!fs.existsSync(`./data/${identificator}.json`)){
        fs.writeFileSync(`./data/${identificator}.json`, "[]")
    }
}
/* Una funcion para limpiar el archivo con el identificador del usuario "Vaciar de Componentes" */
function cleanpersonalgh(identificator){
    if (fs.existsSync(`./data/${identificator}.json`)){
        fs.writeFileSync(`./data/${identificator}.json`,"[]")
    }
}

/* Una funcion para guardar los datos del usuario en el archivo JSON (identificador, URL Imagen, Script, Titulo, Descripcion)*/
async function savedatapersonalgh(identificator,image,script,title,description){
    const scripts = JSON.parse(fs.readFileSync(`./data/${identificator}.json`,'utf8'));
    scripts.push({
        "image":image,
        "name":title,
        "description":description,
        "author":identificator,
        "script":script
    })
    fs.writeFile(`./data/${identificator}.json`,JSON.stringify(scripts),(err)=>{
        if (err) {
           console.log(err)
        }
        else {
            console.log("Success")
        }
    }
)}
/* Mete la informacion en el archivo general de la website */
async function savecommunitydata(identificator,image,script,title,description){
    const scripts = JSON.parse(fs.readFileSync(`./community.json`,'utf8'));
    scripts.push({
        "thumbnail":image,
        "name":title,
        "description":description,
        "author":identificator,
        "script":script
    })
    fs.writeFile(`./community.json`,JSON.stringify(scripts),(err)=>{
        if (err) {
           console.log(err)
        }
        else {
            console.log("Success")
        }
    }
)}
/* Devuelve toda la informacion almacenada en el archivo comunitario */
async function showcommunity(){
    const scripts = JSON.parse(fs.readFileSync(`./community.json`, "utf-8"))
    return scripts
}
/* Devuelve toda la informacion almacenada en el archivo del usuario con el identificador */
async function showdatapersonalgh(identificator){
    const scripts = JSON.parse(fs.readFileSync(`./data/${identificator}.json`, "utf-8"))
    return scripts
}
/* Cuenta cuantos componentes tiene el archivo JSON comunitario */
function countcommunity(){
    const scripts = JSON.parse(fs.readFileSync(`./community.json`, "utf-8"))
    var number = scripts.length
    return number
}
/* Cuenta cuantos componentnes tiene el archivo JSON con el identificador */
function countscriptsprivate(identificator){
    const scripts = JSON.parse(fs.readFileSync(`./data/${identificator}.json`, "utf-8"))
    var number = scripts.length
    return number
}
/* Funcion para eliminar un objeto del archivo JSON */
const deleteObj = (data, column, search) => {
    let result = data.filter(m => m[column] !== search);
  
    return result;
  }

/* Funcion para eliminar un objeto del archivo JSON con el identificador "Encuentra el objeto con el nombre" */
function deletescript(identificator, scriptname){
    const scripts = JSON.parse(fs.readFileSync(`./data/${identificator}.json`, "utf-8"))
    const deleted = deleteObj(scripts,'name',scriptname)
   console.log(deleted)
    fs.writeFile(`./data/${identificator}.json`,JSON.stringify(deleted,null,2),(err)=>{
        if (err) {
           console.log(err)
        }
        else {
            console.log("Success")
        }
    })
    
}
/* Una funcion para eliminar el objeto con el nombre en el archivo comunitario */
function deletescriptCom(scriptname){
    const scripts = JSON.parse(fs.readFileSync(`./community.json`, "utf-8"))
    const deleted = deleteObj(scripts,'name',scriptname)
    fs.writeFile(`./community.json`,JSON.stringify(deleted,null,2),(err)=>{
        if (err) {
           console.log(err)
        }
        else {
            console.log("Success")
        }
    })
    
}
/* Funcion para contar cuantos ficheros hay en la carpeta de data */
function countFilesData() {
    try {
      const files = fs.readdirSync(`./data`);
      return files.length;
    } catch (error) {
      console.error(`Error counting files in directory: ${error}`);
      return -1;
    }
}

module.exports = {countFilesData,countcommunity,showcommunity,savecommunitydata,createpersonalgh, cleanpersonalgh,savedatapersonalgh, showdatapersonalgh, countscriptsprivate,deletescript,deletescriptCom}