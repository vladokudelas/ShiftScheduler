REM Start server
start "Server" node server.js

REM Start app
REM start ng serve --target=production

start %CHROME% "http://localhost:3000"