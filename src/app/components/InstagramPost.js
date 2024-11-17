"use client";

import React from 'react';
import html2canvas from 'html2canvas';
import Image from 'next/image';

export default function InstagramPost({ formData }) {
  const { layoutOption, title, textContents = [], listContent = [], image } = formData;

  const savePost = async () => {
    try {
      const element = document.getElementById('instagram-post');
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/jpg');
  
      const link = document.createElement('a');
      link.href = data;
      link.download = 'instagram-post.jpg';
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to save the image:', error);
      alert('An error occurred while saving the image.');
    }
  };

  const renderTextContents = () => (
    <div className="flex flex-col gap-4">
      {textContents.map((text, index) => (
        <p key={index} className={`textbox-${index + 1} mb-2`}>
          {text}
        </p>
      ))}
    </div>
  );

  const renderListContent = () => (
    <ul className="flex flex-col gap-4 mb-4">
      {listContent.map((item, index) => (
        <li
          key={index}
          className="relative flex items-start gap-2 text-lg text-white before:mt-2
          before:content-[''] before:h-4 before:w-8 before:min-w-8 before:bg-secondary before:rounded-xl"
        >
          {item}
        </li>
      ))}
    </ul>
  );

  const InstagramPostContent = () => {
    switch (layoutOption) {
      case 'title-horizontal':
        return (
          <div className="h-[1080px] w-[1080px] bg-primary flex flex-row flex-wrap p-12">
            <div className="max-h-[calc(100%_-_100px)] flex flex-col w-[calc(40%_-_40px)] items-center justify-center gap-10">
              {image && <Image src={image} alt="Post Image" width={600} height={600} className="w-auto max-w-full h-auto max-h-[calc(100%_-_300px)]" />}
              
              <div className="h-[250px] w-[300px]">
                <img
                  src="/logo-white.png"
                  alt="Logo Image"
                  className="w-full h-auto object-contain"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  loading="eager"
                />
              </div>
            </div>
            <div className="flex flex-col w-[calc(60%_-_40px)] justify-center items-center ml-20 [&_p]:text-white [&_p]:text-center [&_p]:text-lg">
              <h2 className="text-[60px] leading-[66px] text-white text-center font-extrabold mb-4">{title}</h2>
              {renderTextContents()}
              {renderListContent()}
            </div>
            <div className="w-full flex justify-evenly items-center gap-10 mt-auto">
              <p className="text-xl text-secondary font-bold">@motion_digital_room</p>
            </div>
          </div>
        );

      case 'title-vertical':
        return (
          <div className="h-[1080px] w-[1080px] bg-primary flex flex-col items-center justify-start p-4">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {image && <Image src={image} alt="Post Image" width={384} height={384} className="h-96 w-96 mb-4" />}
            {renderTextContents()}
            {renderListContent()}
          </div>
        );

      case 'post-horizontal':
        return (
          <div className="h-[1080px] w-[1080px] flex flex-row items-center justify-between p-4">
            {image && <Image src={image} alt="Post Image" width={384} height={384} className="h-96 w-96" />}
            <div className="flex-1 ml-4">
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              {renderTextContents()}
              {renderListContent()}
            </div>
          </div>
        );

      case 'post-vertical':
        return (
          <div className="h-[1080px] w-[1080px] bg-primary flex flex-col items-center justify-start p-4">
            {image && <Image src={image} alt="Post Image" width={384} height={384} className="h-96 w-96 mb-4" />}
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {renderTextContents()}
            {renderListContent()}
          </div>
        );

      default:
        return (
          <div className="h-[1080px] w-[1080px] flex items-center justify-center">
            Invalid layout option
          </div>
        );
    }
  };

  return (
    <div className="h-fit flex flex-col items-start gap-20">
      <div id="instagram-post">
        <InstagramPostContent />
      </div>
      <button onClick={savePost} className="button">
        Save Post
      </button>
    </div>
  );
}