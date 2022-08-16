# `move-to-ts`: TypeScript dev framework for Move
Automatically generate TypeScript SDK from your Move contract:

```typescript
const {client, account} = ...;

// Load auto-generated App
const app = new App(client).hippo_tutorial.lend2;

// load User and LendingProtocol struct from chain
const user = await app.loadUser(account.address());
const protocol = await app.loadLendingProtocol(app.moduleAddress, false);

// call user_get_limits to compute some info about user's state
const [isUserHealthy, totalBorrowValue, totalDepositValue] = user.user_get_limits(protocol);
console.log(isUserHealthy, totalBorrowValue, totalDepositValue);

// make a withdrawal
await app.withdraw(account, u64(1000000), [app.FakeBTC.getTag()]);
```

This guide includes a naive lending protocol implemented in Move. The above snippet demonstrates how you can use the 
auto-generated TypeScript SDK to:
- Load onchain data (`User` and `LendingProtocol`)
- Directly call into functions written in Move 
  ([user_get_limits](https://github.com/hippospace/tutorial-lending/blob/e4fba83e8da5e281df16005f2fe0e81658b3e32b/sources/lending.move#L325) 
  is a Move function that computes a `User`'s total deposit and borrow values to determine if the user is "healthy")
- Send transactions (withdraw 1000000 units of FakeBTC)


Since this tutorial is targeted at Move developers, we assume that you are already familiar with the Move language.
If that is not the case, we recommend you go through [these](https://aptos.dev/) learning resources first.

# Step-by-step guide

Now, let's get straight to business. In this guide, we will use a very naive lending protocol 
([github here](https://github.com/hippospace/tutorial-lending)) to demonstrate how to
1. Automatically generate TypeScript SDK
2. Use the generated `App` interface from your frontend/TypeScript application
3. Generate CLI utility to interact with our contract
4. Simulate arbitrary computation in Move, and fetch the execution result in TypeScript
5. Execute Move code within JavaScript environment


## Step 1: Install `move-to-ts`
```bash
$ cargo install --git https://github.com/hippospace/move-to-ts
```

Do note that `move-to-ts` is a rapidly evolving project. If you install it through cargo, you may need to frequently 
reinstall to pick up the latest features.

## Step 2: Clone the move contract
```bash
$ git clone https://github.com/hippospace/tutorial-lending
```

The contract cloned above is a toy lending protocol written in Move. It provides basic features such as lending pool 
creation, user deposit/withdraw/borrow/repay, and leaves out liquidation or interest rate logic for simplicity. You 
may examine the full contract [here](https://github.com/hippospace/tutorial-lending/blob/main/sources/lending.move).

## Step 3: Compile the demo contract
```bash
$ cd tutorial-lending
$ aptos move compile
```
For the commands above, you do need to have already installed the aptos CLI tool. We recommend the latest devnet 
build which can be installed with:
```bash
$ cargo install --git https://github.com/aptos-labs/aptos-core.git aptos --branch devnet
```

## Step 4: generate TypeScript SDK
```bash
$ move-to-ts -c -n lending -o typescript
```
In the command above, 
- `-c` instructs the transpiler to generate related CLI utilities
- `-n lending` instructs the transpiler to generate a `package.json`, where the package name is `lending`
- `-o typescript` instructs the transpiler to output generated files into the typescript folder. If not specified, 
  it will instead output generated files to the `build/typescript` directory.

After executing the last `move-to-ts` command, our transpiler has already translated the naive lending protocol's 
Move code to TypeScript, and saved it under the `typescript` folder. We can have a look at the files generated:

```bash
$ cd typescript
$ ls -l

  -rw-rw-r-- 1 mana mana  814 Aug  9 15:10 package.json
  drwxrwxr-x 6 mana mana 4096 Aug  9 15:10 src
  -rw-rw-r-- 1 mana mana  382 Aug  9 15:10 tsconfig.json
```
We note that `package.json` is the generated package file, and `tsconfig.json` contains information needed for our 
typescript compiler later. If we look at the actual files generated under `src`:

```bash
$ ls src -l

  drwxrwxr-x 2 mana mana 4096 Aug  9 15:10 aptos_framework
  drwxrwxr-x 2 mana mana 4096 Aug  9 15:10 aptos_std
  -rw-rw-r-- 1 mana mana 7460 Aug  9 15:10 cli.ts
  drwxrwxr-x 2 mana mana 4096 Aug  9 15:10 hippo_tutorial
  -rw-rw-r-- 1 mana mana  681 Aug  9 15:10 index.ts
  drwxrwxr-x 2 mana mana 4096 Aug  9 15:10 std
```

We see there is one folder for each of the packages that our project depends on (`aptos_framework`, `aptos_std`
and `std`), and one folder for our own package `hippo_tutorial`. You may examine the content of these files to see 
how our Move code is translated to TypeScript.

## Step 5: Build the SDK

```bash
$ yarn install
$ yarn build
```

## Using the generated `App` interface

```typescript
import { App } from "path-to-generated-sdk";

async function appDemo() {
  const {client, account} = ...;
  
  // Load auto-generated App
  const app = new App(client).hippo_tutorial.lend2;

  // load User and LendingProtocol struct from chain
  const user = await app.loadUser(account.address());
  const protocol = await app.loadLendingProtocol(app.moduleAddress, false);

  // call user_get_limits to compute some info about user's state
  const [isUserHealthy, totalBorrowValue, totalDepositValue] = user.user_get_limits(protocol);
  console.log(isUserHealthy, totalBorrowValue, totalDepositValue);

  // make a withdrawal
  await app.withdraw(account, u64(1000000), [app.FakeBTC.getTag()]);
}
```

Using the `App` interface, you can:
- Load on-chain state
  - `app.loadStructName(ownerAddress, loadFull=true)`
  - When `loadFull` is `true`, the loader will automatically load all `IterableTable` key-value pairs embedded in 
    the `IterableTable`.
  - Note that structs that contain the `aptos_std::table::Table` struct cannot be loaded in full since there is no 
    easy way to enumearte all keys. If a struct contains an `aptos_std::table::Table`, you need to set `loadFull` to 
    `false` otherwise execution will throw an error.
- Execute functions written in Move
- Build TransactionPayload (needed by frontend wallets)
- Send transactions directly (useful in CLI)

Details for above incoming...

## Use the CLI utility to fire transactions
```bash
$ yarn cli

  Usage: move-ts-cli [options] [command]

  Move TS CLI generated by move-to-ts

  Options:
    -c, --config <path>                                   path to your aptos config.yml (generated with "aptos
                                                          init")
    -p, --profile <PROFILE>                               aptos config profile to use (default: "default")
    -h, --help                                            display help for command

  Commands:
    lend2:admin-add-pool <TYPE_CoinType> <initial_price>  Create a new lending pool (admin-only)
    lend2:admin-init                                      Initialize protocol information (admin-only)
    lend2:admin-update-price <TYPE_CoinType> <price>      Update price of a particular coin (admin-only)
    lend2:borrow <TYPE_CoinType> <amount>                 Borrow from the CoinType pool. May fail if user exceeds
                                                          borrow limit.
    lend2:create-fake-user1
    lend2:create-fake-user2
    lend2:create-fake-user3
    lend2:deposit <TYPE_CoinType> <amount>                Make a deposit into the CoinType pool. May create User if
                                                          User does not already exist
    lend2:init-fake-pools
    lend2:price-drop
    lend2:repay <TYPE_CoinType> <amount>                  Repay existing debt in the CoinType pool. May fail if user
                                                          does not have such debt.
    lend2:withdraw <TYPE_CoinType> <amount>               Withdraw from the CoinType pool. May fail if user exceeds
                                                          borrow limit, or if he does not have enough deposit
    lend2:query-get-all-users
    help [command]                                        display help for command
```

The last command `yarn cli` invokes the auto-generated TypeScript CLI utility. You can see that every command starts 
with `lend2` (the module name), followed by a specific command name. All of them are generated from the `cmd` 
annotation in our Move code.

For example, the `lend2:deposit` command is automatically generated from the code below:
```move
#[cmd(desc=b"Make a deposit into the CoinType pool. May create User if User does not already exist")]
public entry fun deposit<CoinType>(
    user: &signer,
    amount: u64
) acquires LendingPoolReserve, LendingProtocol, User {
    ...
}
```

You can invoke the command above by:
```bash
$ yarn cli -c .aptos/config.yaml lend2:deposit COIN_TYPE_TAG coin_amount
```
Where `.aptos/config.yaml` should contain your aptos account information (created via `aptos init`). You do need to 
make sure that the account inside has been funded using `aptos account create --account ADDRESS --use-faucet`.

## Simulate onchain computation

We have already deployed the toy lending contract to devnet and created a few test users using our devnet test coins.
Inside our Move contract, we have a function that loops over the list of all users, computing each user's borrow 
limit to see if they can be liquidated:

```Move
#[query]
public entry fun get_all_users(initiator: &signer) acquires LendingProtocol, User {
  let protocol = borrow_global<LendingProtocol>(@hippo_tutorial);
  let i = 0;
  let len = vector::length(&protocol.users);
  let list = AllUserInfo {
    healthy_users: vector::empty<UserInfo>(),
    unhealthy_users: vector::empty<UserInfo>(),
  };
  while (i < len) {
    let user_addr = vector::borrow(&protocol.users, i);
    let user = borrow_global<User>(*user_addr);
    let (is_healthy, borrow_value, deposit_value) = user_get_limits(user, protocol);
    let user_info = UserInfo {
      address: *user_addr,
      deposits: get_values(&user.deposits),
      borrows: get_values(&user.borrows),
      borrow_value,
      deposit_value,
      is_healthy,
    };
    // if user cannot be liquidated, we add them to the healthy list
    if (is_healthy) {
      vector::push_back(&mut list.healthy_users, user_info);
    }
    // if user can be liquidated, we add them to the unhealthy list
    else {
      vector::push_back(&mut list.unhealthy_users, user_info);
    };

    i = i + 1;
  };

  // write result out
  move_to(initiator, list)
}
```

Now, above might seem a bit weird: in an ordinary lending protocol, there can be hundreds of thousands of users and 
we usually use indexer data and off-chain scripts to identify the set of users that are eligible for liquidation. 
Why would anyone want to write that code in the smart contract itself? It would be way to expensive to execute anyway!

Well, the function above would be very expensive indeed, unless it is run in simulation mode. We have recently 
introduced the 
[transaction simulation feature](https://github.com/aptos-labs/aptos-core/commit/82570ca3973d7207fe797b42cdb4181c0d1aca1f) 
into the Aptos fullnode. Using the simulation feature, we are essentially able to execute the above Move function in 
a fullnode (which has access to realtime chain state), and fetch the result of the simulation using TypeScript. All 
of these can be done without any gas expenditure.

Indeed, let's see this in action:
```bash
$ yarn cli -c .aptos/config.yaml lend2:query-get-all-users

Using address 0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a
{
  "healthy_users": [
    {
      "address": "0x498d8926f16eb9ca90cab1b3a26aa6f97a080b3fcbe6e83ae150b7243a00fb68",
      "deposits": [
        { "pool_id": "3", "deposit_amount": "10000000" },
        { "pool_id": "2", "deposit_amount": "10000000" },
        { "pool_id": "1", "deposit_amount": "10000000" },
        { "pool_id": "0", "deposit_amount": "10000000" }
      ],
      "borrows": [],
      "borrow_value": "0",
      "deposit_value": "55020000000",
      "is_healthy": true
    },
    {
      "address": "0x49c5e3ec5041062f02a352e4a2d03ce2bb820d94e8ca736b08a324f8dc634790",
      "deposits": [
        { "pool_id": "1", "deposit_amount": "100" },
        { "pool_id": "0", "deposit_amount": "100" }
      ],
      "borrows": [
        { "pool_id": "2", "borrow_amount": "100" }
      ],
      "borrow_value": "100",
      "deposit_value": "550000",
      "is_healthy": true
    }
  ],
  "unhealthy_users": [
    {
      "address": "0xf70ac33c984f8b7bead655ad239d246f1c0e3ca55fe0b8bfc119aa529c4630e8",
      "deposits": [
        { "pool_id": "1", "deposit_amount": "100" },
        { "pool_id": "0", "deposit_amount": "100" }
      ],
      "borrows": [
        { "pool_id": "2", "borrow_amount": "800000" }
      ],
      "borrow_value": "800000",
      "deposit_value": "550000",
      "is_healthy": false
    }
  ]
}
```

What you see here are specific information about 3 users (all we've got for now). Two of them are healthy users and 
one of them is unhealthy. All of these is obtained from a single command.

When we invoke the `query-get-all-users` command, our CLI utility sends a simulation request to one of the devnet 
fullnodes, and requests for the execution of the `get_all_users` function in our contract. Once the simulated 
transaction is performed, the fullnode returns all the state changes back to our CLI utility, and our CLI utility 
identifies the exact value to be displayed automatically.

What does this mean for Move developers? It means that a lot of tasks that you used to need to do manually in 
TypeScript can be performed using your Move contract instead. Common examples for these tasks include:
- Compute user's total deposit and borrow
- Compute user's borrow limit
- Compute lending pool's interest rate
- Compute protocol TVL
- Give AMM quotes

NOTE: you need to place the `#[query]` attribute on top of a `public entry` function to ask the transpiler to 
generate the simulation utility. The simulation utility looks for a `move_to` statement at the end of the `public 
entry` function and returns its value.

## Frontend execution

If you need to perform business-logic computation in the frontend to provide greater responsiveness in your UI, 
`move-to-ts` has you covered as well. For example, in our toy lending contract, we have written this Move function 
to compute a user's total deposit and total borrow value:

```move
public fun compute_borrow_deposit_value(user: &User, protocol: &LendingProtocol): (u64, u64) {
  let deposit_value = 0u64;
  let deposit_tail = iterable_table::tail_key(&user.deposits);
  while (option::is_some(&deposit_tail)) {
    let pool_id = *option::borrow(&deposit_tail);
    let (position, prev, _) = iterable_table::borrow_iter(&user.deposits, pool_id);
    let pool = vector::borrow(&protocol.pools, pool_id);
    let value = position.deposit_amount * pool.coin_price;
    deposit_value = deposit_value + value;
    deposit_tail = prev;
  };

  let borrow_value = 0u64;
  let borrow_tail = iterable_table::tail_key(&user.borrows);
  while (option::is_some(&borrow_tail)) {
    let pool_id = *option::borrow(&borrow_tail);
    let (position, prev, _) = iterable_table::borrow_iter(&user.borrows, pool_id);
    let pool = vector::borrow(&protocol.pools, pool_id);
    let value = position.borrow_amount * pool.coin_price;
    borrow_value = borrow_value + value;
    borrow_tail = prev;
  };

  (borrow_value, deposit_value)
}
```

The Move code above is automatically translated to TypeScript as:
```typescript
export function compute_borrow_deposit_value_ (
  user: User,
  protocol: LendingProtocol,
  $c: AptosDataCache,
): [U64, U64] {
  let borrow_tail, borrow_value, deposit_tail, deposit_value, pool, pool__4, pool_id, pool_id__1, position, position__2, prev, prev__3, value, value__5;
  deposit_value = u64("0");
  deposit_tail = Aptos_std.Iterable_table.tail_key_(user.deposits, $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend2", "DepositPosition", [])]);
  while (Std.Option.is_some_(deposit_tail, $c, [AtomicTypeTag.U64])) {
    {
      pool_id = $.copy(Std.Option.borrow_(deposit_tail, $c, [AtomicTypeTag.U64]));
      [position, prev, ] = Aptos_std.Iterable_table.borrow_iter_(user.deposits, $.copy(pool_id), $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend2", "DepositPosition", [])]);
      pool = Std.Vector.borrow_(protocol.pools, $.copy(pool_id), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend2", "LendingPool", [])]);
      value = ($.copy(position.deposit_amount)).mul($.copy(pool.coin_price));
      deposit_value = ($.copy(deposit_value)).add($.copy(value));
      deposit_tail = $.copy(prev);
    }

  }
  borrow_value = u64("0");
  borrow_tail = Aptos_std.Iterable_table.tail_key_(user.borrows, $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend2", "BorrowPosition", [])]);
  while (Std.Option.is_some_(borrow_tail, $c, [AtomicTypeTag.U64])) {
    {
      pool_id__1 = $.copy(Std.Option.borrow_(borrow_tail, $c, [AtomicTypeTag.U64]));
      [position__2, prev__3, ] = Aptos_std.Iterable_table.borrow_iter_(user.borrows, $.copy(pool_id__1), $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend2", "BorrowPosition", [])]);
      pool__4 = Std.Vector.borrow_(protocol.pools, $.copy(pool_id__1), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend2", "LendingPool", [])]);
      value__5 = ($.copy(position__2.borrow_amount)).mul($.copy(pool__4.coin_price));
      borrow_value = ($.copy(borrow_value)).add($.copy(value__5));
      borrow_tail = $.copy(prev__3);
    }

  }
  return [$.copy(borrow_value), $.copy(deposit_value)];
}
```

And you can invoke it from your TypeScript frontend simply by:
1. first fetching the `User` and `LendingProtocol` resources
2. then invoke the `compute_borrow_deposit_value` method directly on the fetched `User` object

```typescript
const user = await User.load(...);
const protocol = await LendingProtocol.load(...);
const [borrowValue, depositValue] = user.compute_borrow_deposit_value(protocol);
```

Do note that the `compute_borrow_deposit_value` function is included as a method under the TypeScript `User` class 
because we used the `#[method]` attribute to instruct our compiler to do so:

```move
#[method(check_borrow_within_limit, compute_borrow_deposit_value, user_get_limits)]
struct User has key, store {
  deposits: iterable_table::IterableTable<u64, DepositPosition>,
  borrows: iterable_table::IterableTable<u64, BorrowPosition>,
}
```

## Transaction Builder

Of course, how is a TS SDK complete without transaction builders? While our generated CLI utility can help you fire 
transactions directly from the commandline, in frontends what we really need is a convenient way to construct 
transaction payloads. The generated payload would then be signed and submitted by wallets.

To facilitate this process, `move-to-ts` generates one `buildPayload_x` TypeScript function for each `public entry` 
Move function in your contract. For example, for the `deposit` function that we discussed in Step 6, the CLI utility 
uses the following code:

```typescript
  const payload = Hippo_tutorial.Lend2.buildPayload_deposit(amount_, [CoinType_]);
  await sendPayloadTx(client, account, payload);
```

You just need to adapt the last line to be used with your frontend's wallet or wallet-adapter. (we're building a 
wallet adapter to streamline all of these!)
