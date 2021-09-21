FROM nginx:1.15.8

RUN rm -f /etc/nginx/conf.d/*

ADD nginx.conf /etc/nginx/myapp.conf

CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/myapp.conf

EXPOSE 80
