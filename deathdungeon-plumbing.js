module.exports = {
	port: 24000,
	http: {
		get: {
			'/' : function (q,r) {
				return fs.readFile('./client.html',function(e,d){
					if (e) {
						console.log(deathdungeon('deathdungeon:')+error('error reading ./client.html'));
						r.setHeader('Content-Type','application/json');
						return r.send({error:'error reading ./client.html'});
					} else {
						console.log(deathdungeon('deathdungeon:')+warn('/client.html'));
						r.setHeader('Content-Type','text/html');
						return r.send(d);
					}
				});
			},
			'/client.js' : function(q,r) {
				return fs.readFile('./client.js',function(e,d){
					if (e) {
						console.log(deathdungeon('deathdungeon:')+error('error reading ./client.js'));
						r.setHeader('Content-Type','application/json');
						return r.send({error:'error reading ./client.js'});
					} else {
						console.log(deathdungeon('deathdungeon:')+warn('/client.js'));
						r.setHeader('Content-Type','text/js');
						return r.send(d);
					}
				});
			}
		}
	},
	socket: {
		'create player' : function(q) {
			var token = Math.random().toString(36).substring(7);
			players.push({
				token: token,
				username: q.data.username,
				color: q.data.color
			});
			console.log(deathdungeon('deathdungeon:')+'welcome:'+notice(token+':'+q.data.username));
			return q.io.emit('here are your credentials',{
				token: token,
				username: q.data.username,
				color: q.data.color
			}) + q.io.broadcast('here is a new player',{
				username: q.data.username,
				color: q.data.color
			});
		},
		'someone said something' : function(q) {
			console.log(deathdungeon('deathdungeon:')+say(q.data.token+':'+q.data.username+': '+q.data.say));
			return q.io.broadcast('someone said something',{
				username: q.data.username,
				say: q.data.say,
				color: q.data.color
			});
		}
	}
}