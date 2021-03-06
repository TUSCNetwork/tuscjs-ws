# TUSC websocket interface (tuscjs-ws)

Pure JavaScript TUSC websocket library for node.js and browsers. Can be used to easily connect to and obtain data from the TUSC blockchain via public apis or local nodes.

Credit for the original implementation goes to [jcalfeee](https://github.com/jcalfee).

{TODO: builds}

## Setup

{TODO: npm}
This library can be obtained through npm:
```
npm install tuscjs-ws
```

## Usage

Several examples are available in the /examples folder, and the tests in /test also show how to use the library.

Browser bundles are provided in /build/, for testing purposes you can access this from rawgit:

```
<script type="text/javascript" src="{TODO: rawgit bundle}" />
```

A variable tusc_ws will be available in window.

For use in a webpack/browserify context, see the example below for how to open a websocket connection to the Openledger API and subscribe to any object updates:

```
var {Apis} = require("tuscjs-ws");
Apis.instance("ws://18.220.127.200:8090", true).init_promise.then((res) => {
    console.log("connected to:", res[0].network);
    Apis.instance().db_api().exec( "set_subscribe_callback", [ updateListener, true ] )
});

function updateListener(object) {
    console.log("set_subscribe_callback:\n", object);
}
```
The `set_subscribe_callback` callback (updateListener) will be called whenever an object on the blockchain changes or is removed. This is very powerful and can be used to listen to updates for specific accounts, assets or most anything else, as all state changes happen through object updates. Be aware though that you will receive quite a lot of data this way.

# Witness node endpoints
This is a non-exhaustive list of endpoints available from the witness_node executable, which provides the API server of TUSC.

## database_api
{TODO: database apit url}

__Usage examples__
`Apis.instance().db_api().exec(method, params)`
`Apis.instance().db_api().exec("get_objects, [["1.3.0", "2.0.0", "2.1.0"]])`

### Objects
| Method Name                 | Params      |
| --------------------------- |:-----------:|
| get_objects                   | [array object_ids]|
### Subscriptions
| Method Name                 | Params      |
| --------------------------- |:-----------:|
| set_subscribe_callback | [function callback, bool notify_remove_create]     |              
| set_pending_transaction_callback  | [function callback]        |             
| set_block_applied_callback   | [function callback]        |             
| cancel_all_subscriptions  |   []       |             
### Blocks and transactions
| Method Name                 | Params      |
| --------------------------- |:-----------:|
| get_block_header                   | [int block_num]|
| get_block_header_batch                   | [array block_nums]|
| get_block                   | [int block_num]|
| get_transaction                   | [int block_num, int trx_in_block]|
### Globals
| Method Name                 | Params      |
| --------------------------- |:-----------:|
| get_chain_properties                   | []|
| get_global_properties                   | []|
| get_config                   | []|
| get_chain_id                   | []|
| get_dynamic_global_properties                   | []|
### Keys
| Method Name                 | Params      |
| --------------------------- |:-----------:|
| get_key_references                   | [array public_keys]|
| is_public_key_registered                   | [string public_key]|
### Accounts
| Method Name                 | Params      |
| --------------------------- |:-----------:|
| get_accounts                   | [array account_ids]|
| get_full_accounts                   | [array account_names_or_ids, bool subscribe]|
| get_account_by_name                   | [string name]|
| get_account_references                   | [string account_id]|
| lookup_account_names                   | [array account_names]|
| lookup_accounts                   | [string lower_bound_name, int limit]|
| get_account_count                   | []|
### Assets
| Method Name                 | Params      |
| --------------------------- |:-----------:|
| get_assets                   | [array asset_ids]|
| list_assets                   | [string lower_bound_symbol, int limit]|
| lookup_asset_symbols                   | [array symbols_or_ids]|

## Tests

The tests show several use cases, to run, simply type `npm run test`. The tests require a local witness node to be running, as well as an active internet connection.
