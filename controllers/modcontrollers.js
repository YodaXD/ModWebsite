const { json } = require("express");
const express = require("express");

const fs = require("fs");
const app = require("express");

/* Devuelve toda la informacion almacenada en el archivo comunitario */
async function modcom(){
    const scripts = JSON.parse(fs.readFileSync(`./data/cmods.json`, "utf-8"))
    return scripts
}

module.exports = {modcom};