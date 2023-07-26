import React, { useState, useEffect } from "react";
import { Modal, Checkbox, Switch, message } from "antd";
import LoadingOutlined from "@ant-design/icons";
import { useSelector } from "react-redux";
import axios from "axios";
import { handleOutOfStock } from "../../services/handleOutOfStock";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";

function ProductModalForm({
  open,
  setOpen,
  formValues,
  outOfStockActivator,
  sample,
  setSample,
}) {
  const vendorEmail = useSelector((state) => state.users.email);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Appliances");
  const [productImages, setProductImages] = useState([]);
  const [isDraft, setIsDraft] = useState(false);
  const [someData, setSomeData] = useState(false);
  const [randomState, setRandomState] = useState(false);

  //Prepopulation of MOdal form
  useEffect(() => {
    if (formValues) {
      setProductName(formValues.name || "");
      setProductPrice(formValues.price || "");
      setProductDescription(formValues.description || "");
      setProductCategory(formValues.category || "Appliances");
      setProductImages(formValues.images || []);
      setIsDraft(formValues.isDraft || false);
      setSomeData(true);
      setRandomState(false);
    }
  }, [sample, formValues]);
  //Image Upload Props
  const [image, setImage] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleChange1 = ({ file: newFile, fileList: newFileList }) => {
    setFileList(newFileList); //Also appending the local list to keep track
    //If send then go and hit the api method
    newFile.status === "done" &&
      setImage([...image, `http://localhost:4000/mediaUpload/${newFile.response}`]);
  };

  const uploadButton = (
    <div>
      <PlusOutlined style={{ fontSize: "24px" }} />
      <div
        style={{
          marginTop: "8px",
          fontSize: "14px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Upload
      </div>
    </div>
  );

  // Adding/Editing
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (productName.trim().length === 0) {
      message.error("Product Name cannot be empty");
      setLoading(false);
      return;
    }

    // Check if the description field is empty or contains only blank spaces
    if (productDescription.trim().length === 0) {
      // Show an error message or handle the error in your desired way
      message.error("Product Description cannot be empty");
      setLoading(false);
      return;
    }
    const productObj = {
      name: productName,
      price: productPrice,
      description: productDescription,
      category: productCategory,
      vendorID: vendorEmail,
      isDraft: isDraft,
      images: image.length > 0 ? image : formValues?.images || [], // Set images to formValues.images if available, otherwise set it to the image state
      prodImage:
        "https://www.aptronixindia.com/media/catalog/product/i/p/iphone1164gbpurple_2.png",
    };

    //Adding the Product
    await axios
      .post("http://localhost:4000/products", productObj)
      .then((response) => {
        console.log("Product saved successfully ");
      })
      .catch((error) => {
        console.log(error);
      });
    setSample(!sample);
    setLoading(false);
    setOpen(false);
    setProductName("");
    setProductPrice();
    setProductDescription("");
    setProductCategory("Appliances");
    setProductImages([]);
    setIsDraft(false);
  };
  const handlePriceChange = (value) => {
    // Remove any non-numeric characters from the input value
    const numericValue = value.replace(/[^0-9]/g, "");
    // Limit the input length to a maximum of 6 digits
    const limitedValue = numericValue.slice(0, 6);
    // Update the state with the limited numeric value
    setProductPrice(limitedValue);
  };

  const onChange = async (productID, statusBoolean) => {
    setRandomState(true);
    await handleOutOfStock(productID, statusBoolean);
    // setSample(!sample);
  };

  const onkhaali = () => {
    setOpen(false);
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductCategory("Appliances");
    setProductImages([]);
  };

  return (
    <Modal
      title={someData ? "Edit Product" : "Add Product"}
      centered
      open={open}
      onCancel={() => onkhaali()}
      width={1200}
      footer={null}
    >
      <div className="profi">
        <form onSubmit={handleSubmit}>
          <div className="modalcontainer">
            <div className={someData ? "modealwq" : "modalLeft"}>
              <Upload
                action="http://localhost:4000/uploads"
                listType="picture-circle"
                fileList={fileList}
                onChange={handleChange1}
                name="image"
                showUploadList={{
                  showPreviewIcon: false,
                  showDownloadIcon: false,
                }}
                style={{ padding: "4rem" }}
              >
                {fileList.length >= 4 ? null : uploadButton}
              </Upload>
              <br />
              {someData ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flexStart",
                      width: "35rem",
                      paddingTop: "2rem",
                    }}
                  >
                    <img
                      src={productImages[0]}
                      alt=""
                      width="280rem"
                      height="250rem"
                    />
                    <img
                      src={productImages[1]}
                      alt=""
                      width="280rem"
                      height="250rem"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flexStart",
                      width: "35rem",
                    }}
                  >
                    <img
                      src={productImages[2]}
                      alt=""
                      width="280rem"
                      height="250rem"
                    />
                    <img
                      src={productImages[3]}
                      alt=""
                      width="280rem"
                      height="250rem"
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="modalRight">
              <p className="rightiu" style={{ paddingBottom: "1rem" }}>
                Product Name
              </p>
              <input
                type="text"
                className="rightium"
                required
                maxLength={20}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <p className="rightiu" style={{ paddingBottom: "1rem" }}>
                Product Category
              </p>
              <select
                name=""
                id=""
                required
                className="rightium1"
                style={{ paddingBottom: "1rem" }}
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option value="Appliances">Appliances</option>
                <option value="Clothes">Clothes</option>
                <option value="Shoes">Shoes</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Bags">Bags</option>
              </select>

              <p className="rightiu" style={{ paddingBottom: "1rem" }}>
                Description
              </p>
              <textarea
                required
                name=""
                id=""
                cols="20"
                className="rightium"
                style={{ resize: "none" }}
                rows="10"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              ></textarea>

              <p className="rightiu" style={{ paddingBottom: "1rem" }}>
                Price
              </p>
              <input
                required
                type="text" // Use text type to handle the custom validation
                className="rightium"
                value={productPrice}
                onChange={(e) => handlePriceChange(e.target.value)}
                onKeyDown={(e) => {
                  // Allow only numeric inputs (0-9) and prevent other characters
                  if (
                    !(
                      (e.key >= "0" && e.key <= "9") ||
                      e.key === "Backspace" ||
                      e.key === "Delete" ||
                      e.key === "Tab" ||
                      e.key === "Enter" ||
                      e.key === "ArrowLeft" ||
                      e.key === "ArrowRight" ||
                      e.key === "Home" ||
                      e.key === "End"
                    )
                  ) {
                    e.preventDefault();
                  }
                }}
              />

              <span>
                {" "}
                <Checkbox
                  onChange={(e) => setIsDraft(e.target.checked)}
                  checked={isDraft}
                >
                  <p id="bg">
                    <b>Add to Draft</b>
                  </p>
                </Checkbox>
              </span>

              {formValues?.stock === 0 ? (
                <b style={{ color: "red", marginLeft: "10rem" }}>
                  It is Marked Out of Stock{" "}
                </b>
              ) : (
                ""
              )}
              <input
                type="text"
                minValue="0"
                value={vendorEmail}
                style={{ visibility: "hidden" }}
              />

              <div className="stockflex" style={{ display: "flex" }}>
                <button
                  type="submit"
                  id="add-new-product"
                  style={{
                    width: "40%",
                    paddingBottom: ".6rem",
                    paddingTop: ".6rem",
                    marginRight: "2rem",
                    cursor: "pointer",
                    backgroundColor: "#2e2d2d",
                    color: "white",
                    marginTop: "2rem",
                    border: "none",
                    borderRadius: ".3rem",
                  }}
                >
                  {loading ? (
                    <LoadingOutlined style={{ color: "white" }} />
                  ) : (
                    `${someData ? "Edit" : "Add"}`
                  )}
                </button>

                {/*Means on edit and outofstockactivator is used for products not drafts*/}

                {someData && outOfStockActivator ? (
                  <>
                    <p
                      style={{
                        marginTop: "auto",
                        paddingRight: "1.4rem",
                        fontWeight: "600",
                        color: "gray",
                      }}
                    >
                      Mark Out of Stock
                    </p>
                    <Switch
                      style={{ marginTop: "2.3rem" }}
                      defaultChecked={!formValues.stock}
                      onChange={() =>
                        onChange(formValues?._id, !formValues?.stock)
                      }
                      disabled={randomState}
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ProductModalForm;
