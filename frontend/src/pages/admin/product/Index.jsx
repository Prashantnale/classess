import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Api, BASE_URL, handleApiError } from "../../../helper/ApiHelper";

const Index = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await Api.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await Api.delete(`/products/${id}`);
      alert("Product deleted!");
      fetchProducts();
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>📋 All Products ({products.length})</h2>
        <button
          onClick={() => navigate("/admin/product/create")}
          style={styles.addBtn}
        >
          ➕ Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p style={styles.noData}>No products found. Add your first product!</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Tags</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id} style={styles.tr}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>
                    {product.image ? (
                      <img
                        src={`${BASE_URL}/uploads/${product.image}`}
                        alt={product.name}
                        style={styles.tableImg}
                      />
                    ) : (
                      <span style={styles.noImg}>No Image</span>
                    )}
                  </td>
                  <td style={styles.td}>{product.name}</td>
                  <td style={styles.td}>{product.description || "-"}</td>
                  <td style={styles.td}>₹{product.price}</td>
                  <td style={styles.td}>
                    {Array.isArray(product.tags) && product.tags.length > 0 ? (
                      <div style={styles.tagsList}>
                        {product.tags.map((tag, idx) => {
                          const tagText = typeof tag === "object" ? tag.value : tag;
                          return (
                            <span key={`${product._id}-${idx}`} style={styles.tagBadge}>
                              {tagText}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() =>
                        navigate(`/admin/product/edit/${product._id}`)
                      }
                      style={styles.editBtn}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      style={styles.deleteBtn}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
  addBtn: {
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: "12px 15px",
    textAlign: "left",
    fontSize: "13px",
  },
  tr: {
    borderBottom: "1px solid #e2e8f0",
  },
  td: {
    padding: "12px 15px",
    fontSize: "14px",
    color: "#334155",
    verticalAlign: "middle",
  },
  tableImg: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
  },
  noImg: {
    color: "#94a3b8",
    fontSize: "12px",
    fontStyle: "italic",
  },
  tagsList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
  },
  tagBadge: {
    padding: "2px 8px",
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    borderRadius: "10px",
    fontSize: "11px",
    fontWeight: "500",
  },
  editBtn: {
    padding: "5px 12px",
    backgroundColor: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    marginRight: "5px",
  },
  deleteBtn: {
    padding: "5px 12px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
  noData: {
    textAlign: "center",
    color: "#94a3b8",
    padding: "30px",
    fontSize: "16px",
  },
};

export default Index;
