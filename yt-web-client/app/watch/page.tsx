"use client";

import { useSearchParams } from "next/navigation";

import React, { Suspense } from "react";
import styles from "./page.module.css";

function ShowVideo() {
    const searchParams = useSearchParams();
    const videoPrefix = 'https://storage.googleapis.com/fimyfy-processed-videos/';
    const videoSrc = searchParams.get("v");
  
    return (
      <div>
        { <video controls src={videoPrefix + videoSrc}   className={styles.video}/> }
      </div>
    );
  }


export default function Watch() {
    return (
      <Suspense fallback={<p>Loading...</p>}>
        <ShowVideo />
      </Suspense>
    );
  }

// export default function Watch() {
//   const videoPrefix = 'https://storage.googleapis.com/fimyfy-processed-videos/';
//   const videoSrc = useSearchParams().get('v');


//   return (
//     <Suspense>
//       { <video controls src={videoPrefix + videoSrc}   className={styles.video}/> }
//     </Suspense>
//   );
// }





