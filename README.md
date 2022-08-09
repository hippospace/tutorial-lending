# Why `move-to-ts`
- subtitle: automated TypeScript SDK generation

As web3 devs, we've probably wasted too many hours writing TypeScript SDKs.

For example, DEX protocols usually implement their pricing logic in smart contracts, and then duplicate that logic 
in TypeScript so that their frontend are able to make quotes on the spot as user is entering input amounts. That's 
basically duplicated business logic. The same goes for lending protocols basically need to implement their interest 
rate and borrow limit checking logic twice, once in smart contract and once in TypeScript frontend.

Can we get rid of that duplicate work, write business logic once in our smart contract, and automatically generate the 
equivalent TypeScript?

That's exactly why we built `move-to-ts`. With `move-to-ts`, Aptos/Move developers can forget about duplicating 
business logic, and just focus on building pretty frontends and error-free smart contracts.

In this tutorial, we'll show you how to leverage the features of `move-to-ts`, a Move-to-TypeScript transpiler, to:
- automatically generate TypeScript SDK
- generate CLI utility to interact with your contract
- simulate arbitrary computation in Move, and fetch the execution result in TypeScript


# Lending Protocol Tutorial

Since this tutorial is targeted at Move developers, we assume that you are already familiar with the Move language. 
If that is not the case, we recommend you go through [these](https://aptos.dev/) learning resources first.

Now, let's get straight to business. In this tutorial, we will
1. develop a naive lending protocol in Move
2. Demonstrate how we can use the auto-generated CLI utility to initialize lending pools and interact with them
3. Demonstrate how we can compute the list of users that need to be liquidated using only the Move language


