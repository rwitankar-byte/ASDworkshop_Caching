const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../database/db.json');


async function readData() {
  try {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data:', err);
    return [];
  }
}

app.get('/products', async (req,res)=>{
    // console.log("Inside products endpoint");
    let products = await readData();

    res.json(products);

    // res.send('Products endpoint');
})

app.get('/products/:id', async (req,res)=>{
    // console.log("Inside products endpoint");
    let products = await readData();
    const id = parseInt(req.params.id);
    const product = products.find((item) => item.id === id);
    res.json(product);

    // res.send('Products endpoint');
})


async function delayReadData(){
    await new Promise((resolve,reject)=>{
        setTimeout(resolve,1500)
    })
    return await readData();
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});