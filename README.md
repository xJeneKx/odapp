# ODapp - hub for dapps on Obyte


## Install

Install node.js, clone the repository, then

### 1 step
If you want to use the database of another full node running on the same host (instead of syncing our own), open package.json file and change the package name to the name of that node (e.g. "obyte-hub", "obyte-relay", etc).

### 2 step
```sh
npm install
cp .env.mainnet .env
```
<br>

> [!IMPORTANT]
> Before running, read the text below

## If you don't have an Obyte node on the same host
Open .env file and change `EXTERNAL_FULL_NODE` to 0. Then, we'll sync our own full node.

## If you are using an [obyte-hub](https://github.com/byteball/obyte-hub) running on the same host
Open .env file and change `USE_SQLITE_FOR_ASSET_METADATA` to 1.

## Run
```sh
node main.js
```
