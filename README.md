Notices:
Copyright 2017 United States Government as represented by the Administrator of the National Aeronautics and Space Administration. All Rights Reserved.
 
Disclaimers
No Warranty: THE SUBJECT SOFTWARE IS PROVIDED "AS IS" WITHOUT ANY WARRANTY OF ANY KIND, EITHER EXPRESSED, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, ANY WARRANTY THAT THE SUBJECT SOFTWARE WILL CONFORM TO SPECIFICATIONS, ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR FREEDOM FROM INFRINGEMENT, ANY WARRANTY THAT THE SUBJECT SOFTWARE WILL BE ERROR FREE, OR ANY WARRANTY THAT DOCUMENTATION, IF PROVIDED, WILL CONFORM TO THE SUBJECT SOFTWARE. THIS AGREEMENT DOES NOT, IN ANY MANNER, CONSTITUTE AN ENDORSEMENT BY GOVERNMENT AGENCY OR ANY PRIOR RECIPIENT OF ANY RESULTS, RESULTING DESIGNS, HARDWARE, SOFTWARE PRODUCTS OR ANY OTHER APPLICATIONS RESULTING FROM USE OF THE SUBJECT SOFTWARE.  FURTHER, GOVERNMENT AGENCY DISCLAIMS ALL WARRANTIES AND LIABILITIES REGARDING THIRD-PARTY SOFTWARE, IF PRESENT IN THE ORIGINAL SOFTWARE, AND DISTRIBUTES IT "AS IS."
 
Waiver and Indemnity:  RECIPIENT AGREES TO WAIVE ANY AND ALL CLAIMS AGAINST THE UNITED STATES GOVERNMENT, ITS CONTRACTORS AND SUBCONTRACTORS, AS WELL AS ANY PRIOR RECIPIENT.  IF RECIPIENT'S USE OF THE SUBJECT SOFTWARE RESULTS IN ANY LIABILITIES, DEMANDS, DAMAGES, EXPENSES OR LOSSES ARISING FROM SUCH USE, INCLUDING ANY DAMAGES FROM PRODUCTS BASED ON, OR RESULTING FROM, RECIPIENT'S USE OF THE SUBJECT SOFTWARE, RECIPIENT SHALL INDEMNIFY AND HOLD HARMLESS THE UNITED STATES GOVERNMENT, ITS CONTRACTORS AND SUBCONTRACTORS, AS WELL AS ANY PRIOR RECIPIENT, TO THE EXTENT PERMITTED BY LAW.  RECIPIENT'S SOLE REMEDY FOR ANY SUCH MATTER SHALL BE THE IMMEDIATE, UNILATERAL TERMINATION OF THIS AGREEMENT.

Project Title: Google Applications for Transitioning Everglades Regions (GATER)


Purpose and Description of Innovation/Software

This code collection is for use within Google Earth Engine API (GEE), an open-source software. The purpose is to improve the efficiency of analyzing multiple 
Landsat images by removing clouds using the FMask band in order to produce land cover maps of the Everglades National Park. Due to the complexity and limitations
of GEE, clouds were removed from each image, aggregated to produce a cloud-free image for each year, and then exported as an asset. These assets could then
be imported into a new code editor within GEE for improved processing speed of land cover, accuracy assessment, and area calculations. 

Sentinel-2: Multispectral Instrument (MSI), Level-1C images were also used to create a higher resolution land cover analysis for the year 2016. 
Clouds were removed by creating a threshold using the QA60 band. Values less than 1024 were considered cloud-free and removed and then aggregated with other
scenes to produce one image. Cloud-free Sentinel-2a image was also exported as an asset and then imported into a new code editor with GEE for analysis. 

The dry season for each study period (1995, 2000, 2005, 2010, 2015, and 2016) were used for the classification analysis. Validation was performed by using
90% of the training samples for classification and the remaining 10% for testing. Training samples can be drawn directly within the GEE interface and then used 
for classification. 

Resulting output maps can all be displayed easily on the interface and
each map layer can be toggled on or off. Lastly, maps can be exported onto a Google Cloud and downloaded as a .tif file for use in ArcGIS or other supporting
software. 


Documentation and references

Google Earth Engine API: https://earthengine.google.com/
Google Earth Engine online tutorial and guide: https://developers.google.com/earth-engine/getstarted


Code Details

The software includes embedded computer databases as it uses imagery from USGS and Copernicus stored data and with open-source software: Google Earth Engine API.

Link to the GEE Code Editor for cloud removal of Landsat 5 TM, Landsat 7 ETM+, and Landsat 8 OLI: https://code.earthengine.google.com/af4119a14512f546ab86d03024b9ea42
Link to the GEE Code Editor for cloud removal of Sentinel-2a: https://code.earthengine.google.com/d6534d261c8409549fb0d826379cb066

Cloud Mask Properties for Images

fmask : cloud mask pixel identification for Landsat Series
0 = clear
1 = water
2 = cloud shadow
3 = snow
4 = cloud

Sentinel-2 : QA60 - bit mask band with cloud mask information. Bit 10 is set if the corresponding 60m pixel has been marked as OPAQUE. Bit 11 is set it the
corresponding 60m pixel has been marked as CIRRUS. Values less than 1024 are considered 'Cloud-free'.

Link to the GEE Code editor for the year 1995: https://code.earthengine.google.com/32f25afabcbd20dd3a20ca954bf13b16
Link to the GEE Code editor for the year 2000: https://code.earthengine.google.com/3edcc855a5942a5bf7f971e94fbd37c8
Link to the GEE Code editor for the year 2005: https://code.earthengine.google.com/d9ac3ad890a70be7f778a9a2342dd26e
Link to the GEE Code editor for the year 2010: https://code.earthengine.google.com/a495ce8ced84d8a25fe17097307798dc
Link to the GEE Code editor for the year 2015: https://code.earthengine.google.com/d296f6b244ba4fab66bba81ac235e5d4
Link to the GEE Code editor for the year 2016: https://code.earthengine.google.com/e3fae5ad11bb9e6fecd04a705d041bc5

GEE allows for the use of vector data through kml files and upladed as fusion tables. The fusion tables used in this code contain the Everglades National Park
Boundary layer, the Generalized Random Tesselation Stratified (GRTS) sampling grids, and the GRTS boundary. Fusion tables can be called using the ee.FeatureCollection('ft:')
fuction and inserting the unique id provided by the Google Fusion Table Application.

Classifications are as follows:

0 - Water
1 - Mangrove Forest
2 - Freshwater Marsh
3 - Saltwater Marsh/sawgrass Prairie
4 - Shrub/Scrub
5 - Bare Ground/Developed


Innovators and Contributions

All innovations performed at DEVELOP National Program, NASA Langley Research Center, Hampton, VA. 23681

1. Amy Wolfe- Co-lead Software Developer
2. Caitlin Toner- Co-lead Software Developer
3. Donnie Kirk- Project Manager
4. Rachel Cabosky- Contributor, Software Testing

         
