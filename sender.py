#!/usr/bin/python
import socket
import time
from socketIO_client import SocketIO

#HOST = 'localhost'               # Symbolic name meaning the local host
#PORT = 8888                      # Arbitrary non-privileged port
t=2
#s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#s.connect((HOST, PORT))
socketIO = SocketIO('localhost', 8000)



while True:
	data='18.529176+73.852764'
    	socketIO.emit('data',data+'\n')
	time.sleep(t)
	
	data='18.528555+73.852270'
	socketIO.emit('data',data+'\n')
	time.sleep(t)

	data='18.527792+73.851680'
	socketIO.emit('data',data+'\n')
	time.sleep(t)

	data='18.527416+73.851358'
	socketIO.emit('data',data+'\n')
	time.sleep(t)

	data='18.527558+73.850768'
	socketIO.emit('data',data+'\n')
	time.sleep(t)


	data='18.527996+73.850457'
	socketIO.emit('data',data+'\n')
	time.sleep(t)	
	
	data='18.528962+73.849964'
	socketIO.emit('data',data+'\n')
	time.sleep(t)	


	data='18.529552+73.849878'
	socketIO.emit('data',data+'\n')
	time.sleep(t)


	data='18.529837+73.849749'
	socketIO.emit('data',data+'\n')
	time.sleep(t)

	data='18.530071+73.850167'
	socketIO.emit('data',data+'\n')
	time.sleep(t)

	data='18.529929+73.851058'
	socketIO.emit('data',data+'\n')
	time.sleep(t)

	data='18.529745+73.851380'
	socketIO.emit('data',data+'\n')
	time.sleep(t)

	data='18.529542+73.852056'
	socketIO.emit('data',data+'\n')
	time.sleep(t)

	data='18.529511+73.852431'
	socketIO.emit('data',data+'\n')
	time.sleep(t)


	#print data
s.close()
