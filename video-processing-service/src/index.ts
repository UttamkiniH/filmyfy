import { error } from "console";
import express from "express";
import ffmpeg from "fluent-ffmpeg";
import { convertVideo, deleteProcessedVideo, deleteRawVideo, downloadRawVideo, setupDirectories, uploadProcessedVideo } from "./sotrage";
import { isVideoNew, setVideo } from "./firestore";

//create local raw and processed dir
setupDirectories();


const app = express();
app.use(express.json());

app.post("/process-video", async (req, res) => {
    // get the filename from pu/sub
    // when the user uploads this endpoint will be triggered which has the video filename 

    let data;
    try {
        const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
        data = JSON.parse(message);
        if (!data.name) {
            throw new Error('Invalid message payload received.');
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send('Bad Request: missing filename.');
    }

    const inputFileName = data.name; //format - <UID>-<DATE>.extension
    const outputFileName = `process-${inputFileName}`;
    const videoId = inputFileName.split('.')[0];

    /* there is a bug you remember?
    how pub=sub will keep on kicking cloud run to process vidoe until it sends 500 to resolve that
    we will use status if video exist dont process it */

    if (!isVideoNew(videoId)) {
        return res.status(400).send('Bad Request: video already processing or processed.');
    } else {
        await setVideo(videoId, {
            id: videoId,
            uid: videoId.split('-')[0],
            status: 'processing',

        })
    }


    // download and store it in localRawVideo 
    await downloadRawVideo(inputFileName);
    //convert raw video to prcoess video
    try {
        await convertVideo(inputFileName, outputFileName);

    } catch (error) {
        //need to clean up lets say half convert is done
        await Promise.all([
            deleteRawVideo(inputFileName),
            deleteProcessedVideo(outputFileName)
        ]);

        console.log(error);
        return res.status(500).send("Internal servor error: video processing failed");
    }

    //upload process to process bucket
    await uploadProcessedVideo(outputFileName);

    await setVideo(videoId, {
        status: 'processed',
        filename: outputFileName
    });


    await Promise.all([
        deleteRawVideo(inputFileName),
        deleteProcessedVideo(outputFileName)
    ]);

    return res.status(200).send("Processing completed successfully");

})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})