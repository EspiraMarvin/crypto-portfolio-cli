## DB Setup

CREATE TABLE portfolios
values 
id INT 


## Add the CSV FILE inside the /var/lib/mysql-files
LOAD DATA INFILE '/var/lib/mysql-files/transactions.csv' INTO TABLE porfolios fieLds terminated BY ',' IGNORE 1 lines (time_stamp, transaction_type, token, amount);

## index fields
ALTER TABLE portfolios ADD INDEX index_time_stamp (time_stamp) to add index to the timestamp column, this helps our improve query time.



## steps

1. npm init -y

2. Create a `bin` folder and put index.js inside

3. Add a script in the index.js file, making sure this line is at the top 
```js
#!/usr/bin/env node
```

4. Change main script to point to the bin folder

```bash
  "main": "./bin/index.js",
```

5. Create a script to run the cli
```bash
  "bin": {
    "welc": "./bin/index.js"
  },
```

6. To install the CLI, run
```bash
sudo npm install -g
```

7. The run the script, and this can be run from anywhere.

```bash
welc
```


note: due to time, I could've used some abstraction later like prisma, typescript ORM, which enables you to connect to any database and test, but I chose mysql for speed.