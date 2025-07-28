# Web Development Final Project - Postify

Submitted by: **Max Lasitsa**

This web app: **Postify is a full-stack social posting platform where users can create, edit, delete, comment on, and upvote posts. It includes search, sort, and detailed post views — all managed through a clean, responsive UI and a single Supabase-backed `posts` table.**

Time spent: **10 hours spent in total**

## Required Features

The following **required** functionality is completed:

- [x] **Web app includes a create form that allows the user to create posts**
  - Form requires users to add a post title
  - Forms have the *option* for users to add: 
    - additional textual content
    - an image added as an external image URL
- [x] **Web app includes a home feed displaying previously created posts**
  - Web app includes home feed displaying previously created posts
  - Each post on the posts feed shows:
    - creation time
    - title 
    - upvotes count
  - Clicking on a post directs the user to a new page for the selected post
- [x] **Users can view posts in different ways**
  - Users can sort posts by either:
    - creation time
    - upvotes count
  - Users can search for posts by title
- [x] **Users can interact with each post in different ways**
  - Each post has its own detail page showing:
    - content
    - image
    - comments
  - Users can leave comments on a post
  - Each post includes an upvote button:
    - Each click increases the post's upvotes count by one
    - Users can upvote any post any number of times
- [x] **A post that a user previously created can be edited or deleted from its post page**
  - After a user creates a new post, they can edit it
  - A post can be deleted from its post page

## Optional Features

The following **optional** features are implemented:

- [x] Web app implements pseudo-authentication
  - Upon launching the app, the user must enter a username which is saved in `localStorage`
  - Only the original post creator (by username match) can edit or delete a post

## Additional Features

- [x] Comments are stored inside the `posts` table directly using a JSON array
- [x] Minimal, clean inline styling for an accessible and elegant layout
- [x] Fully RESTful API built with Express.js and Supabase
- [x] Post upvotes and comment submissions update live without reloading
- [x] Upvote count displayed on both list and detail pages
- [x] Reusable frontend components for layout and forms


## Notes

Some challenges encountered:
- Implementing comment storage directly within the `posts` table while keeping frontend logic clean
- Ensuring post editing and deletion was secure and tied to the correct pseudo-authenticated user
- Avoiding extra complexity like databases for users or separate comment tables while preserving full functionality

## License

    Copyright Max Lasitsa [2025]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
