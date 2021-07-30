FROM microsoft/mssql-server-linux
ENV MSSQL_SA_PASSWORD=myPassword
ENV ACCEPT_EULA=Y

COPY ./My_DB.bak /var/opt/mssql/backup/My_DB.bak
COPY restore.sql restore.sql
RUN (/opt/mssql/bin/sqlservr --accept-eula & ) | \ 
  grep -q "Starting database restore" && \ 
  /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'myPassword' -d master -i restore.sql
