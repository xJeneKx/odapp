# ODapp - hub for dapps on Obyte


## Install

Install node.js, clone the repository, then

### 1 step
open package.json file and change name to name of the hub node

### 2 step
```sh
npm install
cp .env.mainnet .env
```
<br>

> [!IMPORTANT]
> Before run, read the text below

## If you don't have a Obyte node
open .env file and change the line to "ONLY_API=0"

## If you are using a [obyte-hub](https://github.com/byteball/obyte-hub)
open .env file and change the line to "USE_SQLITE_FOR_ASSETS=1"

## Run
```sh
node main.js
```
