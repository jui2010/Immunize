![](https://github.com/jui2010/Immunize/blob/master/frontend/src/assets/immunize_logo_gif.gif)
## Inspiration
Most of the countries were unprepared to face the Covid-19 pandemic and were not successful in controlling the infection rate. However, given that the vaccine for Covid-19 would be discovered soon, we must have a system in place which will not only distribute the vaccine to the mass population, but will also capture data and churn out patterns to generate insights. This could also be preserved as a learning for the future generation.

## What it does
Since a large scale population is affected by the Covid-19 virus, most of the people would want the vaccine as soon as possible. However, there might be a set of people like children, old people, essential service workers and people with life-threatening diseases who will need the vaccine more than the healthy adults. So it is essential that the right people get that dose of vaccine at the right time. The Immunize platform scores an individual based on these parameters and assigns a priority to an individual.
Also, since there would be a limited staff to disburse the vaccines and a high demand, it is extremely important to streamline this process.

## How I built it
An user booking an appointment for receiving the vaccine will login/signup which will happen via Auth0. Once a user logs in, he will be able to view all the vaccine centers near his vicinity on a Map. Each vaccine center will also have information related to the number of stocks of vaccine available and the total appointments. A calendar which will also show the day-by-day summary of the vaccine stocks and requests is also available. This will give the user an idea of the waiting queue. Accordingly a user can book a slot on the particular day. However, a user should keep in mind that his turn might get postponed as high priority patients who require vaccine urgently will come in the picture.

An admin will have the dashboard with all analytics and tracking tools. He can check the total requests/stock of vaccines/ total vaccines disbursed from the dashboard. Apart from that a user can enter address of a new vaccine center, and that address will be geo-coded and then displayed on the map.

## Challenges I ran into
Plotting the vaccine centers on the map was a bit challenging. 

## Accomplishments that I'm proud of
The platform also has a feature where it prompts a user for submitting scanned copy of identity proof, so that these users can be given a higher priority. Using a optical character recognition engine to extract the name/date of birth/ Id from the scanned image, is something I implemented for the first time.

## What I learned
I learnt how to create a minimum viable product in 2 days. Prioritizing which features to add and time management are the important skills I learnt.

## What's next for Immunize
The Immunize app idea should be used by everyone to build a robust system for efficient delivery of the life saving vaccine. I would want to implement more data analytics around this, and also build a demand-supply evaluator, wherein if a highly populated area is falling short for vaccines, the supply from vaccine centers who have extra stock will be redirected. I will also implement a payment option, if at all the vaccine cost would be higher. A channel where people can post about the side effects they have encountered if any, would also be a good-to-have feature.

## 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
