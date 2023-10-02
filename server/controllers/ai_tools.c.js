const tf = require('@tensorflow/tfjs') // contains math operations for tfn
const tfn = require('@tensorflow/tfjs-node') // loads the TensorflowJS binding for CPU
const sharp = require('sharp'); // image processing 
const fs = require('fs'); // read files
const trash = require('../models/trash.m')


// CONFIG PREDEFINED PARAMETERS
// const NUM_CLASSES = 28; // declare number of supported classes
const CONFIDENT_THRESHOLD = 0.3; // define threshold that we accept a prediction
const IOU_THRESHOLD = 0.4; // define threshold that we suppress other predictions
const MAX_SELECTED_BOXES =  20; // number of boxes selected
// read data of classes that the model support
const classesDir = JSON.parse(fs.readFileSync('public/labels.json')); 
// END CONFIG 


// calculate coordinates and size of bounding boxes and format the output 
function formatPredictions(imageWidth, imageHeight, boxes, selected_indices, classes, classesDir) {
    
    const detectionObjects = []; // contains all bboxes that is bigger than the threshold
    const acceptedClasses = [];  // contains all classes that
    
    // filter out low confident scores output (NonMaxSuppression) 
    selected_indices.forEach((index, ) => {
        
        var bbox = {}; 
        // calculate bottom-left and top-right coordinates
        /// top-left
        const minY = boxes[index][0] * imageHeight;
        const minX = boxes[index][1] * imageWidth;
        // bottom-right 
        const maxY = boxes[index][2] * imageHeight;
        const maxX = boxes[index][3] * imageWidth;
        console.log(`min (${minX}, ${minY}), max (${maxX}, ${maxY})`)

        // return a bbox with its top-left coordinate, width, height and label name
        bbox.x = minX; 
        bbox.y = minY;
        bbox.width = maxX - minX;
        bbox.height = maxY - minY;
        bbox.label = classesDir[classes[index]].name;

        // append a bbox 
        detectionObjects.push(bbox);

        // append a new accepted class
        acceptedClasses.push(classes[index]);
    });

    return [ detectionObjects, acceptedClasses ];
}


module.exports = {
    // return predicted label
    performPredictions: async (filename) => {
        try {
            //// PREDICT
            // load model
            const handler = tfn.io.fileSystem(
                'public/ML_models/EN_detection_model_2/model.json'
            );
            const model = await tfn.loadGraphModel(handler);
        
            console.log('Model loaded');
        
            // read img and resize (this new model doesn't require resizing)
            const buffer = await sharp(`public/images/${filename}`)
                .removeAlpha() // png files have 4 channels -> exclude alpha channel
                .toBuffer(); // convert image to buffer so that the below code can process
        
            console.log('Load image successfully');
            // convert to tensor and normalize each pixel value to range (0-255)
            const img = tfn.node.decodeImage(buffer).toInt().expandDims(0);
        
            // make predictions
            let output = await model.executeAsync(img); // graph model doesn't use predict as normal
        
            // extract information from the output in model.outputNodes
            const boxes = output[5].arraySync()[0]; // detection_boxes
            const scores = output[2].arraySync()[0]; // Identity4:0
            const classes = output[1].arraySync()[0]; // Identity2:0
        
            // console.log(boxes)
            // non max suppression
            const selected_indices = tfn.image.nonMaxSuppression(
                boxes,
                scores,
                MAX_SELECTED_BOXES,
                IOU_THRESHOLD,
                CONFIDENT_THRESHOLD
            );
        
            let [predictions, acceptedClasses] = formatPredictions(
                img.shape[2], // image width
                img.shape[1], // image height
                boxes, // bounding boxes
                selected_indices.arraySync(), // indexes of bounding boxes that pass NMS
                classes, // predicted classes
                classesDir // predefined classes that the model support
            );
        
            //// END PREDICT
            console.log(predictions);
            console.log(scores)
            // all classes that are predicted with no duplicates
            var filteredClasses = new Set(acceptedClasses);
        
            // return everything needed
            return {
                filename: filename, // the image's filename
                bboxes: predictions, // bounding boxes, each element is {x, y, width, height, label}
                // classIDs: [... filteredClasses],
                classNames: [...filteredClasses].map((id) => classesDir[id]),
                message: 'OK',
            };
        } catch (err) {
            throw err;
        }
    },

    trashInfoGet: async (req, res) => {
        trash.getTrashInfoByID(req.params.id) // create a promise
            .then((result) => {
                res.json(result[0])
            })
            .catch((err) => {
                console.log(err)
            })
    },

    trashLocationGet: async (req, res) => {
        trash.getTrashLocationsByID(req.params.id) // create a promise
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}