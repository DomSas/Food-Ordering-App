# Food Ordering App

Food ordering application using Monaca, React and Framework 7, as well as the Firebase database.

The customer can select meals and beverages and choose delivery or dine-in option. If delivery is chosen, the user fills name and email, and geolocation is acquired. In case of dine-in, user chooses date and table. Next is payment (cash or card), where payment by card is done through Stripe.  

https://user-images.githubusercontent.com/62658199/171423946-6aea1784-c827-4264-9c27-24d91f8f4eff.mp4

This app is based on a template found here:
[framework7-react-single-view](https://github.com/monaca-templates/framework7-react-single-view).  
Backend repository can be found [here](https://github.com/DomSas/Food-Ordering-App-Backend).

### Tutorial

There is a tutorial available in Medium, divided into two parts:

Part 1: [Create a food ordering application with Monaca, React, Framework 7 and Firebase database](https://medium.com/p/ed675ee74c0a/)

Part 2: [Online Payments with Monaca, React and Framework7 with Express backend](https://medium.com/p/2e0801f55053)

### How to use

1. Fork or download the repository.
2. Insert Firebase configuration obtained from your Firebase project on the db.js file, from line 14: 
https://github.com/DomSas/Food-Ordering-App/blob/b794dbcccc382893daefc5e1d7da79d0964250c5/src/js/db.js#L14-L21
3. Install dependencies with `npm install`.
4. Start the server locally with `npm run start`, or using Monaca.
