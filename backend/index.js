

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001;

app.post("/calculate", (req,res)=>{
    const {num1, num2} = req.body;
    const result = Number(num1) + Number(num2);
    res.json({result});
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}!`);
});

