

// components/InstagramPost.js
import React from 'react';
import { toPng } from 'html-to-image';

export default function InstagramPost({ formData }) {
  const { layoutType, title, contentType, textContent, listContent, image } = formData;

  const savePost = () => {
    const node = document.getElementById('instagram-post');
    toPng(node)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'instagram-post.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Failed to save image', err);
      });
  };

  // Apply layout styles based on layoutType
  const layoutStyles =
    layoutType === 'side-by-side'
      ? styles.sideBySide
      : layoutType === 'flat'
      ? styles.flat
      : {};

  return (
    <div style={{ ...styles.postContainer, ...layoutStyles }}>
        <div id="instagram-post">
      <h2>{title}</h2>
      {image && <img src={image} alt="Post" style={styles.postImage} />}
      {contentType === 'text' ? (
        <p>{textContent}</p>
      ) : (
        <ul>
          {listContent.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      </div>
      <button onClick={savePost} style={styles.saveButton}>
        Save Post
      </button>
    </div>
  );
}

const styles = {
  postContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    borderLeft: '1px solid #ccc',
  },
  postImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  saveButton: {
    marginTop: '20px',
    padding: '10px 20px',
  },
  sideBySide: {
    display: 'flex',
    flexDirection: 'row',
  },
  flat: {
    display: 'flex',
    flexDirection: 'column',
  },
};