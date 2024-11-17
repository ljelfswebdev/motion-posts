import React, { useState } from 'react';
import Image from 'next/image';

export default function FormSection({ formData, setFormData }) {
  const { layoutOption, title, contentType, textContents, listContent, image } = formData;
  const [newListItem, setNewListItem] = useState('');
  const [textBoxes, setTextBoxes] = useState(textContents || ['', '', '']);

  // Handle image upload
// Handle image upload and convert to Base64
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result, // Store the Base64 string in formData
      });
    };
    reader.readAsDataURL(file); // Convert the image file to a Base64 string
  }
};

  // Handle image delete
  const handleImageDelete = () => {
    setFormData({
      ...formData,
      image: null,
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

  // Handle layout option change
  const handleLayoutOptionChange = (value) => {
    setFormData({ ...formData, layoutOption: value });
  };

  // Handle text content changes
  const handleTextChange = (index, value) => {
    const updatedTextBoxes = [...textBoxes];
    updatedTextBoxes[index] = value;
    setTextBoxes(updatedTextBoxes);
    setFormData({ ...formData, textContents: updatedTextBoxes });
  };

  const form_label = 'font-bold text-xl my-2';
  const form_text_input = 'border-2 border-solid border-primary px-4 py-2 h-12 rounded-md w-full';

  return (
    <div>
      <h2>Form</h2>
      <div className="flex flex-col">
        <p className={`${form_label}`}>Layout Option:</p>
        <label>
          <input
            type="radio"
            value="title-horizontal"
            checked={layoutOption === 'title-horizontal'}
            onChange={() => handleLayoutOptionChange('title-horizontal')}
          />
          Title - Horizontal
        </label>
        <label>
          <input
            type="radio"
            value="title-vertical"
            checked={layoutOption === 'title-vertical'}
            onChange={() => handleLayoutOptionChange('title-vertical')}
          />
          Title - Vertical
        </label>
        <label>
          <input
            type="radio"
            value="post-horizontal"
            checked={layoutOption === 'post-horizontal'}
            onChange={() => handleLayoutOptionChange('post-horizontal')}
          />
          Post - Horizontal
        </label>
        <label>
          <input
            type="radio"
            value="post-vertical"
            checked={layoutOption === 'post-vertical'}
            onChange={() => handleLayoutOptionChange('post-vertical')}
          />
          Post - Vertical
        </label>
      </div>

      {/* Title */}
      <div>
        <p className={`${form_label}`}>Title:</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`${form_text_input}`}
        />
      </div>

      {/* Text Content */}
      <div>
        <p className={`${form_label}`}>Text Contents:</p>
        {textBoxes.map((text, index) => (
          <textarea
            key={index}
            value={text}
            onChange={(e) => handleTextChange(index, e.target.value)}
            className={`${form_text_input} !h-20 mb-4`}
            placeholder={`Text Content ${index + 1}`}
          />
        ))}
      </div>

      {/* List Content */}
      <div>
        <p className={`${form_label}`}>List Content:</p>
        <div>
          <input
            type="text"
            value={newListItem}
            onChange={(e) => setNewListItem(e.target.value)}
            className={`${form_text_input}`}
          />
          <button className="button my-2" onClick={addListItem}>Add</button>
        </div>
        <ul>
          {listContent.map((item, index) => (
            <li key={index}>
              {item} <button className="button button--red" onClick={() => removeListItem(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Image Upload */}
      <div>
        <p className={`${form_label}`}>Image:</p>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <div className="py-2">
            <Image src={image} alt="Post Image" width={384} height={384} className="h-auto w-[30%]" />
            <button onClick={handleImageDelete} className="button my-2">Delete Image</button>
          </div>
        )}
      </div>
    </div>
  );
}