const express = require("express");
const app = express();
const port = 9000;

const { Product } = require("./models");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "App running ...",
  });
});

app.post("/item/create", async (req, res) => {
  try {
    console.log(req.body);
    const products = await Product.create(req.body);

    res.status(200).json({
      code: 200,
      status: "SUCCESS",
      message: "Created Product Succesfully",
      products,
    });
  } catch (error) {
    res.status(501).json({
      code: 501,
      message: error.message,
    });
  }
});

app.get("/item/get", async (req, res) => {
  try {
    const products = await Product.findOne({
      where: {
        type: req.body.type,
        barcode: req.body.barcode,
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      code: 200,
      status: "SUCCESS",
      message: "Get One Product Succesfully",
      products,
    });
  } catch (error) {
    res.status(501).json({
      code: 501,
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Warung Faiza running on http://localhost:${port}`);
});
