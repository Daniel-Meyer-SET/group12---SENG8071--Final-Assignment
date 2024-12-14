Setup Instructions: 
ensure docker is installed 
open terminal in root directory
run sudo docker-compose up -d --build
if data source does not initialize, run sudo docker-compose down and sudo docker-compose up -d --build again
navigate to localhost/api/<any table name> e.g. employees to verify data source is active 
install jest with sudo npm install --save-dev ts-jest
to run jest tests open terminal in backend/src  and run command <npm test>
to run postman tests, ensure postman is installed
open postman application
import included json file containing tests
once test collection is imported click the 3 dots next to the collection and select run collection
do not change any settings, click Run Api Tests button and observe results. 
to reset database, run sudo docker-compose down, followed by sudo docker volume rm finalproject_postgres-data
to restart, see lines 4-6
