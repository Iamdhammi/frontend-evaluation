Frontend Evalution

## The primary languages used for the development of this project will include:

1. React

### Assumptions made

1. From the documentation, it was assumed that users can't register but only login
2. Any email address and password provided on the login form is accepted for a user, so far the admin login isn't checked
3. On login, responses from the endpoint doesn't include a token. So it was assumed that there are no protected routes, but routes are protected by checking the responses saved to the localstorage on login
4. The admin can edit each user story by clicking on the edit button. But since there was no endpoint to view single story, the index of each story was assigned as a unique id to each making it possible to view a single story
5. When reviewing a story and the approve or reject button is clicked, it redirects the admin to the all stories list make the assumption that it was successfully update since no endpoint was provide for that



### Challenges faced
1. The base url 'https://test-archimides.free.beeceptor.com/' can only accept 50 requests per day. So most times i get "429 error - Too many Requests", which means i've to wait till the next day to continue
2. The endpoints was down for a while with error status 597 - "Cannot read property collection of undefinded"