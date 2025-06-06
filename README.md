# 🎬 Filmyfy - A Community-Powered Video Streaming Platform
Filmyfy is a movie streaming platform inspired by YouTube, where users can upload and watch videos for free. Designed as part of a full-stack development project, Filmyfy emphasizes simplicity, learning, and scalability trade-offs without aiming for production-level complexity.

Unlike traditional platforms that operate on subscriptions, Filmyfy was born out of the ongoing subscription war—where content is fragmented across services and increasingly expensive. The goal is to provide a closed-group, password-protected space for sharing and consuming content.

🔐 Note: The password-protected access feature is planned but not yet implemented. For now, anyone can upload and watch videos.

## Video Demo

https://github.com/user-attachments/assets/7854672d-d23f-458f-a98f-d439ff0fc2b5

## Features
- Google-based sign-in & sign-out
- Upload videos (while authenticated)
- Transcode videos into multiple resolutions (360p, 720p)
- Browse uploaded videos (no sign-in needed)
- Watch individual videos (no sign-in needed)
- Asynchronous video processing using Google Cloud services

## How It Works (High-Level Design)


### Storage: Google Cloud Storage
- Stores raw uploads and transcoded videos
- Public access to processed videos only

### Event Messaging: Cloud Pub/Sub
- Triggers video processing once a file is uploaded
- Buffers and manages message delivery

### Processing: Cloud Run + FFmpeg
- Scalable workers process video formats
- Uploads processed files back to storage

### Metadata: Firestore
- Stores metadata like title, uploader, status, etc.
- Enables frontend to fetch video info

### Web Client: Next.js (Hosted via Cloud Run)
- Upload and playback UI
- Integrated with Firebase Auth

### Authentication: Firebase Auth
- Handles Google sign-in
- Triggers creation of user profiles in Firestore

## Detailed Flow
1. User Authentication
Uses Firebase Auth and Google Sign-In
User metadata stored in Firestore
Firebase Function triggers ensure reliable profile creation

2. Video Upload
Authenticated users receive signed upload URLs
Direct upload to a secure Cloud Storage bucket
Extension must be known before generating signed URL

3. Video Processing
Cloud Storage upload triggers a Pub/Sub message
Cloud Run service processes videos using FFmpeg
Transcoded versions are uploaded and metadata is updated

### Limitations & Future Improvements
- No moderation or illegal content filtering
- Password-protected group access is not yet implemented
- Cloud Run timeout and Pub/Sub delivery edge cases
- No video analytics or search features


## Project Status
- Currently services are disabled as you know its expensive to run it in cloud but you can contact me for demo cheers!
- Next steps: gated access using passwords and user group controls.
