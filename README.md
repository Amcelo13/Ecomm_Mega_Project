# Getting Started with Create React App

MERN E-Commerce Project

This project is an E-Commerce platform built using the MERN stack (MongoDB, Express.js, React, Node.js). It consists of functionalities for customers, vendors, and administrators.
Customer
Signup

    Users can sign up with email, mobile number & Gmail.
    Proper validation messages are displayed if there are errors during signup.
    Users can choose their role (customer or vendor) during signup.
    Joining date & time are maintained in the database.

Login

    Users can login with credentials or Gmail.
    Proper validation messages are displayed if the login information is incorrect.
    After successful login, users cannot access the signup and login routes.
    Role selection during login is based on database records.

Home Page

    Users can view best selling products.
    The navbar includes categories for each product.
    Users can view the cart page.
    Users cannot click on the buy button until they add an address to their profile.
    Clicking on buy navigates the user to the address page with a proper message.

Product Detail Page

    Users can click on a product item to view details.
    Product details, including four images, are displayed.
    Users can specify the quantity for orders.
    Users can add products to the cart.
    Users can place orders.

Order Page

    Users can view their orders.
    Orders are tracked and can be cancelled.
    Users can cancel orders within 24 hours.

Profile Page

    Users can update their profile picture.
    Users can manage addresses.
    Users can change passwords.
    Users can update personal details.

Shopping Cart and Checkout

    Shopping cart functionality allows users to add and manage selected items.
    Taxes, shipping costs, and discounts or coupons are calculated and applied.

Vendor
Add Product

    Vendors can add products to the platform.
    Products can be edited, deleted, or marked as drafts.

Order

    Vendors can check orders for their own products.
    Vendors can cancel products or mark them as out of stock.

Order History

    Vendors can view their order history.
    Total number of orders and earnings are displayed.

Profile

    Vendors can change their profile picture.
    Vendors can update personal and business details.
    Vendors can change passwords.

Admin
Vendor Management

    Admins can view the list of vendors.
    Admins can disable vendors, preventing them from logging in.

Product Management

    Admins can view all products.
    Admins can view orders for each product.
    Admins can edit or delete products.

Profile

    Admins can change their profile picture.
    Admins can update personal details.
    Admins can change passwords.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
