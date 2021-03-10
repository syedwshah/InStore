# InStore

## User Stories

The following functionality is completed and depicted in the Walkthrough:

- [x] User can **Log in using oAuth**
- [x] Create a JWT (JSON Web Token) to create an encryption signature to store private data
- [x] AsyncStorage is used to store the JWT into the user device's cache to skip sign-in process for returning users
- [x] Google Autocomplete functionality using Places API to input user provided address data.
- [x] Use of MobX to manage the state of the application on global and local levels
- [x] Use MobX-State-Tree to manage the state of the application as middleware
- [ ] ...incoming

The following features are left to be resolved:

- [ ] Logging out of the app should 'reset' the stores, possible using MobX-State-Tree snapshots
- [ ] App state should be managed consistently. Current app has local state managed by React state management techniques as well as MobX decorators
- [ ] Testing can be implemented to make debugging easier
- [ ] EditAddressScreen does not edit delivery options or apt on the front end, may possible update aforementioned data on the back end
- [ ] The JWT never goes out of scope, except on log out, it should expire after an elapsed timeframe

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='misc/walkthrough.gif' title='Main Walkthrough' alt='Core Walkthrough' />

Here's a walkthrough of slightly less interesting functionality:

<img src='./misc/less_interesting.gif' title='Sub Walkthrough' alt='Outer Walkthrough' />
