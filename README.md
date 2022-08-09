# Why `move-to-ts`
- automated TypeScript SDK generation

As web3 devs, we've probably wasted too many hours writing TypeScript SDKs.

For example, DEX protocols usually implement their pricing logic in smart contracts, and then duplicate that logic 
in TypeScript so that their frontend are able to make quotes on the spot as user is entering input amounts. That's 
basically duplicated business logic. The same goes for lending protocols that need to implement their interest 
rate and borrow limit checking logic twice, once in smart contract and once in TypeScript frontend.

Can we get rid of that duplicate work, write business logic once in our smart contract, and automatically generate the 
equivalent TypeScript?

That's exactly why we built the `move-to-ts` transpiler. With `move-to-ts`, Aptos/Move developers can forget about 
duplicating business logic, and just focus on building pretty frontends and error-free smart contracts.

Since this tutorial is targeted at Move developers, we assume that you are already familiar with the Move language.
If that is not the case, we recommend you go through [these](https://aptos.dev/) learning resources first.

# Step-by-step guide

Now, let's get straight to business. In this guide, we will use a very naive lending protocol 
([github here](https://github.com/hippospace/tutorial-lending)) to demonstrate how to
1. Automatically generated TypeScript SDK
2. Generate CLI utility to interact with your contract
3. Simulate arbitrary computation in Move, and fetch the execution result in TypeScript


## Step 1: Install `move-to-ts`
```bash
$ cargo install --git https://github.com/hippospace/move-to-ts
```

## Step 2: Clone the move contract
```bash
$ git clone https://github.com/hippospace/tutorial-lending
```

## Step 3: Compile the move contract
```bash
$ cd tutorial-lending
$ aptos move compile
```
For the commands above, you do need to have already installed the aptos CLI tool. We recommend the latest devnet build.

## Step 4: generate TypeScript SDK
```bash
$ move-to-ts -c -n lending -o typescript
```
In the command above, 
- `-c` instructs the transpiler to generate related CLI utilities
- `-n lending` instructs the transpiler to generate a `package.json`, where the package name is `lending`
- `-o typescript` instructs the transpiler to output generated files into the typescript folder

After executing the last `move-to-ts` command, our transpiler has already translated the naive lending protocol's 
Move code to TypeScript, and saved it under the `typescript` folder.