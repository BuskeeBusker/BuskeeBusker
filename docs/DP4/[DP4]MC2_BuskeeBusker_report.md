# DP4 Report  - Lo-fi Prototyping

### [MC2] Team Buskee Busker

**20140176	Hyoungseok Kim**

**20130799	Kyung Je Jo**

**20140330 	Seokchan Ahn**

**20090044 	Eun-Young Ko (audit)**




## 1. POV
A buskee who incidentally became a fan of a busker by watching the busker’s busking by chance. The buskee wishes the information on busker and its songs easily accessbile at anytime. Though the buskee has enjoyed the busking fully, it was difficult to remember the information about buskers and the songs and only the impression was lasting.
## 2. Tasks
* T1: Choose a specific date or location to search for overall busking schedule and related information.
* T2: Follow the favorite buskers and view the recent posts written by them to get information about their recent status.
* T3: Search for favorite buskers with various tags to view their detailed information like their busking schedules or past videos.
## 3. Prototype 
### 1) Prototyping tool
Our group used “marvel” for lo-fi prototyping. It was first time for all group members to use a prototyping tool. Thus, we first tried out all three recommended tools. Among three, we found marvel most convenient for collaboration. Marvel offers a collaboration project space where each group members can work on their individual page. However, there was a clear shortcoming, compared to proto.io, that “marvel” does not offer enough built-in manipulations such as producing a table. Whenever we were to add a content to a page we had to make the content as a image from powerpoint. We tried to overcome the limitation by using an app called “sketch” which is compatible with “marvel.”

### 2) Design choices
We avoided to implement following features in Lo-fi prototype. 
1. Selecting all possible options such as dates in calendar, radio inputs in each row because different options would not lead to a different page, it will just lead to different contents.
1. Selecting all possible options such as dates in calendar, radio inputs in each row because different options would not lead to a different page, it will just lead to different contents. 
2. Scrolling movement. In the Hi-Fi prototype, it is very likely to be implemented, however, in Lo-Fi, it was not our key feature to demonstrate a large data for buskees. Moreover, we tried to make the interface externally consistent with popular SNS. Hopefully, we thought this would allow buskees to assume that there will be more data about schedule, feed, etc. in the actual service.
3. Recommended contents. In Lo-Fi prototype, we did not try to implement ‘recommendation’ algorithms. The efficiency or relevancy of recommendation are not what we tested in this level of prototype.  
4. Log-in and relevant individual setting pages are not implemented because those pages are not much related to the main tasks. To focus more on main tasks, we omitted those pages and assumed that a user is logged-in with appropriate settings.

### 3) Representative screenshots
We are planning to implement key tasks in three tabs: 1) Schedule 2) Feed 3) Search
#### Schedule
1_1_Schedule

This is the main page of BukeeBusker. It offers various schedules of buskers searchable by date and location. 
1_2_Schedule_map

It also offers many informations such as time, weather forecast of the venue at the time and moreover the detailed information on the location.

Clicking on “i” icon provides selected busker’s information, where buskee can obtain information scent. 

#### Feed

As buskees can follow a busker they wish to follow (The follow can be done in the busker information page which is shown in Search tab), the “feed” tab provides collective information of buskers the buskee follow. The information would offer anything buskers post/upload to share with their fans.
Search

This page tries to remove burdens of buskees trying hard to memorize information about buskers they liked. Buskees can search for a busker with various tags: genre, location, gender or even by a bit of the busker’s name as the example shows.

Buskees can learn more about any buskers and can also follow the buskers. It gives information about busker, and upcoming busking schedules and photos of buskers.

Buskees can also access through one-click event to busker’s previous performance. 

### 4) Instructions
You would start on the main page and you can change between three tabs anytime you wish. If you wish, you can refresh the current tab’s page by clicking the tab again.
Prototype link: https://marvelapp.com/87c89be
#### Schedule tab (main page)
First select a date and a location to search (* Only March 25th and Daejeon is the option)
Press on map icon, where available, to see more about locational information
Pressing the “i” icon next to busker’s name provides detailed information about buskers.
If you press “see more”, you will be redirected to busker’s page
#### Feed tab
Not much features are available yet, as more buskers post, the more posts you will see in this tab
Transition between “recommended” and “hot now” is possible
You can follow your favorite busker - it is fixed to Aancod in the prototype - and be redirected to the busker’s page as you click on their thumbnail image or the name.
#### Search tab - Searching
You will be able to choose one radio input for each row
You can type-in whatever tags, keyword you can remember about the busker you saw
As you click search completing the above, even without full detailed information about busker, it will show you the result of the search query. 
#### Search tab - Busker’s page
This page belongs to “Search” tab because it is the final result of searching no matter how it is accessed
You can click search tab again to go back to searching for other buskers
You can follow busker by clicking heart (* only available in the very first page of Aancod’s page)
You can see the busker’s thumbnail (* only first two images are available)
You can watch busker’s video by clicking the video preview on the bottom (* only the first one works)

## 4. Observations
We observed user testing process from three different users and derived usability issues from them. There were total 11 usability issues in the process and we analyzed them by giving critically of High, Medium and Low. We used three standard criteria, which are written below, to determine criticality.
* Criticality criteria
 *How many participants mentioned a function? 
 *How much do other functions affected by a mentioned function?
 *How can issues in POV be better tackled by a mentioned function?
### 1) Usability Problems
*P# means #th participant introduced above.
* Task 1
 1. High: It seems that the website has too much information in the main page which is schedule page. (P1, P2, P3)
 2. Medium: The logo on the top-left is not clickable. It should link to the main page of the website. (P1)
 3. Low: There is no button for getting default “recommended/hot now tab” to get back. (P2)
 4. Low: Only hot now tab can be selected now. Recommended tab is not working. (P2)
* Task 2
 5. High: It’s hard to know about how to find buskers’ page and follow them to subscribe to their posts. (P2, P3)
 6. Low: It is not possible to unfollow the busker. (P1)
 7. Low: It might be better if I can write comments to the busker’s post.(P3)
* Task 3
 8. High: Radio buttons make it hard to find target entry of the category. Also it might be too verbose if there are much entries for each of the categories. (P1, P2, P3)
 9. Medium: There should be more specific selections for place category. (P1, P3)
 10. Medium: Some buskers might not have recorded videos, so it might be useless for them. (P3)
 11. Low: It’s hard to notice about the contents of the videos. Titles or descriptions about them are needed. (P3)

### 2) Plan to improve
For each tasks, we defined criticality for each usability issues with the level High, Medium and Low. As higher level of criticality means higher importance to our system, we are going to solve higher level criticality issues first. The specific plans for each usability issues are written below. More general improvement plan is discussed on Studio Reflection section. 
* Task 1 
 1. Make main page that has only introductory information of the website.
 2. If a user clicks the logo on the top-left, the website should move to the main page.
 3. Add close button to overlapped information like map or busker preview. If a user clicks it, then the default tab will occur.
 4. Enable recommend tab to work properly.
* Task 2
 5. Add tutorial or another indicator to help learning the process of following buskers.
 6. Add unfollow button to the busker page.
 7. Add commenting functions to the busker’s post.
* Task 3
 8. Change radio buttons to drop-down list. It will help a user to view entries at a glance.
 9. Add more locations to the category and add it all to the drop-down list.
 10. Some might not have videos, but we think that the video is the best medium to show the impression of the buskers. So, for the buskers who does not have any video contents, we will replace the video tab of them with other contents
 11. Add title text boxes to videos.
## 5. Paper vs Digital
### 1) Types of identified usability issues
* In paper prototype
 * Learnability issues are discovered a lot
  * Participants consider mainly about what are these information because this is handwriting object, not a computer.
  * Participants are not concentrated on results and overlook results because a human plays a role as a computer, so they are not concentrated on format of input and output.
  * Participants tends to try many functions because they feel a ‘context’ of prototype.
* In digital prototype
 * Efficiency and Safety issues are discovered a lot
  * Participants subject to specific procedures because state transition can be made only in specific sections and it managed by computer.
 * Affordance
 * Internal consistency 
  * Participants care more about internal consistency in digital prototype than in paper prototype
 * Internal connections
  * Participants were more curious on internal connections between pages and windows and found out more internal connection problems in our prototype. 
### 2) Participants’ reaction and expectation to prototypes
Participants’ reactions and expectations are as follow.
* In paper prototype, participants were focused on
	* What is the contents
  * What are these information?
  * Why are these functions?
  * Is this needed information or extra information?
 * What is the end-to-end usage scenario
  * What is the goal of this service/page?
  * Is there affordance in the scenario?
  * How about the coverage of functions?
 * How about the overall harmony of UI?
  * Is there a redundant information?
  *Is the information in a page consistent?
* In digital prototype, participants were focused on
 * How to deliver contents
  * Where is that information?
  * When is the information shown?
  * Is the amount of information appropriate?
 * What is the execution sequence
  * What is the path to reach that information?
  * Is the path to information optimal?
 * How about the placement ratio of UI components
  *Is there an internal/external consistency?

### 3) Changes in digital prototype based on the feedback of paper prototype
* From T1 in paper prototype
 * Make a base homepage (high)
 * Show busking information as a table (medium.1)
 * Make a search function and Distinguish busking with location (medium.2)
 * To solve the low priority feedback, we will be implemented by using a jquery date selector
* From T2 in paper prototype
 * Mark starting time and ending time and Show unfinished buskings until selected time (high)
 * Show busking continuously through days (low.2)
 * To solve the low.1 priority feedback, we will be implemented by showing only busking-activated time
* From T3 in paper prototype
 * Add real time ranking in right side (medium.1)
 * Add ‘Feed’ function for busker can write (low.2)
 * To solve the medium.2 priority feedback, we will be implemented by providing sort options by time or views

## 6. Studio Reflections 

### 1) “Likes” Feedback
1. Well focused on busker’s schedule, that user can easilty find busker information based on his/her information. 
2. Design of the website, especially the aesthetics

### 2) “Wishes” Feedback
1.  Succinctness of schedule page: There were 3 comments about our schedule page. While this schedule page served as our main page in our Lo-fi prototype, users felt it contains too much information. Some of them suggested to add more pictures or images to help users to grasp busking information in easier way. 
2.  Question on necessity of ‘Feed’ feature: One students questioned the necessity of ‘feed’ feature of our prototype. Our current feed deals only informations about busking performance. However, he/she said that he/she hope to get all information/news/post from busker and if our system collect all of these information and feed buskee, then there will not be a difference between our system and existing SNS. 
3.  New needs: In our currrent prototype, user can see busker’s detailed information only when he/she reached to a busker in ‘search’, ‘schedule’, or ‘feed’ features. However, one of the comments said that he/she wants ‘information’ tab that he/she can find the busker information directly. Also, there were two comments on schedule page. One pointed out that our calendar does not distinguish dates with performance and date without any performance. Another one hoped that he/she can choose ‘sort’ criteria (e.g. sort by name). 
4.  Confusing features: Some students pointed out that some of our function/features are confusing. One said that it is not clear how a user can subscribe/unsubscribe a busker. Another one said that it is also unclear that how can a user get news from a busekr at ‘Feed’ page. There was also a  comment saying that heart and play buttons on information page are confusing. 
5.  Technical Issues: Some students found out technical issues as follows. Some of them pointed out that user cannot go back to main page by clicking on the logo on our prototype. Also, one of them pointed out our ‘info’ button in shedule page does not function ‘on’ and ‘off’ status. 
6.  Etc: There were several other comments on ‘typos’, ‘credibilty of informations’ (that we hard coded). 

### 3) Our reflection
1.  Reflection on DP3 feedbacks
We tried to reflect ‘wishes’ feedbacks in DP3 to our Lo-fi prototype.  Firstly, we add ‘location’ filter on our schedule search page to help buskee to find a busker and remember them based on location. Also, we added a UI that enables ‘quick’ move to scheduled on day before/after the selected day. However, we decided to not implement ‘week before’ or ‘month before’ function in schedule table. Instead, we will try to make it easier for user to select the date week before or month before on calendar. In addition to that, we implemented ‘info’ window on the right-side of schedule so that user can see information about busker quickly while browsing a schedule. Lastly, by supporting ‘Feed’ function, we made buskee can manage his/her favorite buskers of their own. 

2. Reflection on DP4 feedbacks 
Among 6 groups of ‘wishes’ feedbacks we got from studio, we think the first four groups of concerns need active reflection while the last two groups of comments can be resolved easily.  First of all, regarding the succinctness of schedule page, we will try to make it more readable, by adding more images and redesigning the table. However, as all of the information shown in the table is necessary for buskees, our reflection will not reduce the amount of information but will redesign where and when to show the information.  Second, regarding the necessity of feature page, our team need more discussion and external interview on that. We have not decided to or not to maintain the ‘feed’ feature but will try hard to get the better answer. Third, regarding the new needs, we are happy to get such comments and willing to introduce such function in our system. However, the ‘information’ page need another design/testing iteration we need more time to explicitly implement it. Lastly, regarding the confusing features, we decided to ‘add’ or ‘redesign’ the buttons so that user can easily catch functionality of each button.  
