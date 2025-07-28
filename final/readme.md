# Web Development Project 7 - Post Manager App

Submitted by: **Max Lasitsa**

This web app: **Allows users to create, view, edit, and delete personalized "posts" that store information like the creator's name, username, and a selected attribute. It provides a sidebar for easy navigation, a form to add new posts, and dedicated pages for post details and editing.**

Time spent: **7 hours spent in total**

## Required Features

The following **required** functionality is completed:

- [x] **The web app contains a page that features a create form to add a new crewmate**
  - Users can name the crewmate
  - Users can set the crewmate’s attributes by clicking on one of several values
- [x] **The web app includes a summary page of all the user’s added crewmates**
  - The web app contains a summary page dedicated to displaying all the crewmates the user has made so far
  - The summary page is sorted by creation date such that the most recently created crewmates appear at the top
- [x] **A previously created crewmate can be updated from the list of crewmates in the summary page**
  - Each crewmate has an edit button that will take users to an update form for the relevant crewmate
  - Users can see the current attributes of their crewmate on the update form
  - After editing the crewmate's attribute values using the form, the user can immediately see those changes reflected in the update form and on the summary page 
- [x] **A previously created crewmate can be deleted from the crewmate list**
  - Using the edit form detailed in the previous _crewmates can be updated_ feature, there is a button that allows users to delete that crewmate
  - After deleting a crewmate, the crewmate should no longer be visible in the summary page
- [x] **Each crewmate has a direct, unique URL link to an info page about them**
  - Clicking on a crewmate in the summary page navigates to a detail page for that crewmate
  - The detail page contains extra information about the crewmate not included in the summary page
  - Users can navigate to to the edit form from the detail page

The following **optional** features are implemented:

- [ ] A crewmate can be given a category upon creation which restricts their attribute value options
- [ ] A section of the summary page displays summary statistics about a user’s crew
- [ ] The summary page displays a custom “success” metric about a user’s crew

The following **additional** features are implemented:

* [x] Full backend using Express + Supabase integration (CRUD)
* [x] Class-based Supabase service for scalable API interactions
* [x] Inline styling applied for every page (clean, readable layout)
* [x] Dedicated pages for create, edit, view, and list
* [x] Error handling with proper `try-catch` in backend controllers
* [x] Full monorepo setup with separated `frontend` and `backend` folders

## Notes

* Supabase had a single table (`posts`) that stored all required user and content data.
* Initial errors stemmed from incorrect table references (`routes` instead of `posts`), fixed after clarifying schema.
* Encountered CORS and 500 errors due to mismatched API route logic and Supabase table structure.
* Styling was carefully crafted inline across all pages for clarity and responsiveness.
* Learned best practices around structuring a full-stack monorepo, service abstraction, and Supabase usage.

## License

    Copyright 2025 Max Lasitsa

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
