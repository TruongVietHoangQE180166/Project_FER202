import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Table, Button, Form, Modal, Container, Row, Col, InputGroup, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './ModalStyles.css';
function ProductManage({ products, setProducts }) {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    category: '',
    image: '',
    onSale: false,
    oldPrice: '',
    newPrice: '',
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  const resetForm = useCallback(() => {
    setFormData({
      id: null,
      name: '',
      category: '',
      image: '',
      onSale: false,
      oldPrice: '',
      newPrice: '',
    });
  }, []);

  const handleClose = useCallback(() => {
    setShowModal(false);
    resetForm();
  }, [resetForm]);

  const handleShow = useCallback((product = null) => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        onSale: product.onSale,
        oldPrice: product.oldPrice,
        newPrice: product.newPrice,
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  }, [resetForm]);

  const handleSave = useCallback(() => {
    if (!formData.name || !formData.category || !formData.newPrice) {
      alert('Please fill in all required fields');
      return;
    }

    setProducts(prevProducts => {
      if (formData.id !== null) {
        return prevProducts.map(prod =>
          prod.id === formData.id ? { ...prod, ...formData } : prod
        );
      } else {
        const newProduct = {
          ...formData,
          id: prevProducts.length > 0 ? Math.max(...prevProducts.map(p => p.id)) + 1 : 1,
        };
        return [...prevProducts, newProduct];
      }
    });

    handleClose();
  }, [formData, handleClose, setProducts]);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prevProducts => prevProducts.filter(prod => prod.id !== id));
    }
  }, [setProducts]);

  const tableRows = useMemo(() => (
    filteredProducts.map(product => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>
          <img
            src={product.image || 'placeholder-image-url'}
            alt={product.name}
            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
            onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url'; }}
          />
        </td>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>{product.onSale ? product.oldPrice : 'N/A'}</td>
        <td>{product.newPrice}</td>
        <td>{product.onSale ? 'Yes' : 'No'}</td>
        <td className="d-flex gap-2">
          <Button variant="outline-primary" size="sm" onClick={() => handleShow(product)}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product.id)}>
            <FontAwesomeIcon icon={faTrash} /> Delete
          </Button>
        </td>
      </tr>
    ))
  ), [filteredProducts, handleShow, handleDelete]);

  return (
    <Container fluid className="py-4">
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Product Management</h3>
          <Button variant="light" onClick={() => handleShow(null)}>
            <FontAwesomeIcon icon={faPlus} /> Add Product
          </Button>
        </Card.Header>

        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>

          <Table striped bordered hover responsive className="text-center">
          <thead className="table-secondary text-center">
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Old Price</th>
                <th>New Price</th>
                <th>On Sale</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title className="custom-modal-title">
          {formData.id ? 'Edit Product' : 'Add Product'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="custom-modal-body">
        <Form>
          <Form.Group className="mb-3" controlId="formProductName">
            <Form.Label className="form-label">Product Name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Product Name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductCategory">
            <Form.Label className="form-label">Category*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              value={formData.category || ""}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductImage">
            <Form.Label className="form-label">Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Image URL"
              value={formData.image || ""}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <Form.Control
              type="file"
              className="file-input mt-2"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({ ...formData, image: reader.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductOnSale">
            <Form.Check
              type="checkbox"
              label="On Sale"
              className="checkbox-label"
              checked={formData.onSale || false}
              onChange={(e) => setFormData({ ...formData, onSale: e.target.checked })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductOldPrice">
            <Form.Label className="form-label">Old Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Old Price"
              value={formData.oldPrice ? `$ ${formData.oldPrice}` : ""}
              onChange={(e) => {
                const value = e.target.value.replace(/^\$\s*/, ''); 
                setFormData({ ...formData, oldPrice: value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductNewPrice">
            <Form.Label className="form-label">New Price*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter New Price"
              value={formData.newPrice ? `$ ${formData.newPrice}` : ""}
              onChange={(e) => {
                const value = e.target.value.replace(/^\$\s*/, '');
                setFormData({ ...formData, newPrice: value });
              }}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="custom-modal-footer">
        <Button variant="secondary" className="close-button" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="success"
          className="save-button"
          onClick={() => {
            if (!formData.name || !formData.category || !formData.newPrice) {
              alert("Please fill in all required fields.");
              return;
            }
            if (isNaN(formData.oldPrice)) {
              setFormData({ ...formData, oldPrice: "" });
            }
            handleSave();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
      
    </Container>
  );
}

export default ProductManage;
