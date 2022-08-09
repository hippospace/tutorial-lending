module hippo_tutorial::lend2 {
    use aptos_std::iterable_table;
    use aptos_std::table;
    use aptos_std::type_info::{TypeInfo, type_of};
    use std::vector;
    use std::option;
    use std::signer::address_of;
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::coins;

    struct LendingPoolReserve<phantom CoinType> has key {
        reserve: Coin<CoinType>,
    }

    struct LendingPool has store {
        pool_id: u64,
        coin_type: TypeInfo,
        coin_price: u64,
        total_deposit: u64,
        total_borrow: u64,
    }

    struct DepositPosition has copy, drop, store {
        pool_id: u64,
        deposit_amount: u64,
    }

    struct BorrowPosition has copy, drop, store {
        pool_id: u64,
        borrow_amount: u64,
    }

    #[method(check_borrow_within_limit, compute_borrow_deposit_value, user_get_limits)]
    struct User has key, store {
        deposits: iterable_table::IterableTable<u64, DepositPosition>,
        borrows: iterable_table::IterableTable<u64, BorrowPosition>,
    }

    struct LendingProtocol has key, store {
        users: vector<address>,
        pools: vector<LendingPool>,
        pool_index: table::Table<TypeInfo, u64>,
    }

    #[cmd(desc=b"Initialize protocol information (admin-only)")]
    public entry fun admin_init(admin: &signer) {
        assert!(address_of(admin) == @hippo_tutorial, 1000);

        // initialize LendingProtocol
        move_to<LendingProtocol>(admin, LendingProtocol {
            users: vector::empty<address>(),
            pools: vector::empty<LendingPool>(),
            pool_index: table::new<TypeInfo, u64>()
        })
    }

    #[cmd(desc=b"Create a new lending pool (admin-only)")]
    public entry fun admin_add_pool<CoinType>(admin: &signer, initial_price: u64) acquires LendingProtocol {
        assert!(address_of(admin) == @hippo_tutorial, 1000);

        // make sure pool does not already exist
        assert!(!exists<LendingPoolReserve<CoinType>>(address_of(admin)), 1001);

        // make sure CoinType is valid
        assert!(coin::is_coin_initialized<CoinType>(), 1002);

        // fetch protocol info
        let protocol = borrow_global_mut<LendingProtocol>(@hippo_tutorial);

        // create LendingPool
        let pool_id = vector::length(&protocol.pools);
        let coin_type = type_of<CoinType>();
        let pool = LendingPool {
            pool_id,
            coin_type,
            coin_price: initial_price,
            total_deposit: 0,
            total_borrow: 0,
        };

        // create LendingPoolReserve
        move_to<LendingPoolReserve<CoinType>>(admin, LendingPoolReserve<CoinType> {
            reserve: coin::zero<CoinType>(),
        });

        vector::push_back(&mut protocol.pools, pool);
        table::add(&mut protocol.pool_index, type_of<CoinType>(), pool_id)
    }

    #[cmd(desc=b"Update price of a particular coin (admin-only)")]
    public entry fun admin_update_price<CoinType>(admin: &signer, price: u64) acquires LendingProtocol {
        assert!(address_of(admin) == @hippo_tutorial, 1000);
        let protocol = borrow_global_mut<LendingProtocol>(@hippo_tutorial);
        let coin_type = type_of<CoinType>();
        let pool_id = *table::borrow(&protocol.pool_index, coin_type);
        let pool = vector::borrow_mut(&mut protocol.pools, pool_id);
        pool.coin_price = price;
    }

    public fun ensure_user_exists(user: &signer, protocol: &mut LendingProtocol) {
        if (!exists<User>(address_of(user))) {
            vector::push_back(&mut protocol.users, address_of(user));
            move_to(user, User {
                deposits: iterable_table::new<u64, DepositPosition>(),
                borrows: iterable_table::new<u64, BorrowPosition>(),
            })
        }
    }

    #[cmd(desc=b"Make a deposit into the CoinType pool. May create User if User does not already exist")]
    public entry fun deposit<CoinType>(
        user: &signer,
        amount: u64
    ) acquires LendingPoolReserve, LendingProtocol, User {
        let protocol = borrow_global_mut<LendingProtocol>(@hippo_tutorial);
        ensure_user_exists(user, protocol);
        let coin_type = type_of<CoinType>();
        let pool_id = *table::borrow(&protocol.pool_index, coin_type);
        let pool = vector::borrow_mut(&mut protocol.pools, pool_id);
        let reserve = borrow_global_mut<LendingPoolReserve<CoinType>>(@hippo_tutorial);
        let user_assets = borrow_global_mut<User>(address_of(user));

        // withdraw from user wallet
        let coin = coin::withdraw<CoinType>(user, amount);

        // get LendingPoolReserve

        make_deposit(user_assets, pool, coin, reserve);

        // no validation needed
    }

    #[cmd(desc=b"Withdraw from the CoinType pool. May fail if user exceeds borrow limit, or if he does not have enough deposit")]
    public entry fun withdraw<CoinType>(
        user: &signer,
        amount: u64,
    ) acquires LendingPoolReserve, LendingProtocol, User {
        let protocol = borrow_global_mut<LendingProtocol>(@hippo_tutorial);
        ensure_user_exists(user, protocol);
        let coin_type = type_of<CoinType>();
        let pool_id = *table::borrow(&protocol.pool_index, coin_type);
        let pool = vector::borrow_mut(&mut protocol.pools, pool_id);
        let reserve = borrow_global_mut<LendingPoolReserve<CoinType>>(@hippo_tutorial);
        let user_assets = borrow_global_mut<User>(address_of(user));

        let coin = make_withdrawal<CoinType>(user_assets, pool, amount, reserve);
        if (!coin::is_account_registered<CoinType>(address_of(user))) {
            coins::register_internal<CoinType>(user);
        };
        coin::deposit(address_of(user), coin);

        assert!(check_borrow_within_limit(user_assets, protocol), 4000);
    }

    #[cmd(desc=b"Borrow from the CoinType pool. May fail if user exceeds borrow limit.")]
    public entry fun borrow<CoinType>(
        user: &signer,
        amount: u64,
    ) acquires LendingPoolReserve, LendingProtocol, User {
        let protocol = borrow_global_mut<LendingProtocol>(@hippo_tutorial);
        ensure_user_exists(user, protocol);
        let coin_type = type_of<CoinType>();
        let pool_id = *table::borrow(&protocol.pool_index, coin_type);
        let pool = vector::borrow_mut(&mut protocol.pools, pool_id);
        let reserve = borrow_global_mut<LendingPoolReserve<CoinType>>(@hippo_tutorial);
        let user_assets = borrow_global_mut<User>(address_of(user));

        let coin = make_borrow<CoinType>(user_assets, pool, amount, reserve);
        if (!coin::is_account_registered<CoinType>(address_of(user))) {
            coins::register_internal<CoinType>(user);
        };
        coin::deposit(address_of(user), coin);

        assert!(check_borrow_within_limit(user_assets, protocol), 4000);
    }

    #[cmd(desc=b"Repay existing debt in the CoinType pool. May fail if user does not have such debt.")]
    public entry fun repay<CoinType>(
        user: &signer,
        amount: u64
    ) acquires LendingPoolReserve, LendingProtocol, User {
        let protocol = borrow_global_mut<LendingProtocol>(@hippo_tutorial);
        ensure_user_exists(user, protocol);
        let coin_type = type_of<CoinType>();
        let pool_id = *table::borrow(&protocol.pool_index, coin_type);
        let pool = vector::borrow_mut(&mut protocol.pools, pool_id);
        let reserve = borrow_global_mut<LendingPoolReserve<CoinType>>(@hippo_tutorial);
        let user_assets = borrow_global_mut<User>(address_of(user));

        // withdraw from user wallet
        let coin = coin::withdraw<CoinType>(user, amount);

        // get LendingPoolReserve

        make_repayment(user_assets, pool, coin, reserve);

        // no validation needed
    }

    public fun make_deposit<CoinType>(
        user: &mut User,
        pool: &mut LendingPool,
        coin: Coin<CoinType>,
        reserve: &mut LendingPoolReserve<CoinType>
    ) {
        let amount = coin::value(&coin);
        coin::merge(&mut reserve.reserve, coin);
        assert!(pool.coin_type == type_of<CoinType>(), 2001);
        let pool_id = pool.pool_id;

        // update pool number
        pool.total_deposit = pool.total_deposit + amount;
        // update user number
        if (!iterable_table::contains(&user.deposits, pool_id)) {
            // create DepositPosition
            iterable_table::add(&mut user.deposits, pool_id, DepositPosition {
                pool_id,
                deposit_amount: amount,
            })
        }
        else {
            let position = iterable_table::borrow_mut(&mut user.deposits, pool_id);
            position.deposit_amount = position.deposit_amount + amount;
        }
    }

    public fun make_withdrawal<CoinType>(
        user: &mut User,
        pool: &mut LendingPool,
        amount: u64,
        reserve: &mut LendingPoolReserve<CoinType>
    ): Coin<CoinType> {
        let coin = coin::extract(&mut reserve.reserve, amount);
        assert!(pool.coin_type == type_of<CoinType>(), 2001);
        let pool_id = pool.pool_id;

        // update pool number
        pool.total_deposit = pool.total_deposit - amount;
        // update user number
        let position = iterable_table::borrow_mut(&mut user.deposits, pool_id);
        position.deposit_amount = position.deposit_amount - amount;

        coin
    }

    public fun make_borrow<CoinType>(
        user: &mut User,
        pool: &mut LendingPool,
        amount: u64,
        reserve: &mut LendingPoolReserve<CoinType>
    ): Coin<CoinType> {
        let coin = coin::extract(&mut reserve.reserve, amount);
        assert!(pool.coin_type == type_of<CoinType>(), 2001);
        let pool_id = pool.pool_id;

        // update pool number
        pool.total_borrow = pool.total_borrow + amount;
        // update user number
        if (!iterable_table::contains(&user.borrows, pool_id)) {
            // create DepositPosition
            iterable_table::add(&mut user.borrows, pool_id, BorrowPosition {
                pool_id,
                borrow_amount: amount,
            })
        }
        else {
            let position = iterable_table::borrow_mut(&mut user.borrows, pool_id);
            position.borrow_amount = position.borrow_amount + amount;
        };

        coin
    }

    public fun make_repayment<CoinType>(
        user: &mut User,
        pool: &mut LendingPool,
        coin: Coin<CoinType>,
        reserve: &mut LendingPoolReserve<CoinType>
    ) {
        let amount = coin::value(&coin);
        coin::merge(&mut reserve.reserve, coin);
        assert!(pool.coin_type == type_of<CoinType>(), 2001);
        let pool_id = pool.pool_id;

        // update pool number
        pool.total_borrow = pool.total_borrow - amount;
        // update user number
        let position = iterable_table::borrow_mut(&mut user.borrows, pool_id);
        position.borrow_amount = position.borrow_amount - amount;
    }

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

    public fun check_borrow_within_limit(user: &User, protocol: &LendingProtocol): bool {
        let (borrow_value, deposit_value) = compute_borrow_deposit_value(user, protocol);
        // borrow_value / deposit_value < 90 / 100
        // borrow_value * 100 < deposit_value * 90
        borrow_value * 100 < deposit_value * 90
    }

    public fun user_get_limits(user: &User, protocol: &LendingProtocol): (bool, u64, u64) {
        let (borrow_value, deposit_value) = compute_borrow_deposit_value(user, protocol);
        // borrow_value / deposit_value < 90 / 100
        // borrow_value * 100 < deposit_value * 90
        (borrow_value * 100 < deposit_value * 90, borrow_value, deposit_value)
    }

    struct UserInfo has key, store {
        address: address,
        deposits: vector<DepositPosition>,
        borrows: vector<BorrowPosition>,
        borrow_value: u64,
        deposit_value: u64,
        is_healthy: bool,
    }

    struct AllUserInfo has key, store {
        healthy_users: vector<UserInfo>,
        unhealthy_users: vector<UserInfo>,
    }

    public fun get_values<K: copy + store + drop, V: store + copy>(table: &iterable_table::IterableTable<K, V>):
    vector<V> {
        let list = vector::empty<V>();

        let tail = iterable_table::tail_key(table);
        while (option::is_some(&tail)) {
            let key = *option::borrow(&tail);
            let (value, prev, _) = iterable_table::borrow_iter(table, key);
            vector::push_back(&mut list, *value);
            tail = prev;
        };

        list
    }

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
            if (is_healthy) {
                vector::push_back(&mut list.healthy_users, user_info);
            }
            else {
                vector::push_back(&mut list.unhealthy_users, user_info);
            };

            i = i + 1;
        };

        // write result out
        move_to(initiator, list)
    }

    struct FakeBTC {}
    struct FakeETH {}
    struct FakeUSDC {}
    struct FakeUSDT {}

    struct FreeCoins has key {
        btc_coin: Coin<FakeBTC>,
        eth_coin: Coin<FakeETH>,
        usdc_coin: Coin<FakeUSDC>,
        usdt_coin: Coin<FakeUSDT>,

        btc_cap: coin::MintCapability<FakeBTC>,
        eth_cap: coin::MintCapability<FakeETH>,
        usdc_cap: coin::MintCapability<FakeUSDC>,
        usdt_cap: coin::MintCapability<FakeUSDT>,

        btc_burn: coin::BurnCapability<FakeBTC>,
        eth_burn: coin::BurnCapability<FakeETH>,
        usdc_burn: coin::BurnCapability<FakeUSDC>,
        usdt_burn: coin::BurnCapability<FakeUSDT>,
    }

    #[cmd]
    public entry fun init_fake_pools(admin: &signer) acquires LendingProtocol {
        use std::string;
        let name = string::utf8(b"name");
        let (btc_cap, btc_burn) = coin::initialize<FakeBTC>(admin, copy name, copy name, 0, false);
        let (eth_cap, eth_burn) = coin::initialize<FakeETH>(admin, copy name, copy name, 0, false);
        let (usdc_cap, usdc_burn) = coin::initialize<FakeUSDC>(admin, copy name, copy name, 0, false);
        let (usdt_cap, usdt_burn) = coin::initialize<FakeUSDT>(admin, copy name, copy name, 0, false);

        let mint_amount = 1000000000000;
        move_to(admin, FreeCoins {
            btc_coin: coin::mint(mint_amount, &btc_cap),
            eth_coin: coin::mint(mint_amount, &eth_cap),
            usdc_coin: coin::mint(mint_amount, &usdc_cap),
            usdt_coin: coin::mint(mint_amount, &usdt_cap),

            btc_cap,
            eth_cap,
            usdc_cap,
            usdt_cap,

            btc_burn,
            eth_burn,
            usdc_burn,
            usdt_burn,
        });

        admin_init(admin);
        admin_add_pool<FakeBTC>(admin, 10000);
        admin_add_pool<FakeETH>(admin, 1000);
        admin_add_pool<FakeUSDC>(admin, 1);
        admin_add_pool<FakeUSDT>(admin, 1);
    }

    #[cmd]
    public entry fun price_drop(admin: &signer) acquires LendingProtocol {
        admin_update_price<FakeBTC>(admin, 5000);
        admin_update_price<FakeETH>(admin, 500);
    }

    fun init_coin_stores(user: &signer) acquires FreeCoins {
        coins::register_internal<FakeBTC>(user);
        coins::register_internal<FakeETH>(user);
        coins::register_internal<FakeUSDC>(user);
        coins::register_internal<FakeUSDT>(user);
        let faucet_amount = 1000000000;
        let free_coins = borrow_global_mut<FreeCoins>(@hippo_tutorial);
        let btc = coin::extract(&mut free_coins.btc_coin, faucet_amount);
        let eth = coin::extract(&mut free_coins.eth_coin, faucet_amount);
        let usdc = coin::extract(&mut free_coins.usdc_coin, faucet_amount);
        let usdt = coin::extract(&mut free_coins.usdt_coin, faucet_amount);
        let addr = address_of(user);
        coin::deposit(addr, btc);
        coin::deposit(addr, eth);
        coin::deposit(addr, usdc);
        coin::deposit(addr, usdt);
    }

    #[cmd]
    public entry fun create_fake_user1(user: &signer) acquires FreeCoins, LendingPoolReserve, LendingProtocol, User {
        init_coin_stores(user);
        // deposit a lot, borrow nothing
        deposit<FakeBTC>(user, 10000000);
        deposit<FakeETH>(user, 10000000);
        deposit<FakeUSDC>(user, 10000000);
        deposit<FakeUSDT>(user, 10000000);
    }

    #[cmd]
    public entry fun create_fake_user2(user: &signer) acquires FreeCoins, LendingPoolReserve, LendingProtocol, User {
        init_coin_stores(user);
        // deposit a lot, borrow little
        deposit<FakeBTC>(user, 100);
        deposit<FakeETH>(user, 100);
        borrow<FakeUSDC>(user, 100);
    }

    #[cmd]
    public entry fun create_fake_user3(user: &signer) acquires FreeCoins, LendingPoolReserve, LendingProtocol, User {
        init_coin_stores(user);
        // deposit a lot, borrow a lot
        deposit<FakeBTC>(user, 100);
        deposit<FakeETH>(user, 100);
        borrow<FakeUSDC>(user, 800000);
    }

    #[test_only]
    fun test_init(admin: &signer, user1: &signer, user2: &signer, user3: &signer) acquires FreeCoins, LendingPoolReserve, LendingProtocol, User  {
        use aptos_framework::account;
        account::create_account(address_of(admin));
        account::create_account(address_of(user1));
        account::create_account(address_of(user2));
        account::create_account(address_of(user3));
        init_fake_pools(admin);
        create_fake_user1(user1);
        create_fake_user2(user2);
        create_fake_user3(user3);
    }

    #[test(admin=@hippo_tutorial, user1=@0x1001, user2=@0x1002, user3=@0x1003)]
    public entry fun test_user_creation(admin: &signer, user1: &signer, user2: &signer, user3: &signer) acquires FreeCoins, LendingPoolReserve, LendingProtocol, User  {
        test_init(admin, user1, user2, user3);
    }

    #[test(admin=@hippo_tutorial, user1=@0x1001, user2=@0x1002, user3=@0x1003)]
    public entry fun test_borrow_success(admin: &signer, user1: &signer, user2: &signer, user3: &signer) acquires FreeCoins, LendingPoolReserve, LendingProtocol, User  {
        test_init(admin, user1, user2, user3);
        // user2 tries to borrow a lot should succeed
        borrow<FakeUSDC>(user2, 800000);
    }

    #[expected_failure]
    #[test(admin=@hippo_tutorial, user1=@0x1001, user2=@0x1002, user3=@0x1003)]
    public entry fun test_borrow_failure(admin: &signer, user1: &signer, user2: &signer, user3: &signer) acquires FreeCoins, LendingPoolReserve, LendingProtocol, User  {
        test_init(admin, user1, user2, user3);
        // user3 tries to borrow a lot should fail
        borrow<FakeUSDC>(user3, 800000);
    }

    #[test(admin=@hippo_tutorial, user1=@0x1001, user2=@0x1002, user3=@0x1003)]
    public entry fun test_withdraw_success(admin: &signer, user1: &signer, user2: &signer, user3: &signer) acquires FreeCoins, LendingPoolReserve, LendingProtocol, User  {
        test_init(admin, user1, user2, user3);
        // user2 tries to withdraw a lot should succeed
        withdraw<FakeBTC>(user2, 100);
    }

    #[expected_failure]
    #[test(admin=@hippo_tutorial, user1=@0x1001, user2=@0x1002, user3=@0x1003)]
    public entry fun test_withdraw_failure(admin: &signer, user1: &signer, user2: &signer, user3: &signer) acquires FreeCoins, LendingPoolReserve, LendingProtocol, User  {
        test_init(admin, user1, user2, user3);
        // user3 tries to withdraw a lot should fail
        withdraw<FakeBTC>(user3, 100);
    }
}
