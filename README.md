![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
# *Chat-rooms (backend)*
This is the backend part of chat-rooms web application.

## *Project structure*

### index.js 
- Project entrypoint
### server.js
- Server setup (middlewares,routes,connect to db)

### *config*
- index
- development
- production


### routes
- auth router:
	- /api/auth/is-auth *(get)*
	- /api/auth/join *(post)*
	- /api/auth/leave *(post)*
- user router:
	-	/api/user/add *(post)*
	-   /api/user/update *(put)*
- chat-rooms router:
	- /api/chat-room/create *(post)*
	- /api/chat-room/destroy *(delete)*
- messages router
	- /api/messages/get-messages/:list *(get)*
	- api/messages/get-private-messages/:userId/:list *(get)*
### controllers
- auth controller:
	- getUserInfo 
	- join
	- leave
- chat-room controller
	- createRoom
	- deleteRoom
- messages controller
	- saveMessage
	- getMessages
	- getPrivateMessages
- user controller
	- addUser
	- updateUser


### middlewares

- error
	- errorHandler
	- asyncErrorHandler
- protect
	- protect
- user 
	- checkUserExist
- cloudinary
	- saveAvatar
- multer
### utils
- token
	- signToken
	- verifyToken
- cookie
### listeners (socket)
- index
- socket.middleware
- socket.room-handler
- socket.private-handler
- socket.room-utils
- socket.redis-adapter

### logger 
- logger

### database
- mongo.database 

### models
- chat-room
- message
- user
