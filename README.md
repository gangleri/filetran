# filetran

This is a *very simple* program to transfer a single file from one machine to another. I've used this while playing with [docker](http://docker.io) containers and transfering some config files to my nexus 7 running Arch. This was a quick and easy way to use node to solve a problem I had ;)

## Install

```sh
npm install filetran -g
```

## Usage

Run the program in one of two modes:

| Mode   | Description |
|--------|-------------|
| Server | Setup to send or receive a file. |
| Client | Connect to a server to send/recieve a file |

### `filetran <cmd> [opts] <file>`

#### cmd

- `send`: send a file to another filetran process.
- `receive`: receive a file from another filetran process.

#### opts
- port, `-p`, `--port`: The port to connect to or to listen on.
- host, `-h`, `--host`: The host to connect to.
	- The host option can be used on either send or receive. (But not both at once.)
	- If the host is not specified, it acts as a server. (Run this first).
	- If a host is specified, it acts as a client. (Run this second).

#### file

- The filename to read from or write to. (The filenames do not need to match.)

## Example

You should start the server first, the client needs to connect to this. To start a server, just don't specify the host.

##### Send:
```sh
filetran receive -p 8790 test-file
```

The server is now listening on port 8790, and will write what it receives to a file called *test-file*.

##### Receive:
```sh
filetran send --host new-host --port 8790 test-file
```

The client is now connecting to port 8790, and will send the contents of  *test-file* to the server.

## License

[MIT](http://opensource.org/licenses/MIT)
