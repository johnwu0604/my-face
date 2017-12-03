## Personal Website Generator (YME) ##
Now this is a story all about how My life got flipped turned upside down And I'd like to take a minute,
just sit right there I'll tell you how YME helped you at the tech-fair

In the middle of YHacks, born and raised On the playground is where I spent less than 2 days Chillin' out,
maxin', no sleep at all, cool shootin' Angular injections outside of school**

## Inspiration ##
In a world where personal branding can't be fully developed without an online platform, we have decided to
take the pain out of building your own website in just a few clicks! Simply login with your Facebook account,
and get ready to live your highlights using our clean and clear user interface. However, YME isn't limited to
beginners! The application offers the option of exporting the HTML code generated from each unique website.
This way, users can focus more on brand creation rather than coding syntax.

## What it does ##
YME takes relevant data on your Facebook account, including profile/cover pictures, education, work and
recently attended social events in order to construct a clean, complete yet simple way to market oneself.
And all this with one Facebook login. Offered is a beautiful front-end, gallery of most "liked" photos from
the past year on Facebook, a short biography on hometowns, education, a map of recently attended social events,
and finally, a contact form to directly email the user in question. And did we mention the option to export
all the code in HTML for better customization?

## How we built it ##
We built the application by using data retrieved through the Facebook API. The front-end was built in Angular
and the back-end server was built in Node. The application also utilizes AWS Elastic Beanstalk for hosting the
server and AWS S3 for serving the static pages of each users generated website.

## Challenges we ran into ##
Using the Facebook Login API for authentication was very involved, as many callback functions (node framework) in
dependent .js and .html files were required to generate an authentication token, and the amount of information
retrievable using the Graph API sometimes limited our use cases, due to lack of permissions. In addition, we used
the AngularJS framework, while the Google maps SDK documentation was written for JavaScript. Hence, binding AngularJS
data to Javascript functions proved challenging. However, the decision to stick to AngularJS is justified by the use of
Javascript only (no Typescript as in Angular2), and the fast development rate (for less than 2 days) of a single page
dynamic WebApp that would take a lot longer due to component-based Angular2.

## What's next for YME ##
More clean, beautiful frontend options available for the user. More functions to be implemented in the Google Maps
component displaying "My Recent Places". If YME became a more work-networking oriented platform, we would create a
visual component displaying one's closest network connections.

## Where can you find this? ##
You can try out the final application here: http://my-face-dev.us-east-1.elasticbeanstalk.com/

