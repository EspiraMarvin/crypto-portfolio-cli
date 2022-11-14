## setting the project

To install dependencies run

1. git clone on your work dir and cd into it

2. yarn / npm install

3. copy details in the .env.example create an .env file and copy its content

## DB Setup (used MYSQL Database)

1. Steps create a database name I called it portfolio
2. Create a table with these fields
   > id as auto increment, time_stamp, token and transaction_type

```bash

CREATE TABLE portfolios(id BIGINT NOT NULL AUTO_INCREMENT, time_stamp INT NOT NULL, transaction_type VARCHAR(10) NOT NULL,token VARCHAR(10) NOT NULL, amount INT NOT NULL, PRIMARY KEY(id))

```

## Add the CSV FILE inside the /var/lib/mysql-files

LOAD DATA INFILE '/var/lib/mysql-files/transactions.csv' INTO TABLE porfolios fieLds terminated BY ',' IGNORE 1 lines (time_stamp, transaction_type, token, amount);

> Note: My machine has Ubuntu OS, so I added the csv file inside /var/lib/mysql-files, this is the location where I pull the file and saved to the db using `LOAD DATA INFILE`.

## index fields

ALTER TABLE portfolios ADD INDEX index_time_stamp (time_stamp) to add index to the timestamp column, this helps our improve query time.


## commands (recommended for testing)

```bash

# Get the latest portfolio per token

 node commands.js lp 

# Get the latest portfolio given a token

 node commands.js lpt 

# Get portfolio value on a given date

 node commands.js pd 

# Get portfolio value on a given date and token

 node commands.js pdt 

```


## to link to the shell 

1. I added the code below at the top commands.js file.

```js
#!/usr/bin/env node
```

2. At the package.json file I added the scripts below

```bash
  "preferGlobal": true,
  "bin": "./commands.js",
```

the last script `"bin" : "./commands.js"` makes the commands global

3. created asym link by running,
   > npm link

To unlink just run `npm unlink`

4. Now you can call commands on any location on our CMD starting with the name of our script in the package.json file `cli-web3`

# after publishing run commands

version 1.0.0 should be the output
```bash
 cli-web3 --version

get the help page

 cli-web3 --help 

 cli-web3 lp 

 cli-web3 lpt

 cli-web3 pd 

 cli-web3 pdt

```
