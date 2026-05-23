import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Api, handleApiError } from "../../../helper/ApiHelper";

const TAG_OPTIONS = [
  { value: "Electronics", label: "Electronics" },
  { value: "Clothing", label: "Clothing" },
  { value: "Food", label: "Food" },
  { value: "Sports", label: "Sports" },
  { value: "Books", label: "Books" },
  { value: "Toys", label: "Toys" },
  { value: "Health", label: "Health" },
  { value: "Beauty", label: "Beauty" },
  { value: "Home", label: "Home" },
  { value: "Garden", label: "Garden" },
];

const Create = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(selectedTags);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setImagePreview(reader.result);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const data = {
      name: name,
      description: description,
      price: price,
      tags: JSON.stringify(selectedTags),
      image: imageFile,
    };

    try {
      await Api.post("/products", data);
      alert("Product created successfully!");
      setLoading(false);

      navigate("/admin/product");
    } catch (error) {
      handleApiError(error, setErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>➕ Add New Product</h2>
        <button
          onClick={() => navigate("/admin/product")}
          style={styles.backBtn}
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Product Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            style={styles.input}
          />
          {errors.name && <span style={styles.error}>{errors.name}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows="3"
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Price *</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            style={styles.input}
          />
          {errors.price && <span style={styles.error}>{errors.price}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>📷 Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.fileInput}
          />
          {imagePreview && (
            <div style={styles.previewBox}>
              <img src={imagePreview} alt="Preview" style={styles.preview} />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                }}
                style={styles.removeImgBtn}
              >
                ✕ Remove
              </button>
            </div>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>🏷️ Tags (Multi-Select)</label>
          <Select
            isMulti
            options={TAG_OPTIONS}
            value={selectedTags}
            onChange={setSelectedTags}
            placeholder="Select tags..."
            closeMenuOnSelect={false}
          />
        </div>

        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "10px",
  },
  title: {
    margin: 0,
    fontSize: "18px",
    color: "#1e293b",
  },
  backBtn: {
    padding: "8px 18px",
    backgroundColor: "#6b7280",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  formGroup: {
    marginBottom: "18px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
    color: "#334155",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
    resize: "vertical",
  },
  fileInput: {
    display: "block",
    padding: "8px",
    border: "1px dashed #94a3b8",
    borderRadius: "6px",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#f8fafc",
  },
  previewBox: {
    marginTop: "10px",
    display: "inline-block",
  },
  preview: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "2px solid #e2e8f0",
  },
  removeImgBtn: {
    display: "block",
    marginTop: "5px",
    padding: "4px 10px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
  error: {
    color: "#ef4444",
    fontSize: "12px",
    marginTop: "4px",
    display: "block",
  },
  submitBtn: {
    padding: "10px 25px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
};

export default Create;
