"use client";

import React from 'react';
import html2canvas from 'html2canvas';
import Image from 'next/image';

export default function InstagramPost({ formData }) {
  const { layoutOption, title, contentBlocks = [], image } = formData;

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

  const renderContentBlocks = () =>
    contentBlocks.map((block, index) =>
      block.type === 'text' ? (
        <p key={index} className="text-white text-center mb-4">{block.content}</p>
      ) : (
        <ul key={index} className="text-white mb-4 flex flex-col gap-4">
          {block.content.map((item, i) => (
            <li className="relative flex items-start gap-2 text-lg text-white before:mt-2
           before:content-[''] before:h-4 before:w-8 before:min-w-8 before:bg-secondary before:rounded-xl" key={i}>{item}</li>
          ))}
        </ul>
      )
    );

const title_class = 'text-[60px] leading-[66px] text-white text-center font-extrabold mb-4';

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
              <div className={title_class}>{title}</div>
              {renderContentBlocks()}
            </div>
            <div className="w-full flex justify-evenly items-center gap-10 mt-auto">
              <p className="text-xl text-secondary font-bold">@motion_digital_room</p>
            </div>
          </div>
        );

      case 'title-vertical':
        return (
          <div className="h-[1080px] w-[1080px] bg-primary flex flex-col items-center justify-start p-12">
            {/* Title Section */}
            <div className={`${title_class} mb-10`}>{title}</div>
        
            {/* Dynamic Content Blocks */}
            {renderContentBlocks()}
        
            {/* Image Section with Dynamic Height */}
            {image && (
              <div className="flex-grow flex items-center justify-center w-full my-8">
                <Image
                  src={image}
                  alt="Post Image"
                  width={800}
                  height={400}
                  className="w-auto h-full max-h-[calc(100vh-300px)] object-contain"
                />
              </div>
            )}
        
            {/* Footer Section */}
            <div className="w-full flex justify-evenly items-center gap-10 mt-auto">
              <div className="h-[250px] w-[300px]">
                <img
                  src="/logo-white.png"
                  alt="Logo Image"
                  className="w-full h-auto object-contain"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  loading="eager"
                />
              </div>
              <p className="text-xl text-secondary font-bold">@motion_digital_room</p>
            </div>
          </div>
        );

      case 'post-horizontal':
        return (
          <div className="h-[1080px] w-[1080px] flex flex-row items-center justify-between p-4">
            {image && <Image src={image} alt="Post Image" width={384} height={384} className="h-96 w-96" />}
            <div className="flex-1 ml-4">
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              {renderContentBlocks()}
            </div>
          </div>
        );

      case 'post-vertical':
        return (
          <div className="h-[1080px] w-[1080px] bg-primary flex flex-col items-center justify-start p-4">
            {image && <Image src={image} alt="Post Image" width={384} height={384} className="h-96 w-96 mb-4" />}
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            {renderContentBlocks()}
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