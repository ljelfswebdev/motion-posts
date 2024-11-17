import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Select from 'react-select';

export default function FormSection({ formData, setFormData }) {
  const { layoutOption, title, contentBlocks = [], image } = formData;
  const [newListItem, setNewListItem] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Ensure the component is only rendered on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Options for React Select
  const layoutOptions = [
    { value: 'title-horizontal', label: 'Title - Horizontal' },
    { value: 'title-vertical', label: 'Title - Vertical' },
    { value: 'post-horizontal', label: 'Post - Horizontal' },
    { value: 'post-vertical', label: 'Post - Vertical' },
  ];

  // Handle image upload and convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setFormData({ ...formData, image: null });
  };

  // Add a new text box
  const addTextBox = () => {
    setFormData({
      ...formData,
      contentBlocks: [...contentBlocks, { type: 'text', content: '' }],
    });
  };

  // Add a new list box
  const addListBox = () => {
    setFormData({
      ...formData,
      contentBlocks: [...contentBlocks, { type: 'list', content: [] }],
    });
  };

  // Handle text content change
  const handleContentChange = (index, value) => {
    const updatedBlocks = [...contentBlocks];
    updatedBlocks[index].content = value;
    setFormData({ ...formData, contentBlocks: updatedBlocks });
  };

  // Add a new item to a list
  const addListItem = (index) => {
    const updatedBlocks = [...contentBlocks];
    updatedBlocks[index].content.push(newListItem);
    setNewListItem('');
    setFormData({ ...formData, contentBlocks: updatedBlocks });
  };

  // Remove an item from a list
  const removeListItem = (blockIndex, itemIndex) => {
    const updatedBlocks = [...contentBlocks];
    updatedBlocks[blockIndex].content = updatedBlocks[blockIndex].content.filter((_, i) => i !== itemIndex);
    setFormData({ ...formData, contentBlocks: updatedBlocks });
  };

  // Remove a content block (text box or list)
  const removeContentBlock = (index) => {
    const updatedBlocks = contentBlocks.filter((_, i) => i !== index);
    setFormData({ ...formData, contentBlocks: updatedBlocks });
  };

  // Handle layout option change
  const handleLayoutOptionChange = (selectedOption) => {
    setFormData({ ...formData, layoutOption: selectedOption.value });
  };

  const form_label = 'font-bold text-xl my-2';
  const form_text_input = 'border-2 border-solid border-primary px-4 py-2 h-12 rounded-md w-full';

  return (
    <div>
      <h2>Form</h2>
      <div className="flex flex-col">

        {/* Layout Option using React Select */}
        <p className={form_label}>Layout Option:</p>
        {isClient && (
          <Select
            value={layoutOptions.find((option) => option.value === layoutOption)}
            onChange={handleLayoutOptionChange}
            options={layoutOptions}
            placeholder="Select Layout Option..."
            isSearchable={true}
            className="mb-4"
          />
        )}

        {/* Title Input */}
        <p className={form_label}>Title:</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={form_text_input}
        />

        <div className="my-4 flex gap-2">
          <button className="button my-2" onClick={addTextBox}>
            Add Text Box
          </button>
          <button className="button my-2" onClick={addListBox}>
            Add List Box
          </button>
        </div>
        {/* Render Content Blocks */}
        {contentBlocks.map((block, index) => (
          <div key={index} className="mb-4">
            {block.type === 'text' ? (
              <div>
                <textarea
                  value={block.content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  placeholder={`Text Box ${index + 1}`}
                  className={`${form_text_input} h-40`}
                />
                <button className="button button--red my-2" onClick={() => removeContentBlock(index)}>
                  Remove Text Box
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={newListItem}
                  onChange={(e) => setNewListItem(e.target.value)}
                  className={form_text_input}
                />
                <button onClick={() => addListItem(index)} className="button my-2">
                  Add List Item
                </button>
                <ul className="flex flex-col gap-1">
                  {block.content.map((item, i) => (
                    <li key={i} className="flex justify-between items-center">
                      {item}
                      <button onClick={() => removeListItem(index, i)} className="button button--red">
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
                <button className="button button--red my-2" onClick={() => removeContentBlock(index)}>
                  Remove List
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Image Upload */}
        <p className={form_label}>Image:</p>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <div>
            <Image src={image} alt="Post Image" width={384} height={384} className="my-4 h-40 w-40 object-contain"/>
            <button onClick={handleImageDelete} className="button button--red">Delete Image</button>
          </div>
        )}
      </div>
    </div>
  );
}