hackaton-20210528-tv-live-reaction
==================================

[DEMO](https://live-reaction.skillbill.net)

[![buddy pipeline](https://app.buddy.works/skillbill-bw/hackaton-20210528-tv-live-reaction/pipelines/pipeline/329202/badge.svg?token=107d3bbbb60ecabcdb08e0c4f842888977cc5d7b269e84936f8b8074747daf78 "buddy pipeline")](https://app.buddy.works/skillbill-bw/hackaton-20210528-tv-live-reaction/pipelines/pipeline/329202)

![screenshot](./demo-screenshot.png)

# DEV

## API

```
cd api
npm install
npm run start
```

## FE

```
cd frontend
npm install
npm run serve
```

# CLOUD

```
apt-get update
apt-get upgrade
apt-get install     apt-transport-https     ca-certificates     curl     gnupg     lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo   "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
mkdir -p /var/lib/buddy
touch /var/lib/buddy/docker-compose.yml
mkdir -p /var/log/server
```

# HTTPS

```
apt-get update
apt-get install nginx
snap install --classic certbot 
certbot --nginx 
vi /etc/nginx/sites-enabled/default 
#HTTPS CONF
nginx -t && nginx -s reload
```

## HTTPS CONF

```
location / {
    proxy_pass http://127.0.0.1:8080;
    add_header Cache-Control 'must-revalidate, proxy-revalidate, max-age=0';
}

location /api {
    rewrite ^/api/(.*)$ /$1 break;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:3000;
    proxy_buffering off;
    proxy_cache off;

    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Host $server_name;
}

```

