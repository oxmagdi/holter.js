
# Install
### You must have [npm](https://www.npmjs.com/) installed on your computer. From the root project directory run these commands from the command line:

``` $ npm install ```


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
echo 'PORT=4600' >> .env
echo 'NODES_CONF_DIRENAME=/home/holterconfs/' >> .env
echo 'REDIS_HOST=127.0.0.1' >> .env
echo 'REDIS_PORT=6379' >> .env
echo 'REDIS_PREFIX=h' >> .env
```
## Unit Testing

``` $ npm test ```

## Development mode

``` $ npm run dev ```

## Production mode

``` $ npm run server ```

# Add New Node Object

## There are two ways to add new node 

### 1- Via UI

![UI](/src/web/ui/assets/imgs/addNNodeDash.png)




### 2- Manually

#### Just make a new <FILE_NAME>.json on Configs Files Directory (the path You define it in Environment Variables as NODES_CONF_DIRENAME)

```
{
    "cluster": "",
    "node": "",
    "host": "",
    "port": "",
    "path": "",
    "onfailure": {}
}
```

### onfailer.type could be Script 

```
"onfailure": {
    "type": "script",
    "command": ""
}
```

### OR Endpoint

``` 
"onfailure": {
    "type": "endpoint",
    "url": "",
    "method": "",
    "headers":{},
    "body": {},
}

```

