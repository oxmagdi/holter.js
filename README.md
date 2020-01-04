
# Install
### You must have [npm](https://www.npmjs.com/) installed on your computer. From the root project directory run these commands from the command line:

``` $ npm install ```

OR

``` $ npm i ```

# Running

## make sure you installed [Redis](https://redis.io/) and Redis server is working 

```
$ redis-cli
127.0.0.1:6379> ping
PONG
127.0.0.1:6379> 
```

## Environment Variables:

```
export PORT=4600
export NODES_CONF_DIRENAME=/home/holterconfs/
export REDIS_HOST=127.0.0.1
export REDIS_PORT=6379
export REDIS_PREFIX=holter1
```

## Development mode

``` $ npm run dev ```

## Production mode

``` $ npm run server ```

# Add New Node Object
### just make a new <FILE_NAME>.json file on configs files directory (the path You define it in Environment Variables as NODES_CONF_DIRENAME)

```
{
    "cluster": "",
    "node": "",
    "host": "",
    "port": "",
    "path": "",
    "interval": "",
    "onfailer": {}
}
```

## onfailer type could be script or endpoint

```
"onfailer": {
    "type": "script",
    "path": ""
}
```

OR

``` 
"onfailer": {
    "type": "endpoint",
    "url": "",
    "method": "",
    "headers":{},
    "body": {},
}