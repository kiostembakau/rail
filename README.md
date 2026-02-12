# Username Server

Simple Node.js + Express server untuk generate username per device.
Siap deploy ke Railway.

## API Endpoint

POST /get-username
- body JSON: { "fingerprint": "device fingerprint string" }
- response JSON: { "username": "generated username" }
