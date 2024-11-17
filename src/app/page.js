"use client";

import React, { useState, useEffect } from 'react';
import FormSection from './components/FormSection';
import InstagramPost from './components/InstagramPost';

export default function Home() {
  const [formData, setFormData] = useState({
    layoutOption: 'title-horizontal',
    title: '',
    contentBlocks: [
      { type: 'text', content: '' },
      { type: 'list', content: [] },
    ],
    image: null,
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData'));
    if (storedData) {
      setFormData(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 max-w-[1280px] px-8 py-10">
      <FormSection formData={formData} setFormData={setFormData} />
      <InstagramPost formData={formData} />
    </div>
  );
}