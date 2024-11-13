"use client"

import React, { useState, useEffect } from 'react';
import FormSection from './components/FormSection';
import InstagramPost from './components/InstagramPost';

export default function Home() {
  const [formData, setFormData] = useState({
    layoutType: 'side-by-side',
    title: '',
    contentType: 'text',
    textContent: '',
    listContent: [],
    image: null,
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData'));
    if (storedData) {
      setFormData(storedData);
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <div style={styles.container}>
      <FormSection formData={formData} setFormData={setFormData} />
      <InstagramPost formData={formData} />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
  },
};