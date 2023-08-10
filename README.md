# Parse Alchemy eth_getLogs JSON and Match Against Flipside Crypto's fact_transactions JSON

This project matches the transactions that resulted in logs with the to_address that of the zkSync
Era Diamond Proxy and the event signature that of NewPriorityRequest. These logs are emitted for both
direct user wallet interactions with the official zkSync Era Bridge, for fees transferred from zkSync
Era Bridge to zkSync Era Diamond Proxy for bridging USDC (or other tokens), and for transfers from
third-party bridges to zkSync Era Diamond Proxy.

By matching these logs' transaction hashes against the transaction hashes only from Flipside that only
account for the end-user wallet interactions with the official bridge, we can look at the nature of
these additional transactions.

Once these additional transactions have been confirmed as fees for bridging tokens and for bridging via
third-party bridges, we can write a query on Flipside that accounts for the daily ETH value difference
between Flipside and Etherscan's Analytics page.
