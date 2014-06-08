#filetran

This is a *very simple* program to transfer a single file from one machine to another. I've used this while playing with [docker](http://docker.io) containers and transfering some config files to my nexus 7 running Arch. This was a quick and easy way to use node to solve a problem I had ;) 

##Install
```sh
npm install filetran -g
```

##Usage
Run the program in one of two modes:

Mode| Description|Arguments
----|------------|---------
receive|Setup to recieve a file.|--port the port to listen on, file-name
send|Send a file to another host|--host --port destination host and port, the file-name to send.

###Example Receive
You should start the receiver first, the sender needs to connect to this. 

```sh
filetran receive -p 8790 test-file
```

The receiver is now listening on port 8790 and will write what it receives to a file called *test-file*

###Example Send
```sh
filetran send --host new-host --port 8790 test-file
```

*note: the files names do not need to match on sender and receiver.*

