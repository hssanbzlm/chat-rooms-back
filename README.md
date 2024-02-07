# *Chat-rooms project (backend)*
This is the backend part of chat-rooms web application

## *Project structure*
How the projects is structured?

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
- chat-rooms router:
	- /api/chat-room/create *(post)*
	- /api/chat-room/destroy *(delete)*
- messages router
	- /api/messages/get-messages/:list *(get)*
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
- user controller
	- addUser


### middlewares

- error
	- errorHandler
	- asyncErrorHandler
- protect
	- protect
- user 
	- checkUserExist
### utils
- token
	- signToken
	- verifyToken
### listeners (socket)
- index
- middleware
- socket.room-handler
- socket.room-utils

### database
- mongo.database 

### models
- chat-room
- message
- user



