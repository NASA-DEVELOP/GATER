// Notices:
// Copyright 2017 United States Government as represented by the Administrator 
// of the National Aeronautics and Space Administration. All Rights Reserved.
 
// Disclaimers
// No Warranty: THE SUBJECT SOFTWARE IS PROVIDED "AS IS" WITHOUT ANY WARRANTY 
// OF ANY KIND, EITHER EXPRESSED, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT 
// LIMITED TO, ANY WARRANTY THAT THE SUBJECT SOFTWARE WILL CONFORM TO SPECIFICATIONS, 
// ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
// OR FREEDOM FROM INFRINGEMENT, ANY WARRANTY THAT THE SUBJECT SOFTWARE WILL BE 
// ERROR FREE, OR ANY WARRANTY THAT DOCUMENTATION, IF PROVIDED, WILL CONFORM TO 
// THE SUBJECT SOFTWARE. THIS AGREEMENT DOES NOT, IN ANY MANNER, CONSTITUTE 
// AN ENDORSEMENT BY GOVERNMENT AGENCY OR ANY PRIOR RECIPIENT OF ANY RESULTS, 
// RESULTING DESIGNS, HARDWARE, SOFTWARE PRODUCTS OR ANY OTHER APPLICATIONS 
// RESULTING FROM USE OF THE SUBJECT SOFTWARE.  FURTHER, GOVERNMENT AGENCY DISCLAIMS 
// ALL WARRANTIES AND LIABILITIES REGARDING THIRD-PARTY SOFTWARE, IF PRESENT 
// IN THE ORIGINAL SOFTWARE, AND DISTRIBUTES IT "AS IS."
 
// Waiver and Indemnity:  RECIPIENT AGREES TO WAIVE ANY AND ALL CLAIMS AGAINST 
// THE UNITED STATES GOVERNMENT, ITS CONTRACTORS AND SUBCONTRACTORS, AS WELL 
// AS ANY PRIOR RECIPIENT.  IF RECIPIENT'S USE OF THE SUBJECT SOFTWARE RESULTS 
// IN ANY LIABILITIES, DEMANDS, DAMAGES, EXPENSES OR LOSSES ARISING FROM SUCH USE, 
// INCLUDING ANY DAMAGES FROM PRODUCTS BASED ON, OR RESULTING FROM, RECIPIENT'S 
// USE OF THE SUBJECT SOFTWARE, RECIPIENT SHALL INDEMNIFY AND HOLD HARMLESS 
// THE UNITED STATES GOVERNMENT, ITS CONTRACTORS AND SUBCONTRACTORS, AS WELL 
// AS ANY PRIOR RECIPIENT, TO THE EXTENT PERMITTED BY LAW.  RECIPIENT'S SOLE 
// REMEDY FOR ANY SUCH MATTER SHALL BE THE IMMEDIATE, UNILATERAL TERMINATION 
// OF THIS AGREEMENT.



//********************************************************FMask Code for the years 1995 - 2016 Landsat images********************************************************

//Import Landsat 5 TM, Landsat 7 ETM+, and Landsat 8 OLI collections by either searching for each collection with "Surface Reflectance TOA with Fmask" in the searchbar, or using the variables below.
//Rename each image collection "landsat5", "landsat7", and "landsat8" respectively.
var landsat5 = ee.ImageCollection("LANDSAT/LT5_L1T_TOA_FMASK"),
var landsat7 = ee.ImageCollection("LANDSAT/LE7_L1T_TOA_FMASK"),
var landsat8 = ee.ImageCollection("LANDSAT/LC8_L1T_TOA_FMASK");

//Import Everglades National Park boundary (or another shapefile of your choice). This will be used to clip the Landsat imagery collections to your area of interest.
var parkBoundary = ee.FeatureCollection('ft:1KAYShQzYibOCQkxscbvvdNEq0JINOcYLy9wOLIF1','geometry');

//Create a function that will apply Fmask to your image.
function applyMask(image) {
 return image.updateMask(image.select('fmask').lt(2));} //This selects pixels in the Fmask band that are less than 2 (meaning cloud-free)

//Cloud filtering for Year 1995 starts here 
//Filter collection to specific date range and area of interest (YEAR 1995). We exclusively used the dry season for our research (January 1 - May 31).
var collection95 = ee.ImageCollection(landsat5)
    .filterDate('1995-01-01', '1995-05-30')               //define time frame
    .map(applyMask);                                      //apply mask function for cloud filtering

//Reduce previous year to add to image collection. In very cloudy regions, there may be no available pixels from your filterDate with data, so you can fill in with data from the previous year.
var fill94 = ee.ImageCollection(landsat5)
    .filterDate('1994-01-01', '1994-05-30')               //define time frame
    .map(applyMask); 									  //apply mask

//Combine the two collections (years 1995 and 1994)
var combine95 = ee.ImageCollection(fill94.merge(collection95));

//Reduce image collection to a single image by applying a median function and clip to study region.
var merged95 = combine95.reduce(ee.Reducer.median())
      .clip(parkBoundary);

//Export the image as an Asset.
Export.image.toAsset({
  image: merged95,
  description: 'Landsat1995',
  assetId: 'Landsat1995',
  scale: 30,
  region: parkBoundary
});

//Cloud filtering for Year 2000 starts here
//Filter collection to specific date range and area of interest (YEAR 2000). We exclusively used the dry season for our research (January 1 - May 31).
var collection00 = ee.ImageCollection(landsat7)
    .filterDate('2000-01-01', '2000-05-30')               //define time frame
    .map(applyMask);                                      //apply mask

//As all the pixels had cloud-free data in the filtered image collection, we did not include data from the previous year. 

//Reduce image collection to single image by applying a median function and clip to study region.
var merged00 = collection00.reduce(ee.Reducer.median())
      .clip(parkBoundary);

// Export the image as an Asset.
Export.image.toAsset({
  image: merged00,
  description: 'Landsat2000',
  assetId: 'Landsat2000',
  scale: 30,
  region: parkBoundary
});

//Cloud filtering for Year 2005 starts here
//Filter collection to specific date range and area of interest (YEAR 2005)
var collection05 = ee.ImageCollection(landsat5)
    .filterDate('2005-01-01', '2005-05-30')               //define time frame
    .map(applyMask);                                      //apply mask

//As all the pixels had data in the image collection, we did not include data from the previous year. 

//Reduce image collection to single image by applying a median function and clip to study region.
var merged05 = collection05.reduce(ee.Reducer.median())
      .clip(parkBoundary);

// Export the image as an Asset.
Export.image.toAsset({
  image: merged00,
  description: 'Landsat2005',
  assetId: 'Landsat2005',
  scale: 30,
  region: parkBoundary
});

//Cloud filtering for Year 2010 starts here
//Filter collection to specific date range and area of interest (YEAR 2010)
var collection10 = ee.ImageCollection(landsat7)
    .filterDate('2010-01-01', '2010-05-30')               //define time frame
    .map(applyMask);                                      //apply mask

//Reduce earlier year to add to collection. In very cloudy regions, there may be no available pixels from your filterDate with data, so you can fill in with data from the previous year.
var fill10 = ee.ImageCollection(landsat7)
    .filterDate('2009-01-01', '2009-05-30')               //define time frame
    .map(applyMask); 									  //apply mask
    
//Combine the two image collections (years 2010 and 2009)
var combine10 = ee.ImageCollection(fill10.merge(collection10));

//Reduce image collection to single image by applying median function and clip to study region.
var merged10 = combine.reduce(ee.Reducer.median())
      .clip(parkBoundary)
      .select(['B7_median','B5_median', 'B4_median', 'B3_median', 'B2_median', 'B1_median']); //selects only bands with same data formats
      
//Export the image as an Asset.
Export.image.toAsset({
  image: merged10,
  description: 'Landsat2010',
  assetId: 'Landsat2010',
  scale: 30,
  region: parkBoundary
});

//Cloud filtering for Year 2015 starts here
//Filter collection to specific date range and area of interest (YEAR 2015)
var collection15 = ee.ImageCollection(landsat8)
    .filterDate('2015-01-01', '2015-05-30')               //define time frame
    .map(applyMask);                                      //apply mask

//As all the pixels had data in the image collection, we did not include data from the previous year. 

//Reduce image collection to single image by applying median function and clip to study region.
var merged15 = collection15.reduce(ee.Reducer.median())
      .clip(parkBoundary);

//Export the image as an Asset.
Export.image.toAsset({
  image: merged15,
  description: 'Landsat2015',
  assetId: 'Landsat2015',
  scale: 30,
  region: parkBoundary
});


//************************************************Cloud Mask for Sentinel-2********************************************************
//Cloud filtering for Year 2016 starts here (using Sentinel-2 MSI data)
//Import Everglades National Park boundary to filter image collection (or other shapefile of interest via fusion tables)
var parkBoundary = ee.FeatureCollection('ft:1KAYShQzYibOCQkxscbvvdNEq0JINOcYLy9wOLIF1','geometry');

//Set location and zoom level
Map.setCenter(-80.67012, 25.15795, 10);
var S2_BANDS = ['B1','B2','B3','B4', 'B5', 'B6','B7','B8', 'B8A',  'B11', 'B12'];
var STD_NAMES = ['aerosols','blue','green','red','red_edge1','red_edge2','red_edge3', 'nir','red_edge4', 'swir1', 'swir2'];

//Create cloudMask function to filter Sentinel-2 imagery based on quality information.
function cloudMask(im) {
  // Opaque and cirrus cloud masks cause bits 10 and 11 in QA60 to be set, so values less than 1024 are cloud-free
  var mask = ee.Image(0).where(im.select('QA60').gte(1024), 1).not();
  return im.updateMask(mask);
};

//Filter image collection by date range and cloudMask function
var c = ee.ImageCollection('COPERNICUS/S2')
	.filterDate('2016-01-01', '2016-05-30')
	.map(cloudMask);

//Reduce image collection to single image using the 15th percentile.
var reducer = c.reduce(ee.Reducer.percentile([15]))
	.clip(parkBoundary);

//Add masked image to map using the selected bands and the min/max parameters
Map.addLayer(reducer.select(11,7,2), {min:0, max:3000});

//Export the image as an Asset.
Export.image.toAsset({
  image: reducer,
  description: 'Sentinel2016',
  assetId: 'Sentinel2016',
  scale: 20,
  region: parkBoundary
});


//********************************************************Classification Codes***************************************************** 
//All Classification codes use the following standard imports, geometry features, and assets. 
//The masked image is collected from the assets that were exported from the FMask code show above. 
//Training and testing samples are modified for each year, but the code is the same.
//Note: you can use our training and testing samples, or you can create your own.

//Import Everglades National Park boundary and GRTS random sampling grid from fusion table (or use your own shapefiles of interest)
//GRTS_Boundary refers to entire GRTS sampling regions, and GRTS_Sample refers to subsample used to identify training and testing points.
var parkBoundary = ee.FeatureCollection('ft:1KAYShQzYibOCQkxscbvvdNEq0JINOcYLy9wOLIF1','geometry');
var GRTS_Sample = ee.FeatureCollection('ft:1vmcnhrotb2Q_BEzMzsFQUyrl7B6Z7jMH21DYVeCS','geometry');
var GRTS_Boundary = ee.FeatureCollection('ft:1ezj-PlbayKFcCQB5I2ZO0O3iEONKRZwhQh8xaSCL', 'geometry');

//Import training and testing samples or create your own geometries now. We used seven classes: Water, Mangrove Forest, Freshwater Marsh, Saltwater Marsh, Shrub/Scrub, Bare Ground/Developed, and Sawgrass Prairie.
//To use our samples, find the appropriate year's geometries at this link: https://github.com/NASA-DEVELOP/GATER/blob/master/README.md

//Merge all geometry imports for classification into variable "newfc" for "new feature collection"
var newfc = Water.merge(MangroveForest).merge(SaltWaterMarsh).merge(Shrub_Scrub).merge(FreshWaterMarsh).merge(BareGround_Developed).merge(SawGrassPrairie);

//Create a dictionary explaining the class meanings. Note: as the classifier did not differentiate between saltwater marsh and sawgrass prairie we combined those two classes.
var classes = [
  {'landcover':0, 'description':'Water'},
  {'landcover':1,'description':'Mangrove Forest'},
  {'landcover':2,'description':'Freshwater Marsh'},
  {'landcover':3,'description':'Saltwater Marsh'},
  {'landcover':4,'description':'Shrub/Scrub'},
  {'landcover':5,'description':'Bare Ground/Developed'},
  {'landcover':3,'description':'Sawgrass Prairie'}
];
print('Class Descriptions', classes); //prints classes to console for reference


//********************************************************Year 1995********************************************************
//Import the 'Landsat1995' image from your Assets (from cloud filtering script above) and call it "imageMasked"

//Reduce "imageMasked" to specific bands you define in the variable "Bands"
var Bands = ['B1_median', 'B2_median', 'B3_median', 'B4_median', 'B5_median', 'B7_median']
var masked = imageMasked.select(Bands);

//Add a random number column to geometry imports, use seed (1, 2, and 3). This will be used to separate data into testing and training points.
var newfc2 = newfc.randomColumn('random', 2);

//Define your classification samples to include newfc2 and the properties to be considered (landcover class type and the random number column)
var samples = masked.sampleRegions({
  collection: newfc2,   
  properties: ['landcover', 'random'], 
  scale: 30 });

//Split "samples" into training and testing points (90% for training and 10% for testing)
var training1995 = samples.filterMetadata('random', 'less_than', 0.9);
var testing1995 = samples.filterMetadata('random', 'not_less_than', 0.9);

//Only use the 90% of points for training classifier
var classifier = ee.Classifier.randomForest(100).train({
 features: training1995, 
 classProperty: 'landcover'});

//Apply classifier to "masked" image for year 1995
var classified = masked.classify(classifier);

//To validate, compare 10% of points reserved for testing to the classification product "classified" in errorMatrix
var validation1995 = testing1995.classify(classifier);                                     
var errorMatrix1995 = validation1995.errorMatrix('landcover', 'classification');           
print('Error Matrix:', errorMatrix1995);
print('Overall Accuracy:', errorMatrix1995.accuracy());
print('Kappa Coefficient 1995: ', errorMatrix1995.kappa());

//The following shows instructions on how to view the classification image
//Set location and zoom level
Map.setCenter(-80.67012, 25.15795, 10); 

//Display either satellite image OR classified layer to reduce loading time. Can also add the GRTS sample grid and vegetation map for creating training points
//"imageMasked" is used to classify, "classified" is the image produced from the training points
//Add satellite image map
Map.addLayer(masked, {bands: ['B5_median', 'B4_median', 'B3_median'], max: 0.3}, 'masked image');

//Creates variable "palette" that lists color selections for landcover types
var palette = ['000000', //Water - Black
               '4d9221', //Mangrove Forest - dark green
               '61380B', //Freshwater Marsh - brown
               'D7DF01', //Saltwater Marsh/Sawgrass Prairie - Yellow
               'CC2EFA', //Shrub/Scrub - Magenta
               'b2182b', //Bare Ground_Developed - Red

              ];

//Add classification image "classified" based on training points
Map.addLayer(classified, 
             {min: 0, max: 5, palette: palette}, 'classification');

//Add GRTS Sampling grids used for identifying subset of GRTS_Boundary for creating training and testing points
Map.addLayer(GRTS_Sample, {color: '#ac8853'}, 'GRTS');

//Add NPS in situ data for training
Map.addLayer(vegetationMap, {color: '000000'}, 'Vegetation Map');

//Export image as .tif file to Google Drive if desired
Export.image.toDrive({
  image: classified,
  description: 'Classified_1995',
  scale: 30,
  region: parkBoundary
});

//Calculate the area in hectares within each GRTS Sampling grid
var area = classified.eq([0, 1, 2, 3, 4, 5]).multiply(ee.Image.pixelArea()).divide(10000);
var reducer = area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: GRTS_Sample,
  scale: 30,
  maxPixels: 50000000,
});
print ('Sampled Grid Area (ha)', reducer); //print area of hectares to console

//Calculate the area of mangroves
var reducerBuffer = area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: GRTS_Boundary,
  scale: 30,
  maxPixels: 50000000,
});
print ('Total Area (ha)', reducerBuffer); //print area to console


//********************************************************Year 2000********************************************************
//Import the 'Landsat2000' image from your Assets (from year 2000 cloud filtering script above) and call it "imageMasked"
//Rename imageMasked "masked"
var masked = imageMasked;

//Add a random number column to geometry imports, use seed (1, 2, and 3). This will be used to separate data into testing and training points.
var newfc2 = newfc.randomColumn('random', 2);

//Define your classification samples to include newfc2 and the properties to be considered (landcover class type and the random number column)
var samples = masked.sampleRegions({
  collection: newfc2,   
  properties: ['landcover', 'random'], 
  scale: 30 });

//Split "samples" into training and testing points (90% for training and 10% for testing)
var training2000 = samples.filterMetadata('random', 'less_than', 0.9);
var testing2000 = samples.filterMetadata('random', 'not_less_than', 0.9);

//Only use the 90% of points for training classifier
var classifier = ee.Classifier.randomForest(100).train({
 features: training2000, 
  classProperty: 'landcover'});

//Apply classifier to "masked" image for year 1995
var classified = masked.classify(classifier);

//To validate, compare 10% of points reserved for testing to the classification product "classified" in errorMatrix
var validation2000 = testing2000.classify(classifier);                                     
var errorMatrix2000 = validation2000.errorMatrix('landcover', 'classification');           
print('Error Matrix:', errorMatrix2000);
print('Overall Accuracy:', errorMatrix2000.accuracy());
print('Kappa Coefficient 2000: ', errorMatrix2000.kappa());

//The following shows instructions on how to view the classification image
//Set location and zoom level
Map.setCenter(-80.67012, 25.15795, 10); 

//Display either satellite image OR classified layer to reduce loading time. Can also add the GRTS sample grid and vegetation map for creating training points
//"imageMasked" is used to classify, "classified" is the image produced from the training points
//Add satellite image map
Map.addLayer(masked, {bands: ['B5_median', 'B4_median', 'B3_median'], max: 0.3}, 'masked image');

//Creates variable "palette" that lists color selections for landcover types
var palette = ['000000', //Water - Black
               '4d9221', //Mangrove Forest - dark green
               '61380B', //Freshwater Marsh - brown
               'D7DF01', //Saltwater Marsh/Sawgrass Prairie - Yellow
               'CC2EFA', //Shrub/Scrub - Magenta
               'b2182b', //Bare Ground_Developed - Red
              ];

//Add classification image "classified" based on training points
Map.addLayer(classified, 
             {min: 0, max: 5, palette: palette}, 'classification');

//Add GRTS Sampling grids used for identifying subset of GRTS_Boundary for creating training and testing points
Map.addLayer(GRTS_Sample, {color: '#ac8853'}, 'GRTS');

//Add NPS in situ data for training
Map.addLayer(vegetationMap, {color: '000000'}, 'Vegetation Map');

//Export image as .tif to Google Drive
Export.image.toDrive({
  image: classified,
  description: 'Classified_2005',
  scale: 30,
  region: parkBoundary
});

//Calculate the area in hectares within each GRTS Sampling Grid
var area = classified.eq([0, 1, 2, 3, 4, 5]).multiply(ee.Image.pixelArea()).divide(10000);
var reducer = area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: GRTS_Sample,
  scale: 30,
  maxPixels: 50000000,
});
print ('Sampled Grid Area (ha)', reducer);

//Calculate the area within the mangrove buffer region
var reducerBuffer = area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: GRTS_Boundary,
  scale: 30,
  maxPixels: 50000000,
});
print ('Total Area (ha)', reducerBuffer);


//********************************************************Year 2005********************************************************

//add a random number column to geometry imports, use seed (1, 2, and 3)
var newfc2 = newfc.randomColumn('random', 2);

//Call the masked image in the Assets
var masked = imageMasked;

//define your classification samples to incl. newfc2 and the properties to be considered
var samples = masked.sampleRegions({
  collection: newfc2,   
  properties: ['landcover', 'random'], 
  scale: 30 });

//split training points (90% and 10%)  
var training2005 = samples.filterMetadata('random', 'less_than', 0.9);
var testing2005 = samples.filterMetadata('random', 'not_less_than', 0.9);

//only use the 90% for classification
var classifier = ee.Classifier.randomForest(100).train({
 features: training2005, 
  classProperty: 'landcover'});

//apply classifier
var classified = masked.classify(classifier);

//to validate, compare 10% testing points to the classification product in errorMatrix
var validation2005 = testing2005.classify(classifier);                                     
var errorMatrix2005 = validation2005.errorMatrix('landcover', 'classification');           
print('Error Matrix:', errorMatrix2005);
print('Overall Accuracy:', errorMatrix2005.accuracy());
print('Kappa Coefficient 2005: ', errorMatrix2005.kappa());


//set location and zoom level
Map.setCenter(-80.67012, 25.15795, 10); 


//Display either satellite image OR classified layer to reduce loading time. Can also add the GRTS sample grid and vegetation map for creating training points
//image_masked is used to classify, classified is the image produced from the training points
//Add satellite image map
Map.addLayer(masked, {bands: ['B5_median', 'B4_median', 'B3_median'], max: 0.3}, 'masked image');

var palette = ['000000', //Water - Black
               '4d9221', //Mangrove Forest - dark green
               '61380B', //Freshwater Marsh - brown
               'D7DF01', //Saltwater Marsh/Sawgrass Prairie - Yellow
               'CC2EFA', //Shrub/Scrub - Magenta
              ];

//add classification based on training points
Map.addLayer(classified, 
             {min: 0, max: 5, palette: palette}, 'classification');
Map.addLayer(GRTS_Sample, {color: '#ac8853'}, 'GRTS');
Map.addLayer(vegetationMap, {color: '000000'}, 'Vegetation Map');


/*
//export image to google drive
Export.image.toDrive({
  image: classified,
  description: 'Classified_2005',
  scale: 30,
  region: parkBoundary
});*/


//Calculate the area in hectares within each GRTS Sampling Grid
var area = classified.eq([0, 1, 2, 3, 4, 5]).multiply(ee.Image.pixelArea()).divide(10000);
var reducer = area.reduceRegion({
  reducer: ee.Reducer.sum(),
  maxPixels: 50000000,
  scale: 30,
  geometry: GRTS_Sample
});
print ('Sampled Grid Area (ha)', reducer);

//Calculate the area within the mangrove buffer region
var reducerBuffer = area.reduceRegion({
  reducer: ee.Reducer.sum(),
  maxPixels: 50000000,
  scale: 30,
  geometry: GRTS_Boundary
});
print ('Total Area (ha)', reducerBuffer);



//********************************************************Year 2010********************************************************

//add a random number column to geometry imports, use seed (1, 2, and 3)
var newfc2 = newfc.randomColumn('random', 2);

//Call the masked image in the Assets
var masked = imageMasked;

//define your classification samples to incl. newfc2 and the properties to be considered
var samples = masked.sampleRegions({
  collection: newfc2,   
  properties: ['landcover', 'random'], 
  scale: 30 });

//split training points (90% and 10%)  
var training2010 = samples.filterMetadata('random', 'less_than', 0.9);
var testing2010 = samples.filterMetadata('random', 'not_less_than', 0.9);

//only use the 90% for classification
var classifier = ee.Classifier.randomForest(100).train({
 features: training2010, 
  classProperty: 'landcover'});

//apply classifier
var classified = masked.classify(classifier);

//to validate, compare 10% testing points to the classification product in errorMatrix
var validation2010 = testing2010.classify(classifier);                                     
var errorMatrix2010 = validation2010.errorMatrix('landcover', 'classification');           
print('Error Matrix:', errorMatrix2010);
print('Overall Accuracy:', errorMatrix2010.accuracy());
print('Kappa Coefficient 2010: ', errorMatrix2010.kappa());


//set location and zoom level
Map.setCenter(-80.67012, 25.15795, 10); 

//Display either satellite image OR classified layer to reduce loading time. Can also add the GRTS sample grid and vegetation map for creating training points
//image_masked is used to classify, classified is the image produced from the training points
//Add satellite image map
Map.addLayer(masked, {bands: ['B5_median', 'B4_median', 'B3_median'], max: 0.3}, 'masked image');

var palette = ['000000', //Water - Black
               '4d9221', //Mangrove Forest - dark green
               '61380B', //Freshwater Marsh - brown
               'D7DF01', //Saltwater Marsh/Sawgrass Prairie - Yellow
               'CC2EFA', //Shrub/Scrub - Magenta
               'b2182b', //Bare Ground_Developed - Red
              ];

//add classification based on training points
Map.addLayer(classified, 
             {min: 0, max: 5, palette: palette}, 'classification');
Map.addLayer(GRTS_Sample, {color: '#ac8853'}, 'GRTS');
Map.addLayer(vegetationMap, {color: '000000'}, 'Vegetation Map');


/*
//export image to google drive
Export.image.toDrive({
  image: classified,
  description: 'Classified_2010',
  scale: 30,
  region: parkBoundary
});*/


//Calculate the area in hectares within each GRTS Sampling Grid
var area = classified.eq([0, 1, 2, 3, 4, 5]).multiply(ee.Image.pixelArea()).divide(10000);
var reducer = area.reduceRegion({
  reducer: ee.Reducer.sum(),
  maxPixels: 50000000,
  scale: 30,
  geometry: GRTS_Sample
});
print ('Sampled Grid Area (ha)', reducer);

//Calculate the area within the mangrove buffer region
var reducerBuffer = area.reduceRegion({
  reducer: ee.Reducer.sum(),
  maxPixels: 50000000,
  scale: 30,
  geometry: GRTS_Boundary
});
print ('Total Area (ha)', reducerBuffer);



//********************************************************Year 2015********************************************************

//add a random number column to geometry imports, use seed (1, 2, and 3)
var newfc2 = newfc.randomColumn('random', 2);

//Call the masked image in the Assets
var masked = imageMasked;

//define your classification samples to incl. newfc2 and the properties to be considered
var samples = masked.sampleRegions({
  collection: newfc2,   
  properties: ['landcover', 'random'], 
  scale: 30 });

//split training points (90% and 10%)  
var training2015 = samples.filterMetadata('random', 'less_than', 0.9);
var testing2015 = samples.filterMetadata('random', 'not_less_than', 0.9);

//only use the 90% for classification
var classifier = ee.Classifier.randomForest(100).train({
 features: training2015, 
  classProperty: 'landcover'});

//apply classifier
var classified = masked.classify(classifier);

//to validate, compare 10% testing points to the classification product in errorMatrix
var validation2015 = testing2015.classify(classifier);                                     
var errorMatrix2015 = validation2015.errorMatrix('landcover', 'classification');           
print('Error Matrix:', errorMatrix2015);
print('Overall Accuracy:', errorMatrix2015.accuracy());
print('Kappa Coefficient 2015: ', errorMatrix2015.kappa());


//set location and zoom level
Map.setCenter(-80.67012, 25.15795, 10); 

//Display either satellite image OR classified layer to reduce loading time. Can also add the GRTS sample grid and vegetation map for creating training points
//image_masked is used to classify, classified is the image produced from the training points
//Add satellite image map
Map.addLayer(masked, {bands: ['B6_median', 'B5_median', 'B4_median'], max: 0.3}, 'masked image');

var palette = ['000000', //Water - Black
               '4d9221', //Mangrove Forest - dark green
               '61380B', //Freshwater Marsh - brown
               'D7DF01', //Saltwater Marsh/Sawgrass Prairie - Yellow
               'CC2EFA', //Shrub/Scrub - Magenta
               'b2182b', //Bare Ground_Developed - Red
              ];

//add classification based on training points
Map.addLayer(classified, 
             {min: 0, max: 5, palette: palette}, 'classification');
Map.addLayer(GRTS_Sample, {color: '#ac8853'}, 'GRTS');
Map.addLayer(vegetationMap, {color: '000000'}, 'Vegetation Map');


/*
//export image as a .tif file to google drive if desired
Export.image.toDrive({
  image: classified,
  description: 'Classified_2015',
  scale: 30,
  region: parkBoundary
});*/


//Calculate the area in hectares within each GRTS Sampling Grid
var area = classified.eq([0, 1, 2, 3, 4, 5]).multiply(ee.Image.pixelArea()).divide(10000);
var reducer = area.reduceRegion({
  reducer: ee.Reducer.sum(),
  maxPixels: 50000000,
  scale: 30,
  geometry: GRTS_Sample
});
print ('Sampled Grid Area (ha)', reducer);

//Calculate the area within the mangrove buffer region
var reducerBuffer = area.reduceRegion({
  reducer: ee.Reducer.sum(),
  maxPixels: 50000000,
  scale: 30,
  geometry: GRTS_Boundary
});
print ('Total Area (ha)', reducerBuffer);



//********************************************************Year 2016********************************************************

//add a random number column to geometry imports, use seed (1, 2, and 3)
var newfc2 = newfc.randomColumn('random', 2);

//Call the sentinel and landsat images from the Assets
var sentinel = sentinel2a;
var landsat = landsat8;

//define your classification samples to incl. newfc2 and the properties to be considered
var samples = sentinel.sampleRegions({
  collection: newfc2,   
  properties: ['landcover', 'random'], 
  scale: 20 
});

var landsatSamples = landsat.sampleRegions({
  collection: newfc2,
  properties: ['landcover', 'random'],
  scale: 30
})

//split training points (90% and 10%) for Sentinel 
var sentTraining2016 = samples.filterMetadata('random', 'less_than', 0.9);
var sentTesting2016 = samples.filterMetadata('random', 'not_less_than', 0.9);

//split training points (90% and 10%) for Landsat 8
var landTraining2016 = landsatSamples.filterMetadata('random', 'less_than', 0.9);
var landTesting2016 = landsatSamples.filterMetadata('random', 'not_less_than', 0.9);

//Use all samples to classify or only 90% to validate Sentinel only later on--90% == training2015
var sentinelClassifier = ee.Classifier.randomForest(100).train({
  features: samples, 
  classProperty: 'landcover'});
  
var landsatClassifier = ee.Classifier.randomForest(100).train({
  features: landTraining2016, 
  classProperty: 'landcover'});

//apply classifier to borth Sentinel and Landsat 8
var sentinelClassified = sentinel.classify(sentinelClassifier);
var landsatClassified = landsat.classify(landsatClassifier);


// Get a confusion matrix for the Landsat 8 OLI image by comparing 10% of the testing points to the classified image.
var validation2016 = landTesting2016.classify(landsatClassifier); 
var testAccuracy= validation2016.errorMatrix('landcover', 'classification');
print('Validation error matrix 2016 (Landsat 8): ', testAccuracy);
print('Validation overall accuracy 2016 ', testAccuracy.accuracy());
print('Kappa Coefficient 2016: ', testAccuracy.kappa());

/*
//To validate Sentinel, compare 10% testing points to the classification product in errorMatrix
var sentValidation2016 = sentTesting2016.classify(sentinelClassifier);                                     
var errorMatrix2016 = sentValidation2016.errorMatrix('landcover', 'classification');           
print('Error Matrix:', errorMatrix2016);
print('Overall Accuracy:', errorMatrix2016.accuracy());
print('Kappa Coefficient 2016: ', errorMatrix2016.kappa());*/


//set location and zoom level
Map.setCenter(-80.67012, 25.15795, 10); 


//Display either satellite image OR classified layer to reduce loading time. Can also add the GRTS sample grid and vegetation map for creating training points
//Add cloud-free Sentinel-2a satellite image map using false color composite
	//Map.addLayer(sentinel, {bands: ['B11_p15', 'B8_p15', 'B4_p15'], max: 2500}, 'Sentinel image');
//Add cloud-free landsat 8 satellite image in false color composite
	//Map.addLayer(landsat, {bands: ['B6_median', 'B5_median', 'B4_median'], max: 0.3}, 'Landsat 8 - 2016');

var palette = ['000000', //Water - Black
               '4d9221', //Mangrove Forest - dark green
               '61380B', //Freshwater Marsh - brown
               'D7DF01', //Saltwater Marsh/Sawgrass Prairie - Yellow
               'CC2EFA', //Shrub/Scrub - Magenta
               'b2182b', //Bare Ground_Developed - Red
              ];

//add classification based on training points
Map.addLayer(sentinelClassified, 
             {min: 0, max: 5, palette: palette}, 'Classified Sentinel');
Map.addLayer(landsatClassified, 
             {min: 0, max: 5, palette: palette}, 'Classified Landsat');
//Display the GRTS sampling grids
//Map.addLayer(GRTS_Sample, {color: '#ac8853'}, 'GRTS');
//Display the in situ data points
//Map.addLayer(vegetationMap, {color: '000000'}, 'Vegetation Map');


/*
//export image to google drive
Export.image.toDrive({
  image: landsatClassified,
  description: 'Landsat_2016',
  scale: 30,
  region: parkBoundary
});*/


//Calculate the area in hectares within each GRTS Sampling Grid for the landsat land cover map. Sentinel-2 land cover map is too large for GEE API to calculate 
the area.
var area = landsatClassified.eq([0, 1, 2, 3, 4, 5]).multiply(ee.Image.pixelArea()).divide(10000);
var reducer = area.reduceRegion({
  reducer: ee.Reducer.sum(),
  maxPixels: 50000000,
  scale: 30,
  geometry: GRTS_Sample
});
print ('Sampled Grid Area (ha)', reducer);

//Calculate the area within the mangrove buffer region
var reducerBuffer = area.reduceRegion({
  reducer: ee.Reducer.sum(),
  maxPixels: 50000000,
  scale: 30,
  geometry: GRTS2
});
print ('Total Area (ha)', reducerBuffer);

