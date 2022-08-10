# teamesse

## 1. Project Description
Our project is for people who require extra motivation to study and those who want to partake in building good study habits in a collaborative matter. Users will be able to use the pomodoro timer and then be able to share their study stats with others. We will store user profiles i.e. status (occupation/student/school), things they are studying for/working on, their studying stats, and brief info about the user. Users will be able to share their studying stats with other users on the app and comment on progress towards each others goals. For stretch goals, we will consider implementing a live pomodoro timer (shared sessions) and voice chat and/or video calling, if time permits.

## 2. Project Task Requirements
Minimal Requirements:
- Pomodoro Timer
  - ✅ Create timer.
  - ✅ Dropdowns for intervals (study time), break times, interval count.
  - ✅ Buttons for starting, stopping, pausing/resuming.
  - ✅ General UI design (night mode toggle).

- User Profile
  - ✅ Create/read/upload/delete display picture.
  - ✅ Create/read/edit/delete text boxes for user information (occupation/personal info/school/interests/description, etc).
  - ✅ General UI design (display picture, user information, etc).
  - ✅ Stat showcase (time spent studying, how many pomodoros achieved, etc).

- Authentication
  - ✅ Password hashing
  - ✅ Persistent sessions using LocalStorage
  - ✅ Account verification against MongoDB

Standard Requirements:
- ✅ Tracking study habits and/or pomodoro stats (GitHub style heatmap for days/intervals).
- ✅ Commenting/reacting to other user's pomodoro stats.

Stretch Requirements:
- ✅ Theming system
- ✅ Live collaboration pomodoro session.
- ✅ Add (optional) music to play during pomodoro session.
- ⚠️ Optional chatroom/video call feature.
- ⚠️ Add sounds for start/finish/pause of pomodoro session.
- ⚠️ Sharing user profile/pomodoro stats with other users.

![pomodoro](https://github.com/dabeedc/teamesse/blob/main/pomodoroproto.drawio.png)
![userprofile](https://github.com/dabeedc/teamesse/blob/main/userprofileproto.drawio.png)

## 3. Tools from CPSC 455 we used in our project

### React/HTML/JS/CSS
The UI of our application is built with React. We built our app with the Material-UI React component library and organized our jsx files by features (eg. Statistics, Subjects, Pomodoro Clock, User Settings, Auth). We created reusable components to reduce code duplication and prioritized reusability and extensibility in the composition of our components. In addition, we have used CSS to style the different components and to implement app responsiveness to further enhance user experience.

### Redux
We are using Redux to manage the global state of our application. We use the Redux store to manage various pieces of state including themes, current user details, and pomodoro clock state.

### NodeJS/Express.js
For our backend API, we used NodeJS with Express.js to expose a REST API on a webserver that is called by our UI. We separated our API routes into auth, profile, session, and stats. We are also hosting a WebSocket server on the same port as our Express server, which we will discuss further in the Above and Beyond functionality.

### MongoDB
We are storing persistent data in MongoDB. We opted to store all of our user data (including pomodoro session) in one MongoDB collection. We thought about maintaining separate collections for user profiles and pomodoro sessions, but opted for the one-collection approach to avoid the need for relational queries. A few of our REST API endpoints return aggregated data from MongoDB (eg. average time of a pomodoro session per day) which are made using queries to MongoDB. 

### Heroku
To deploy our application, we utilized Heroku. Our Heroku application has GitHub integration enabled, allowing us to automatically deploy our application via continuous delivery whenever we make a merge to the `main` branch in our Github repository. 


## 4. Description of Above and Beyond functionality

### Pomodoro Clock Server (WebSocket API)
To facilitate the social aspect of the pomodoro clock, we implemented a WebSocket server that is served on the same NodeJS HTTP server as our Express.js REST API. We came up with a complex client-server messaging system with the WebSocket API to broadcast messages in a study room, allow users to send instant messages to each other, and see a list of users in each room. WebSockets allow us to provide real-time updates to our users to create a truly social experience. 

Any user in a study room can control the pomodoro clock, which will trigger the corresponding action in the WebSocket server (eg. starting/stopping/pausing/resetting the clock). Once a focus or break session is over, the server will send a message to the client that the session is complete, and the client can react to the message appropriately. 

![clock](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20003306.jpg)

### Focus Mode
To facilitate a true pomodoro experience, we implemented a focus mode in the pomodoro clock that dims the background and brings the clock to the center of the page using CSS. Additionally, we disable the chat functionality in the study room to help our users avoid distraction. We used CSS transitions/shadows as well as custom `pointer-events` behaviour to implement this feature. 

![focusMode](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20003419.jpg)
### Customized Tooltip
To visualize the individual data points in the data visualization components, including the Subjects and Statistics pages, we have created the customized tooltip. The tooltip allows users to hover each data point in the calendar map which displays the specific calendar date (YYYY-MM-DD) with the total minutes of pomodoro sessions completed. In the Subjects page, the tooltip allows users to hover each section of the data chart which displays the subject with the accumulated minutes studied.
### Reactions
We wanted to have some interactivity between our users since this is a social application at its core. We added the ability for users to react to each other's pomodoro sessions with emojis. In the Explore page, each pomodoro session has a list of emojis and a count of how many reactions there were for each emoji on that session. 

![reactions](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20003643.jpg)

### Theming
In addition, we have implemented the toggle feature for users to enable various toggle modes, specifically default, slate, and light green. The different color schemas will allow users to customize and choose a specific thematic background to their preference across all the pages of the app. 
![default](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20003508.jpg)
![slate](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20003520.jpg)
![lightgreen](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20003534.jpg)

### Responsive Calendar
The responsive calendar utilizes the nivo api with the dedicated backend endpoint. To populate the responsive calendar with the user data of the pomodoro sessions, we have implemented aggregated query from MongoDB to fetch the information about the data and the total duration of pomodoro sessions completed per date. The responsive calendar also includes the discussed custom tooltip to display the statistics information.

![tooltip](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20003556.jpg)

### CSS, Responsive Design
For our pomodoro app, we have went above and beyond to achieve app responsiveness. For example, in the Statistics page, the pomodoro statistics cards and the statistics calendar adjust accordingly in response to the width of the browser for enhanced user experience. The statistics calendar rotates sideways to re-adjust and fit according to the specified width of the page. The pomodoro statistics cards stack re-adjust and fit by stacking vertically to align with the changed width of the page.

## 5. Description of Next Steps
For next steps, we would like to add the functionality of adding and connecting with friends for pomodoro sessions and provide the additional social aspect to the application. Furthermore, we would like to further improve the app by including the feature for users to create custom pomodoro groups and invite other users/friends to join for collaborative study sessions.

## 6. List of Contributions

### Scott King (x2f2b)
- Led the development of the WebSocket server that controls the social pomodoro clock, as well as all the UI design and React/HTML/CSS code that was involved with the clock features
- Assisted with implementing the reaction feature on both the frontend and backend
- Implemented Redux infrastructure and populated store with global state
- Overall UX/UI

### James Park (y3o8)
- Implemented the MongoDB queries required to display the statistics information with the data visualization components including the statistics cards and responsive calendar in the Statistics page of the app
- Worked on adding the data chart component in our app to show the proportion of various subjects studied from the pomodoro sessions with the aggregated time data in the Subjects page
- Implemented adding the shared user statistics table as part of the Explore page
- Overall UX/UI

### David Chung (d4n1b)
- Designed and implemented the UX/UI of the application through the usage of react-router alongside components such as the landing page, user login/signup, and editing of user profile (both the frontend and backend).
- Worked collaboratively to incorporate the Mongoose Model to connect our frontend and backend with the MongoDB database.
- Assisted with overall features within the statistics page such as the reaction feature (frontend and backend).

## Application Gallery

### teamesse landing page  
![teamesse](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20002908.jpg)  

### Login card  
![login](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20003037.jpg)  

### Signup card  
![signup](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20003009.jpg)  

### Dashboard with all features available   
![dashboard](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20003109.jpg)   

### Customizable focus and break intervals  
![session](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20003444.jpg)       

### Elegant data visualization  
![piechart](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20003611.jpg)      

### Quickly edit user profile  
![edit](https://github.com/dabeedc/teamesse/blob/main/previewScreenshots/Screenshot%202022-08-10%20003713.jpg)   
