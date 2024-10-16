import React from "react";
import styles from "./style.module.css";

const VideoPlayer = ({ link }: { link: string }) => {
  const getYouTubeId = (url: any) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(link);

  if (!videoId) {
    return (
      <div className={styles.videoContainer}>
        <video className={styles.videoPlayer} controls>
          <source src={link} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className={styles.videoContainer}>
      <iframe
        className={styles.videoPlayer}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default VideoPlayer;
