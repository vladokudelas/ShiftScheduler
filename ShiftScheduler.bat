REM Start server
start "Server" node server.js

REM Start app
start ng serve --target=production

start %CHROME% "http://localhost:4200"