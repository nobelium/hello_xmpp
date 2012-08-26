Hi everyone. This is my first shot at creating an xmpp client. This might be useful for newbies who wants to get their feet wet in the world of xmpp. 

Some thing about the script:

	The script uses the followin libraries
	* jquery
	* jquery-ui
	* flXHR
	* Strophe
	* Strophe.flXHR

	To run the script, just clone the repo and run xmpp server(ejabbered, openfire, .. or any other server mentioned in http://xmpp.org/xmpp-software/servers/) with BOSH(Bidirectional stream Over Synchronous HTTP) module listening at port 5280 and serve hello.html using a HTTP server
	(or)
	change the server location in script/hello.js to any public xmpp server and run the script.

Note:
	Although flXHR allows you to do cross-domain requests with no server setup, it doesn't allow you to run applications from file:// URLs that make requests to http:// URLs. This means you will need to use a web server to serve hello.html over HTTP.
	And the most important thing.. your login name will be something like <login_name>@<server_name> 
	For Eg: admin@localhost

