
// components/FormSection.js
import React, { useState } from 'react';

export default function FormSection({ formData, setFormData }) {
  const { layoutType, title, contentType, textContent, listContent, image } = formData;
  const [newListItem, setNewListItem] = useState('');

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: URL.createObjectURL(file),
    });
  };

  // Add item to the list
  const addListItem = () => {
    if (newListItem.trim()) {
      setFormData({
        ...formData,
        listContent: [...listContent, newListItem.trim()],
      });
      setNewListItem('');
    }
  };

  // Remove item from the list
  const removeListItem = (index) => {
    const updatedList = listContent.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      listContent: updatedList,
    });
  };

  // Handle layout type change
  const handleLayoutChange = (value) => {
    setFormData({ ...formData, layoutType: value });
  };

  // Handle content type change
  const handleContentTypeChange = (value) => {
    setFormData({ ...formData, contentType: value });
  };

  return (
    <div style={styles.formContainer}>
      <h2>Form</h2>
      {/* Layout Type */}
      <div>
        <p>Layout Type:</p>
        <label>
          <input
            type="radio"
            value="side-by-side"
            checked={layoutType === 'side-by-side'}
            onChange={() => handleLayoutChange('side-by-side')}
          />
          Side-by-Side
        </label>
        <label>
          <input
            type="radio"
            value="flat"
            checked={layoutType === 'flat'}
            onChange={() => handleLayoutChange('flat')}
          />
          Flat
        </label>
      </div>

      {/* Title */}
      <div>
        <p>Title:</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      {/* Content Type */}
      <div>
        <p>Content Type:</p>
        <label>
          <input
            type="radio"
            value="text"
            checked={contentType === 'text'}
            onChange={() => handleContentTypeChange('text')}
          />
          Text
        </label>
        <label>
          <input
            type="radio"
            value="list"
            checked={contentType === 'list'}
            onChange={() => handleContentTypeChange('list')}
          />
          List
        </label>
      </div>

      {/* Text or List Input */}
      {contentType === 'text' ? (
        <div>
          <p>Text Content:</p>
          <textarea
            value={textContent}
            onChange={(e) => setFormData({ ...formData, textContent: e.target.value })}
          />
        </div>
      ) : (
        <div>
          <p>List Content:</p>
          <div>
            <input
              type="text"
              value={newListItem}
              onChange={(e) => setNewListItem(e.target.value)}
            />
            <button onClick={addListItem}>Add</button>
          </div>
          <ul>
            {listContent.map((item, index) => (
              <li key={index}>
                {item}{' '}
                <button onClick={() => removeListItem(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Image Upload */}
      <div>
        <p>Image:</p>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="Selected" style={styles.imagePreview} />}
      </div>
    </div>
  );
}

const styles = {
  formContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
  imagePreview: {
    marginTop: '10px',
    maxWidth: '100%',
    height: 'auto',
  },
};