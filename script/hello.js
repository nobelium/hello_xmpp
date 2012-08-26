var Hello = {
	connection: null,
	start_time: null,

	log: function (msg) {
		$("#log").append("<p>" + msg + "<p><br/>");
	},
	send_ping: function (to) {
		var ping = $iq({
			to: to,
			type: "get",
			id: "ping1"
		}).c("ping", {xmlns: "urn:xmpp:ping"});

		Hello.log("Sending ping to "+to+".");

		Hello.start_time = (new Date()).getTime();
		Hello.connection.send(ping);
	},
	handle_pong: function(iq){
		var elapsed = (new Date()).getTime()-Hello.start_time;
		Hello.log("Received pong in "+elapsed+" ms");

		Hello.connection.disconnect();

		return false;
	}
};


$(document).ready(function(){
	$('#login_dialog').dialog({
		autoOpen: true,
		draggable: false,
		modal: true,
		title: 'Connect to XMPP server',
		buttons: {
			"Connect": function(){
				$(document).trigger('connect',{
					jid: $("#jid").val(),
					password: $("#password").val()
				});

				$("#password").val('');
				$(this).dialog('close');
			}
		}
	});

	$(document).bind("connect",function(ev, data){
		var conn = new Strophe.Connection("http://localhost:5280/http-bind");
		conn.connect(data.jid, data.password, function(status){
			if(status === Strophe.Status.CONNECTED){
				$(document).trigger("connected");
			} else if(status === Strophe.Status.DISCONNECTED){
				$(document).trigger("disconnected");
			} else if(status === Strophe.Status.AUTHFAIL){
				$(document).trigger("authfailed");
			} else if(status === Strophe.Status.CONNFAIL){
				$(document).trigger("connfailed");
			}

		});

		Hello.connection = conn;
	});

	$(document).bind("connected",function(){
		
		Hello.log("Connection established with server at http://localhost:5280/http-bind");
		//Hello.log("You are now logged in as "+Strophe.getUserFromJid(Hello.connection.jid).toString());
		//for some reason Strophe.getUserFromJid is not working.. if anyone knows why let me know..
		Hello.connection.addHandler(Hello.handle_pong, null, "iq", null, "ping1");
		
		var domain = Strophe.getDomainFromJid(Hello.connection.jid);
		
		Hello.send_ping(domain);
	});

	$(document).bind("disconnected",function(){
		Hello.log("Connection terminated");
		Hello.connection = null;
	});

	$(document).bind("authfailed",function(){
		Hello.log("Invalid login credentials");
		Hello.connection = null;
	})

	$(document).bind("connfailed",function(){
		Hello.log("Could not connect to server at http://localhost:5280/http-bind");
		Hello.connection = null;
	})
});