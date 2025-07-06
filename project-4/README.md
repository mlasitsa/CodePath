# Web Development Project 4 - *StumbleCat*

Submitted by: **Max Lasitsa**

This web app: **lets users discover random cats from The Cat API, view their breed and origin, and ban specific breeds or origins from future results. The layout includes a side-by-side view with the current cat and a scrollable history of all previously seen cats.**

Time spent: **3 hours spent in total**

## Required Features

The following **required** functionality is completed: 

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The app consistently displays the cat’s breed, origin, and image across all results.
- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - Only one random cat is shown at a time
  - Attributes shown match the image (e.g. breed shown matches breed of image)
  - Each API result includes an image
- [x] **API call response results should appear random to the user**
  - The “Discover” button triggers a new API call and shows a new cat (filtered by ban list)
  - The Cat API includes a wide variety of images, minimizing repetition
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - Users can click on either the breed or origin to add to the ban list
  - Clicking an already-banned item removes it immediately
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Ban list is enforced during fetching: matching breeds or origins are skipped
  - Clicking on the banned item removes it instantly

## Optional Features

The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list (both `breed` and `origin`)
- [x] Users can see a stored history of their previously displayed results from this session
  - A scrollable vertical section on the right shows all previously seen cats
  - Each time the “Discover” button is clicked, the history updates with the new result

## Additional Features

The following **additional** features are implemented:

- **Zod**: Used to validate The Cat API’s response structure at runtime
- **Zustand**: Used for global state management (ban list + session history)
- **React Query (TanStack)**: Manages API calls, caching, loading, and error state
- **Geist UI**: Provides accessible and modern components for layout and design

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with **ScreenToGif**  
<!-- Replace with actual GIF or Loom link -->

## Notes

- Learning to filter random API data based on a dynamic ban list was the most interesting challenge
- Mapping banned attributes while avoiding excessive re-fetching required a retry system
- Styling with Geist was smooth, but handling strict TypeScript props required workarounds
- Filtering while maintaining Zod validation helped ensure API reliability and robustness

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
