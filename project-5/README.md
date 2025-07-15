# Web Development Project 5 - **Brewery Explorer**

Submitted by: **Max Lasitsa**

This web app: **lets users browse breweries across the U.S., search by name, filter by brewery type, and save favorites to a personalized list.**

Time spent: **6–8 hours in total**

---

## Required Features

The following **required** functionality is completed:

- [X]**The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays at least 10 unique breweries, each with a name and type
  - Each row includes a favorite toggle and brewery location info

- [X] **`useEffect` React hook and `async`/`await` are used**

- [X] **The app dashboard includes at least three summary statistics about the data**
  - Total number of filtered breweries
  - Average name length of visible breweries
  - Number of unique U.S. states represented in the list

- [X] **A search bar allows the user to search for an item in the fetched data**
  - The search bar filters breweries by name (case-insensitive)
  - Results dynamically update while the user types

- [X] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter dropdown filters breweries by their `brewery_type`
  - Filter and search work in combination and dynamically update the display

---

## Optional Features

The following **optional** features are implemented:

- [X] Multiple filters (search + type) can be applied simultaneously
- [X] The filter uses a **dropdown**, and the search uses a **text input**

---

## Additional Features

- [X] Favorites list with toggle support (stored in app state)
- [X] Sidebar dashboard layout with two toggleable views (Browse All vs My List)
- [X] Inline styles with responsive layout and polished UI using Geist UI components
- [X] Used Zustand
- [X] Used React TanStack Query
- [X] Used Zod
- [X] Used TS

---

## Notes

Some challenges included:
- Understanding the brewery API structure and ensuring unique breweries are shown
- Filtering data in real-time while maintaining consistent UI/UX
- Managing shared state across favorites and search/filter
- Had to turn off run time validation on Zod since it was causing some error

---

## License

```text
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
