# BunDrop

Welcome to BunDrop, an application for ordering burger meals delivered by drones. The overall design is thought to be simple yet playful.
Mainly, the idea was that this UI should be a good match to your every day ordering terminal like the ones found in many 
fast food restaurants these days. Given that this is a "delivery to door"-service, a terminal for ordering could be placed at a BunDrop local or perhaps a bus station or equivalent so the customer could place an order on the way home from work. Likewise the application is fitted for use on a smartphone for ordering from anywhere, anytime. 

## Package setup:
```sh
1. npm install

This application also uses FontAwesome for some icons. If the icons do not show up in the UI upon running it the first time,
make sure that FontAwesome is properly installed with the following steps:

1. npm i --save @fortawesome/fontawesome-svg-core
2.1 npm i --save @fortawesome/free-solid-svg-icons
2.2 npm i --save @fortawesome/free-regular-svg-icons
3. npm i --save @fortawesome/vue-fontawesome@latest-3
```

## JSON server setup:

```sh
This application runs two servers when used. One to hold products and orders, and one to keep track of the registered users. In order 
to run 

1. npm run json-application-server
2. npm run json-user-server
```

### Compile and Hot-Reload for Development

```sh
1. npm run dev
2. 'ctrl' + click on 'http://127.0.0.1:5173/' to start the application.
```

### Some important technologies used:

1. Vue Router:
  The Vue Router is used to navigate and render the appropriate, desired HTML at a given moment in this single page application (SPA). A SPA doesn't need to load an entirely new page upon a request - Instead it instantaneously rewrites the content to the data stored on the requested address, making the rendering lightning fast.

  In the case of the Vue Router. The different routes with partering 'path', 'name' and last but not least 'component' are defined in the 'index.js' file in the 'router' folder. The path specifies the URL, the name can be used direct to the page using the '<router-link>'-tag in the HTML and the component defines what component to render. So an example from this application would be the path: '/checkout', which has the exoteric name: 'Checkout' and render the logical component 'CheckoutView' upon calling the path. All the routes are then stored in the 'router' const that is then exported and used by the app const from the 'main.js' file which make the router available to the rest of the application. The actual tag that then represents all the alter egos of varying content is the '<router-view>' tag in the 'App.vue' file. So when rendering the checkout, the content of the CheckoutView is pasted upon the same seat as the router-view holds.

2. Composition API:
  The Composition API is as it sounds - It's a composition of different APIs giving the application a multitude of built-in
  functions to utilize to dig into state handling and life cycles among other things. It can be interpreted as a sort of gateway into 
  a given page that set the rules and the stage of what is about to happen. I first started of by using the options API as it was the
  technology I was used to on beforehand, but quickly realized that the Composition API provided a much cleaner look. Even though I can
  appreciate the square and orderly look to the Options API. I choose not to use the '<script setup>' tag, because in my case the code
  became more of a mess when everything just read from top to bottom. I liked the way to set up 'props', 'components' and 'setup' to divide
  the logic into different pieces.

  One frequently used part of the API was the recurring ref constants. This opened the domain to dynamic rendering of different variables permitting both reading and writing to the refs '.value'. This proved much useful when rendering and updating dynamic data on the fly.


3. Event handlers:
  Another frequantly used technology was the use of event handlers. The one I used most was the '@click' handler which basically tells the
  application to listen for any click-events in the DOM on the given element that it is connected to. In my case I only used this on <button> elements but can technically be applied to any desired element tag. For most scenarios I used the as method handlers, meaning
  that on a click event that event would trigger a defined method in the 'setup()' part of the Composition API. Sometimes performing local
  tasks in the file itself, but often also emitting something to the parent element or calling a method from either one of the services files.

### Design choices:

1. Nav bar:
  I choose to have a sticky '<Navbar>' component at the top to make the navigation easy to do wherever you might be in the application. At first, I wanted the different menu choises to stick up from the nav bar itself giving it a kind of "file cabinet" look. But that took
  some hastle when trying to reach reactivity, so I chose instead to put these menu choices locked to the top of the nav bar instead. 
  Which with the active link being kind of post-it yellow, is meant to immitate that of a restaurant order note you would find in the
  kitchen.

2. SessionStorage for orders and signed in user:
  At first I used localStorage for orders and sessionStorage for maintaining track of the signed in user. But given then that I first and foremost thought this as an ordering terminal as described in the beginning of this document - I thought that it would make more sense
  to give room for a new order and user at each resetting of the application. Instead of maintaining the storage across sessions. The later would be of better use in the phone or desktop version, if the user kind of aborts ordering for some time, the order would still maintiain itself in the local storage.

3. order- and userService:
  I constructed and utilized two different service classes in this application. The goal of this was to separate some of the logic from the single-file components (SFC). The later is a term describing a component containing logic (often JavaScript or TypeScript), content (HTML), and styling (CSS). The services where as mentioned used in order to make the components a little more light weigth. In retrospect I would have separated even more logic in order to clean up the code. Especially the CheckOutView is one of the views that ladens me with a feeling of technical debt. 
