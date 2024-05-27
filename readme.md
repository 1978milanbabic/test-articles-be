# Real-Time Article and Comment App

This project is a full-stack application that allows users to register, log in, and comment on articles in real-time using Socket.IO. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React and Tailwind CSS.

## Node Version

| Node Version |
| ------------ |
| 18.18.2      |

# Weak Points

- Server variables should not be exposed!
- There is practically no antispam system
- You can create multiple users with the same names and passwords: there is no check for duplicates (although it's not blocking)
