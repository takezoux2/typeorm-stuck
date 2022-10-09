# Whet's this?

This program repdoruce type-orm stuck. 


# Run

`yarn start:stuck` to run bad program.
There are some logs and then stuck.



# What's happend?

The program stops at the point getting db connection in the transaction.
Connection pool blocks forever when there have been no connections.



# 




