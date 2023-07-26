const imageController =  (req, res) => {
    const productImage = req.file.filename;
    res.send(productImage);
  }

module.exports = {imageController}
