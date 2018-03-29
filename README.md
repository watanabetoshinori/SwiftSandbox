# Swift Sandbox

Swift Sandbox for online programing contest and training.

<img  src="https://raw.githubusercontent.com/watanabetoshinori/SwiftSandbox/master/Preview/1.png" width="640" height="369">

## Installation

1. Pull the Docker Image From Github

```bash
git clone https://github.com/watanabetoshinori/SwiftSandbox
cd SwiftSandbox
docker build -t swiftsandbox:2.2 .
```

2. Create a Container from the Image

```bash
docker run -p 3000:3000 -p 3001:3001 -d --name swiftsandbox swiftsandbox:2.2
```

## Usage

### Open SwiftSandbox

Open http://localhost:3000 at your browser.


### Start SwiftSandbox:

```bash
docker start swiftsandbox
```

### Stop SwiftSandbox:

```bash
docker stop swiftsandbox
```
