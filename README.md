![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/immunize_logo_gif.gif)
## Inspiration
Most of the countries were unprepared to face the Covid-19 pandemic and were not successful in controlling the infection rate. However, given that the vaccine for Covid-19 would be discovered soon, we must have a system in place which will not only distribute the vaccine to the mass population, but will also capture data and churn out patterns to generate insights. This could also be preserved as a learning for the future generation.


## What it does
Since a large scale population is affected by the Covid-19 virus, most of the people would want the vaccine as soon as possible. However, there might be a set of people like children, old people, essential service workers and people with life-threatening diseases who will need the vaccine more than the healthy adults. So it is essential that the right people get that dose of vaccine at the right time. The Immunize platform scores an individual based on these parameters and assigns a priority to an individual.
Also, since there would be a limited staff to disburse the vaccines and a high demand, it is extremely important to streamline this process.


## Features
###### 1 . Home Page

![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/home_gif.gif)


###### 2 . Login to the application, powered by Auth0

![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/Screenshot%20(107).png)


###### 3 . Edit profile to add details, in order to book an appointment
User inputs like age, occupation, pre-existing diseases will be captured and modelled, to assign a priority to each individual. Goal is to serve such individuals first. According to that priority an appointment will be scheduled for that user. If a higher priority applicant applies for the vaccine, the healthy individual will again enter the waiting list.

![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/profile_gif.gif)

###### 4 . Upload identity proof documents
The scanned image will be processed and information like name, date of birth and ID will be validated against the user inputs

![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/ocr_gif.gif)

###### 5 . Check for available vaccine centers in your vicinity
All the available vaccine centres will be marked on the map with their exact address details and names.

![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/vc_centers_gif.gif)

###### 6 . Availabilty of vaccine stocks at each center
User will also be able to check the availabilty of the vaccine stocks and the total booking requests made to that particular vaccine center.

![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/vc_centers_stocks_gif.gif)

###### 7 . Check for available slots on a calendar
User can get a day-wise summary of the statistics for each vaccine center, inorder to get an estimate of the waiting queue.

![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/calendar_gif.gif)

###### 8 . Book an appointment for receiving the vaccine
Finally, when the user finds a slot, he can book an appointment for the same

![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/book_app_gif.gif)

###### 9 . Admin Dashboard
The dashboard will give a summary of all the users, appointment requests, pending requests, total users served and other analysis.

![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/admin_db.png)

###### 10 . Graph to display the day-wise vaccine slots and the user demands

![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/graph_gif.gif)

###### 11 . Piechart to display the age group-wise vaccine slots and the user demands

![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/pie_gif.gif)

###### 12 . Adding a new vaccine center
Admin can add a new vaccine center by typing the address, which will be geo-coded to extract the latitude and longitude co-ordinates and will be marked on the map. 

![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/new_center_gif.gif)


## Prerequisites
Before running this locally you must have Node installed

## Development

1. ```git clone https://github.com/jui2010/Immunize```
2. ```npm install```
3. ```npm start```

## Tech Stack used
Node, React, MongoDB, Flask, Python, Leafletjs, Tessaract.js, Auth0


## Accomplishments that I'm proud of
The platform also has a feature where it prompts a user for submitting scanned copy of identity proof, so that these users can be given a higher priority. Using a optical character recognition engine to extract the name/date of birth/ Id from the scanned image, is something I implemented for the first time.

## What's next for Immunize
The Immunize app idea should be used by everyone to build a robust system for efficient delivery of the life saving vaccine. I would want to implement more data analytics around this, and also build a demand-supply evaluator, wherein if a highly populated area is falling short for vaccines, the supply from vaccine centers who have extra stock will be redirected. I will also implement a payment option, if at all the vaccine cost would be higher. A channel where people can post about the side effects they have encountered if any, would also be a good-to-have feature.

## 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
