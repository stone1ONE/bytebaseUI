const express = require('express');
const app = express();
const request = require('request');
const session = require('express-session');

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true
}));

const clientId = "id---";
const clientSecret = "Secret---";  
const redirectUri = "http://localhost:3000/login/callback";

app.get('/login/callback', (req, res) => {
  const code = req.query.code;
  const tokenOptions = {
    url: 'https://github.com/login/oauth/access_token',
    form: {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri
    },
    headers: {
      'Accept': 'application/json'
    },
    json: true
  };

  request.post(tokenOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const accessToken = body.access_token;
      const userOptions = {
        url: 'https://api.github.com/user',
        headers: {
          'Authorization': `token ${accessToken}`,
          'User - Agent': 'your - app - name'
        },
        json: true
      };

      request.get(userOptions, (userError, userResponse, userBody) => {
        if (!userError && userResponse.statusCode === 200) {
          const userEmail = userBody.email;
          const avatarUrl = userBody.avatar_url;
          // 这里可以将用户信息存储到数据库或进行其他处理
          req.session.user = { email: userEmail, avatar: avatarUrl };
          res.redirect('/');
        } else {
          console.error('Error fetching user data:', userError);
          res.status(500).send('Error fetching user data');
        }
      });
    } else {
      console.error('Error getting access token:', error);
      res.status(500).send('Error getting access token');
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});