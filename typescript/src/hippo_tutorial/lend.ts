import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
import * as Aptos_framework from "../aptos_framework";
import * as Aptos_std from "../aptos_std";
import * as Std from "../std";
export const packageName = "LendingTutorial";
export const moduleAddress = new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a");
export const moduleName = "lend";



export class AllUserInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "AllUserInfo";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "healthy_users", typeTag: new VectorTag(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "UserInfo", [])) },
  { name: "unhealthy_users", typeTag: new VectorTag(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "UserInfo", [])) }];

  healthy_users: UserInfo[];
  unhealthy_users: UserInfo[];

  constructor(proto: any, public typeTag: TypeTag) {
    this.healthy_users = proto['healthy_users'] as UserInfo[];
    this.unhealthy_users = proto['unhealthy_users'] as UserInfo[];
  }

  static AllUserInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : AllUserInfo {
    const proto = $.parseStructProto(data, typeTag, repo, AllUserInfo);
    return new AllUserInfo(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, AllUserInfo, typeParams);
    return result as unknown as AllUserInfo;
  }
}

export class BorrowPosition 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "BorrowPosition";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_id", typeTag: AtomicTypeTag.U64 },
  { name: "borrow_amount", typeTag: AtomicTypeTag.U64 }];

  pool_id: U64;
  borrow_amount: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_id = proto['pool_id'] as U64;
    this.borrow_amount = proto['borrow_amount'] as U64;
  }

  static BorrowPositionParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : BorrowPosition {
    const proto = $.parseStructProto(data, typeTag, repo, BorrowPosition);
    return new BorrowPosition(proto, typeTag);
  }

}

export class DepositPosition 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "DepositPosition";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_id", typeTag: AtomicTypeTag.U64 },
  { name: "deposit_amount", typeTag: AtomicTypeTag.U64 }];

  pool_id: U64;
  deposit_amount: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_id = proto['pool_id'] as U64;
    this.deposit_amount = proto['deposit_amount'] as U64;
  }

  static DepositPositionParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : DepositPosition {
    const proto = $.parseStructProto(data, typeTag, repo, DepositPosition);
    return new DepositPosition(proto, typeTag);
  }

}

export class FakeBTC 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "FakeBTC";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static FakeBTCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : FakeBTC {
    const proto = $.parseStructProto(data, typeTag, repo, FakeBTC);
    return new FakeBTC(proto, typeTag);
  }

}

export class FakeETH 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "FakeETH";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static FakeETHParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : FakeETH {
    const proto = $.parseStructProto(data, typeTag, repo, FakeETH);
    return new FakeETH(proto, typeTag);
  }

}

export class FakeUSDC 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "FakeUSDC";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static FakeUSDCParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : FakeUSDC {
    const proto = $.parseStructProto(data, typeTag, repo, FakeUSDC);
    return new FakeUSDC(proto, typeTag);
  }

}

export class FakeUSDT 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "FakeUSDT";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  ];

  constructor(proto: any, public typeTag: TypeTag) {

  }

  static FakeUSDTParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : FakeUSDT {
    const proto = $.parseStructProto(data, typeTag, repo, FakeUSDT);
    return new FakeUSDT(proto, typeTag);
  }

}

export class FreeCoins 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "FreeCoins";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "btc_coin", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeBTC", [])]) },
  { name: "eth_coin", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeETH", [])]) },
  { name: "usdc_coin", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDC", [])]) },
  { name: "usdt_coin", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDT", [])]) },
  { name: "btc_cap", typeTag: new StructTag(new HexString("0x1"), "coin", "MintCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeBTC", [])]) },
  { name: "eth_cap", typeTag: new StructTag(new HexString("0x1"), "coin", "MintCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeETH", [])]) },
  { name: "usdc_cap", typeTag: new StructTag(new HexString("0x1"), "coin", "MintCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDC", [])]) },
  { name: "usdt_cap", typeTag: new StructTag(new HexString("0x1"), "coin", "MintCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDT", [])]) },
  { name: "btc_burn", typeTag: new StructTag(new HexString("0x1"), "coin", "BurnCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeBTC", [])]) },
  { name: "eth_burn", typeTag: new StructTag(new HexString("0x1"), "coin", "BurnCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeETH", [])]) },
  { name: "usdc_burn", typeTag: new StructTag(new HexString("0x1"), "coin", "BurnCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDC", [])]) },
  { name: "usdt_burn", typeTag: new StructTag(new HexString("0x1"), "coin", "BurnCapability", [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDT", [])]) }];

  btc_coin: Aptos_framework.Coin.Coin;
  eth_coin: Aptos_framework.Coin.Coin;
  usdc_coin: Aptos_framework.Coin.Coin;
  usdt_coin: Aptos_framework.Coin.Coin;
  btc_cap: Aptos_framework.Coin.MintCapability;
  eth_cap: Aptos_framework.Coin.MintCapability;
  usdc_cap: Aptos_framework.Coin.MintCapability;
  usdt_cap: Aptos_framework.Coin.MintCapability;
  btc_burn: Aptos_framework.Coin.BurnCapability;
  eth_burn: Aptos_framework.Coin.BurnCapability;
  usdc_burn: Aptos_framework.Coin.BurnCapability;
  usdt_burn: Aptos_framework.Coin.BurnCapability;

  constructor(proto: any, public typeTag: TypeTag) {
    this.btc_coin = proto['btc_coin'] as Aptos_framework.Coin.Coin;
    this.eth_coin = proto['eth_coin'] as Aptos_framework.Coin.Coin;
    this.usdc_coin = proto['usdc_coin'] as Aptos_framework.Coin.Coin;
    this.usdt_coin = proto['usdt_coin'] as Aptos_framework.Coin.Coin;
    this.btc_cap = proto['btc_cap'] as Aptos_framework.Coin.MintCapability;
    this.eth_cap = proto['eth_cap'] as Aptos_framework.Coin.MintCapability;
    this.usdc_cap = proto['usdc_cap'] as Aptos_framework.Coin.MintCapability;
    this.usdt_cap = proto['usdt_cap'] as Aptos_framework.Coin.MintCapability;
    this.btc_burn = proto['btc_burn'] as Aptos_framework.Coin.BurnCapability;
    this.eth_burn = proto['eth_burn'] as Aptos_framework.Coin.BurnCapability;
    this.usdc_burn = proto['usdc_burn'] as Aptos_framework.Coin.BurnCapability;
    this.usdt_burn = proto['usdt_burn'] as Aptos_framework.Coin.BurnCapability;
  }

  static FreeCoinsParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : FreeCoins {
    const proto = $.parseStructProto(data, typeTag, repo, FreeCoins);
    return new FreeCoins(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, FreeCoins, typeParams);
    return result as unknown as FreeCoins;
  }
}

export class LendingPool 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "LendingPool";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "pool_id", typeTag: AtomicTypeTag.U64 },
  { name: "coin_type", typeTag: new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []) },
  { name: "coin_price", typeTag: AtomicTypeTag.U64 },
  { name: "total_deposit", typeTag: AtomicTypeTag.U64 },
  { name: "total_borrow", typeTag: AtomicTypeTag.U64 }];

  pool_id: U64;
  coin_type: Aptos_std.Type_info.TypeInfo;
  coin_price: U64;
  total_deposit: U64;
  total_borrow: U64;

  constructor(proto: any, public typeTag: TypeTag) {
    this.pool_id = proto['pool_id'] as U64;
    this.coin_type = proto['coin_type'] as Aptos_std.Type_info.TypeInfo;
    this.coin_price = proto['coin_price'] as U64;
    this.total_deposit = proto['total_deposit'] as U64;
    this.total_borrow = proto['total_borrow'] as U64;
  }

  static LendingPoolParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : LendingPool {
    const proto = $.parseStructProto(data, typeTag, repo, LendingPool);
    return new LendingPool(proto, typeTag);
  }

}

export class LendingPoolReserve 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "LendingPoolReserve";
  static typeParameters: TypeParamDeclType[] = [
    { name: "CoinType", isPhantom: true }
  ];
  static fields: FieldDeclType[] = [
  { name: "reserve", typeTag: new StructTag(new HexString("0x1"), "coin", "Coin", [new $.TypeParamIdx(0)]) }];

  reserve: Aptos_framework.Coin.Coin;

  constructor(proto: any, public typeTag: TypeTag) {
    this.reserve = proto['reserve'] as Aptos_framework.Coin.Coin;
  }

  static LendingPoolReserveParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : LendingPoolReserve {
    const proto = $.parseStructProto(data, typeTag, repo, LendingPoolReserve);
    return new LendingPoolReserve(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, LendingPoolReserve, typeParams);
    return result as unknown as LendingPoolReserve;
  }
}

export class LendingProtocol 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "LendingProtocol";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "users", typeTag: new VectorTag(AtomicTypeTag.Address) },
  { name: "pools", typeTag: new VectorTag(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPool", [])) },
  { name: "pool_index", typeTag: new StructTag(new HexString("0x1"), "table", "Table", [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), AtomicTypeTag.U64]) }];

  users: HexString[];
  pools: LendingPool[];
  pool_index: Aptos_std.Table.Table;

  constructor(proto: any, public typeTag: TypeTag) {
    this.users = proto['users'] as HexString[];
    this.pools = proto['pools'] as LendingPool[];
    this.pool_index = proto['pool_index'] as Aptos_std.Table.Table;
  }

  static LendingProtocolParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : LendingProtocol {
    const proto = $.parseStructProto(data, typeTag, repo, LendingProtocol);
    return new LendingProtocol(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, LendingProtocol, typeParams);
    return result as unknown as LendingProtocol;
  }
}

export class User 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "User";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "deposits", typeTag: new StructTag(new HexString("0x1"), "iterable_table", "IterableTable", [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "DepositPosition", [])]) },
  { name: "borrows", typeTag: new StructTag(new HexString("0x1"), "iterable_table", "IterableTable", [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "BorrowPosition", [])]) }];

  deposits: Aptos_std.Iterable_table.IterableTable;
  borrows: Aptos_std.Iterable_table.IterableTable;

  constructor(proto: any, public typeTag: TypeTag) {
    this.deposits = proto['deposits'] as Aptos_std.Iterable_table.IterableTable;
    this.borrows = proto['borrows'] as Aptos_std.Iterable_table.IterableTable;
  }

  static UserParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : User {
    const proto = $.parseStructProto(data, typeTag, repo, User);
    return new User(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, User, typeParams);
    return result as unknown as User;
  }

  check_borrow_within_limit(
    protocol: LendingProtocol,
  ) {
    const cache = new DummyCache();
    const tags = (this.typeTag as StructTag).typeParams;
    return check_borrow_within_limit_(this, protocol, cache);
  }

  compute_borrow_deposit_value(
    protocol: LendingProtocol,
  ) {
    const cache = new DummyCache();
    const tags = (this.typeTag as StructTag).typeParams;
    return compute_borrow_deposit_value_(this, protocol, cache);
  }

}

export class UserInfo 
{
  static moduleAddress = moduleAddress;
  static moduleName = moduleName;
  static structName: string = "UserInfo";
  static typeParameters: TypeParamDeclType[] = [

  ];
  static fields: FieldDeclType[] = [
  { name: "address", typeTag: AtomicTypeTag.Address },
  { name: "deposits", typeTag: new VectorTag(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "DepositPosition", [])) },
  { name: "borrows", typeTag: new VectorTag(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "BorrowPosition", [])) },
  { name: "borrow_value", typeTag: AtomicTypeTag.U64 },
  { name: "deposit_value", typeTag: AtomicTypeTag.U64 },
  { name: "is_healthy", typeTag: AtomicTypeTag.Bool }];

  address: HexString;
  deposits: DepositPosition[];
  borrows: BorrowPosition[];
  borrow_value: U64;
  deposit_value: U64;
  is_healthy: boolean;

  constructor(proto: any, public typeTag: TypeTag) {
    this.address = proto['address'] as HexString;
    this.deposits = proto['deposits'] as DepositPosition[];
    this.borrows = proto['borrows'] as BorrowPosition[];
    this.borrow_value = proto['borrow_value'] as U64;
    this.deposit_value = proto['deposit_value'] as U64;
    this.is_healthy = proto['is_healthy'] as boolean;
  }

  static UserInfoParser(data:any, typeTag: TypeTag, repo: AptosParserRepo) : UserInfo {
    const proto = $.parseStructProto(data, typeTag, repo, UserInfo);
    return new UserInfo(proto, typeTag);
  }

  static async load(repo: AptosParserRepo, client: AptosClient, address: HexString, typeParams: TypeTag[]) {
    const result = await repo.loadResource(client, address, UserInfo, typeParams);
    return result as unknown as UserInfo;
  }
}
export function admin_add_pool_ (
  admin: HexString,
  initial_price: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin_type, pool, pool_id, protocol;
  if (!((Std.Signer.address_of_(admin, $c)).hex() === (new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a")).hex())) {
    throw $.abortCode(u64("1000"));
  }
  if (!!$c.exists(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPoolReserve", [$p[0]]), Std.Signer.address_of_(admin, $c))) {
    throw $.abortCode(u64("1001"));
  }
  if (!Aptos_framework.Coin.is_coin_initialized_($c, [$p[0]])) {
    throw $.abortCode(u64("1002"));
  }
  protocol = $c.borrow_global_mut<LendingProtocol>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingProtocol", []), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  pool_id = Std.Vector.length_(protocol.pools, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPool", [])]);
  coin_type = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  pool = new LendingPool({ pool_id: $.copy(pool_id), coin_type: $.copy(coin_type), coin_price: $.copy(initial_price), total_deposit: u64("0"), total_borrow: u64("0") }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPool", []));
  $c.move_to(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPoolReserve", [$p[0]]), admin, new LendingPoolReserve({ reserve: Aptos_framework.Coin.zero_($c, [$p[0]]) }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPoolReserve", [$p[0]])));
  Std.Vector.push_back_(protocol.pools, pool, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPool", [])]);
  return Aptos_std.Table.add_(protocol.pool_index, Aptos_std.Type_info.type_of_($c, [$p[0]]), $.copy(pool_id), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), AtomicTypeTag.U64]);
}


export function buildPayload_admin_add_pool (
  initial_price: U64,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::admin_add_pool",
    typeParamStrings,
    [
      $.payloadArg(initial_price),
    ]
  );

}

export function admin_init_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  if (!((Std.Signer.address_of_(admin, $c)).hex() === (new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a")).hex())) {
    throw $.abortCode(u64("1000"));
  }
  return $c.move_to(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingProtocol", []), admin, new LendingProtocol({ users: Std.Vector.empty_($c, [AtomicTypeTag.Address]), pools: Std.Vector.empty_($c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPool", [])]), pool_index: Aptos_std.Table.new___($c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), AtomicTypeTag.U64]) }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingProtocol", [])));
}


export function buildPayload_admin_init (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::admin_init",
    typeParamStrings,
    []
  );

}

export function admin_update_price_ (
  admin: HexString,
  price: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin_type, pool, pool_id, protocol;
  if (!((Std.Signer.address_of_(admin, $c)).hex() === (new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a")).hex())) {
    throw $.abortCode(u64("1000"));
  }
  protocol = $c.borrow_global_mut<LendingProtocol>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingProtocol", []), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  coin_type = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  pool_id = $.copy(Aptos_std.Table.borrow_(protocol.pool_index, $.copy(coin_type), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), AtomicTypeTag.U64]));
  pool = Std.Vector.borrow_mut_(protocol.pools, $.copy(pool_id), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPool", [])]);
  pool.coin_price = $.copy(price);
  return;
}


export function buildPayload_admin_update_price (
  price: U64,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::admin_update_price",
    typeParamStrings,
    [
      $.payloadArg(price),
    ]
  );

}

export function borrow_ (
  user: HexString,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let temp$1, temp$2, coin, coin_type, pool, pool_id, protocol, reserve, user_assets;
  protocol = $c.borrow_global_mut<LendingProtocol>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingProtocol", []), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  ensure_user_exists_(user, protocol, $c);
  coin_type = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  pool_id = $.copy(Aptos_std.Table.borrow_(protocol.pool_index, $.copy(coin_type), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), AtomicTypeTag.U64]));
  pool = Std.Vector.borrow_mut_(protocol.pools, $.copy(pool_id), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPool", [])]);
  reserve = $c.borrow_global_mut<LendingPoolReserve>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPoolReserve", [$p[0]]), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  user_assets = $c.borrow_global_mut<User>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "User", []), Std.Signer.address_of_(user, $c));
  coin = make_borrow_(user_assets, pool, $.copy(amount), reserve, $c, [$p[0]]);
  if (!Aptos_framework.Coin.is_account_registered_(Std.Signer.address_of_(user, $c), $c, [$p[0]])) {
    Aptos_framework.Coins.register_internal_(user, $c, [$p[0]]);
  }
  else{
  }
  Aptos_framework.Coin.deposit_(Std.Signer.address_of_(user, $c), coin, $c, [$p[0]]);
  [temp$1, temp$2] = [user_assets, protocol];
  if (!check_borrow_within_limit_(temp$1, temp$2, $c)) {
    throw $.abortCode(u64("4000"));
  }
  return;
}


export function buildPayload_borrow (
  amount: U64,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::borrow",
    typeParamStrings,
    [
      $.payloadArg(amount),
    ]
  );

}

export function check_borrow_within_limit_ (
  user: User,
  protocol: LendingProtocol,
  $c: AptosDataCache,
): boolean {
  let borrow_value, deposit_value;
  [borrow_value, deposit_value] = compute_borrow_deposit_value_(user, protocol, $c);
  return (($.copy(borrow_value)).mul(u64("100"))).lt(($.copy(deposit_value)).mul(u64("90")));
}

export function compute_borrow_deposit_value_ (
  user: User,
  protocol: LendingProtocol,
  $c: AptosDataCache,
): [U64, U64] {
  let borrow_tail, borrow_value, deposit_tail, deposit_value, pool, pool__4, pool_id, pool_id__1, position, position__2, prev, prev__3, value, value__5;
  deposit_value = u64("0");
  deposit_tail = Aptos_std.Iterable_table.tail_key_(user.deposits, $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "DepositPosition", [])]);
  while (Std.Option.is_some_(deposit_tail, $c, [AtomicTypeTag.U64])) {
    {
      pool_id = $.copy(Std.Option.borrow_(deposit_tail, $c, [AtomicTypeTag.U64]));
      [position, prev, ] = Aptos_std.Iterable_table.borrow_iter_(user.deposits, $.copy(pool_id), $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "DepositPosition", [])]);
      pool = Std.Vector.borrow_(protocol.pools, $.copy(pool_id), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPool", [])]);
      value = ($.copy(position.deposit_amount)).mul($.copy(pool.coin_price));
      deposit_value = ($.copy(deposit_value)).add($.copy(value));
      deposit_tail = $.copy(prev);
    }

  }borrow_value = u64("0");
  borrow_tail = Aptos_std.Iterable_table.tail_key_(user.borrows, $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "BorrowPosition", [])]);
  while (Std.Option.is_some_(borrow_tail, $c, [AtomicTypeTag.U64])) {
    {
      pool_id__1 = $.copy(Std.Option.borrow_(borrow_tail, $c, [AtomicTypeTag.U64]));
      [position__2, prev__3, ] = Aptos_std.Iterable_table.borrow_iter_(user.borrows, $.copy(pool_id__1), $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "BorrowPosition", [])]);
      pool__4 = Std.Vector.borrow_(protocol.pools, $.copy(pool_id__1), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPool", [])]);
      value__5 = ($.copy(position__2.borrow_amount)).mul($.copy(pool__4.coin_price));
      borrow_value = ($.copy(borrow_value)).add($.copy(value__5));
      borrow_tail = $.copy(prev__3);
    }

  }return [$.copy(borrow_value), $.copy(deposit_value)];
}

export function create_fake_user1_ (
  user: HexString,
  $c: AptosDataCache,
): void {
  init_coin_stores_(user, $c);
  deposit_(user, u64("10000000"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeBTC", [])]);
  deposit_(user, u64("10000000"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeETH", [])]);
  deposit_(user, u64("10000000"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDC", [])]);
  deposit_(user, u64("10000000"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDT", [])]);
  return;
}


export function buildPayload_create_fake_user1 (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::create_fake_user1",
    typeParamStrings,
    []
  );

}

export function create_fake_user2_ (
  user: HexString,
  $c: AptosDataCache,
): void {
  init_coin_stores_(user, $c);
  deposit_(user, u64("100"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeBTC", [])]);
  deposit_(user, u64("100"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeETH", [])]);
  borrow_(user, u64("100"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDC", [])]);
  return;
}


export function buildPayload_create_fake_user2 (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::create_fake_user2",
    typeParamStrings,
    []
  );

}

export function create_fake_user3_ (
  user: HexString,
  $c: AptosDataCache,
): void {
  init_coin_stores_(user, $c);
  deposit_(user, u64("100"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeBTC", [])]);
  deposit_(user, u64("100"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeETH", [])]);
  borrow_(user, u64("800000"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDC", [])]);
  return;
}


export function buildPayload_create_fake_user3 (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::create_fake_user3",
    typeParamStrings,
    []
  );

}

export function deposit_ (
  user: HexString,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin, coin_type, pool, pool_id, protocol, reserve, user_assets;
  protocol = $c.borrow_global_mut<LendingProtocol>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingProtocol", []), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  ensure_user_exists_(user, protocol, $c);
  coin_type = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  pool_id = $.copy(Aptos_std.Table.borrow_(protocol.pool_index, $.copy(coin_type), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), AtomicTypeTag.U64]));
  pool = Std.Vector.borrow_mut_(protocol.pools, $.copy(pool_id), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPool", [])]);
  reserve = $c.borrow_global_mut<LendingPoolReserve>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPoolReserve", [$p[0]]), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  user_assets = $c.borrow_global_mut<User>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "User", []), Std.Signer.address_of_(user, $c));
  coin = Aptos_framework.Coin.withdraw_(user, $.copy(amount), $c, [$p[0]]);
  make_deposit_(user_assets, pool, coin, reserve, $c, [$p[0]]);
  return;
}


export function buildPayload_deposit (
  amount: U64,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::deposit",
    typeParamStrings,
    [
      $.payloadArg(amount),
    ]
  );

}

export function ensure_user_exists_ (
  user: HexString,
  protocol: LendingProtocol,
  $c: AptosDataCache,
): void {
  if (!$c.exists(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "User", []), Std.Signer.address_of_(user, $c))) {
    Std.Vector.push_back_(protocol.users, Std.Signer.address_of_(user, $c), $c, [AtomicTypeTag.Address]);
    $c.move_to(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "User", []), user, new User({ deposits: Aptos_std.Iterable_table.new___($c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "DepositPosition", [])]), borrows: Aptos_std.Iterable_table.new___($c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "BorrowPosition", [])]) }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "User", [])));
  }
  else{
  }
  return;
}

export function get_all_users_ (
  initiator: HexString,
  $c: AptosDataCache,
): void {
  let borrow_value, deposit_value, i, is_healthy, len, list, protocol, user, user_addr, user_info;
  protocol = $c.borrow_global<LendingProtocol>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingProtocol", []), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  i = u64("0");
  len = Std.Vector.length_(protocol.users, $c, [AtomicTypeTag.Address]);
  list = new AllUserInfo({ healthy_users: Std.Vector.empty_($c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "UserInfo", [])]), unhealthy_users: Std.Vector.empty_($c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "UserInfo", [])]) }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "AllUserInfo", []));
  while (($.copy(i)).lt($.copy(len))) {
    {
      user_addr = Std.Vector.borrow_(protocol.users, $.copy(i), $c, [AtomicTypeTag.Address]);
      user = $c.borrow_global<User>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "User", []), $.copy(user_addr));
      [is_healthy, borrow_value, deposit_value] = user_get_limits_(user, protocol, $c);
      user_info = new UserInfo({ address: $.copy(user_addr), deposits: get_values_(user.deposits, $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "DepositPosition", [])]), borrows: get_values_(user.borrows, $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "BorrowPosition", [])]), borrow_value: $.copy(borrow_value), deposit_value: $.copy(deposit_value), is_healthy: is_healthy }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "UserInfo", []));
      if (is_healthy) {
        Std.Vector.push_back_(list.healthy_users, user_info, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "UserInfo", [])]);
      }
      else{
        Std.Vector.push_back_(list.unhealthy_users, user_info, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "UserInfo", [])]);
      }
      i = ($.copy(i)).add(u64("1"));
    }

  }return $c.move_to(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "AllUserInfo", []), initiator, list);
}


export function buildPayload_get_all_users (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::get_all_users",
    typeParamStrings,
    []
  );

}

export async function query_get_all_users(
  client: AptosClient,
  account: AptosAccount,
  repo: AptosParserRepo,
  $p: TypeTag[],
) {
  const payload = buildPayload_get_all_users();
  const outputTypeTag = new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "AllUserInfo", []);
  const output = await $.simulatePayloadTx(client, account, payload);
  return $.takeSimulationValue<AllUserInfo>(output, outputTypeTag, repo)
}
export function get_values_ (
  table: Aptos_std.Iterable_table.IterableTable,
  $c: AptosDataCache,
  $p: TypeTag[], /* <K, V>*/
): any[] {
  let key, list, prev, tail, value;
  list = Std.Vector.empty_($c, [$p[1]]);
  tail = Aptos_std.Iterable_table.tail_key_(table, $c, [$p[0], $p[1]]);
  while (Std.Option.is_some_(tail, $c, [$p[0]])) {
    {
      key = $.copy(Std.Option.borrow_(tail, $c, [$p[0]]));
      [value, prev, ] = Aptos_std.Iterable_table.borrow_iter_(table, $.copy(key), $c, [$p[0], $p[1]]);
      Std.Vector.push_back_(list, $.copy(value), $c, [$p[1]]);
      tail = $.copy(prev);
    }

  }return $.copy(list);
}

export function init_coin_stores_ (
  user: HexString,
  $c: AptosDataCache,
): void {
  let addr, btc, eth, faucet_amount, free_coins, usdc, usdt;
  Aptos_framework.Coins.register_internal_(user, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeBTC", [])]);
  Aptos_framework.Coins.register_internal_(user, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeETH", [])]);
  Aptos_framework.Coins.register_internal_(user, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDC", [])]);
  Aptos_framework.Coins.register_internal_(user, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDT", [])]);
  faucet_amount = u64("1000000000");
  free_coins = $c.borrow_global_mut<FreeCoins>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FreeCoins", []), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  btc = Aptos_framework.Coin.extract_(free_coins.btc_coin, $.copy(faucet_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeBTC", [])]);
  eth = Aptos_framework.Coin.extract_(free_coins.eth_coin, $.copy(faucet_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeETH", [])]);
  usdc = Aptos_framework.Coin.extract_(free_coins.usdc_coin, $.copy(faucet_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDC", [])]);
  usdt = Aptos_framework.Coin.extract_(free_coins.usdt_coin, $.copy(faucet_amount), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDT", [])]);
  addr = Std.Signer.address_of_(user, $c);
  Aptos_framework.Coin.deposit_($.copy(addr), btc, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeBTC", [])]);
  Aptos_framework.Coin.deposit_($.copy(addr), eth, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeETH", [])]);
  Aptos_framework.Coin.deposit_($.copy(addr), usdc, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDC", [])]);
  Aptos_framework.Coin.deposit_($.copy(addr), usdt, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDT", [])]);
  return;
}

export function init_fake_pools_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  let btc_burn, btc_cap, eth_burn, eth_cap, mint_amount, name, usdc_burn, usdc_cap, usdt_burn, usdt_cap;
  name = Std.String.utf8_([u8("110"), u8("97"), u8("109"), u8("101")], $c);
  [btc_cap, btc_burn] = Aptos_framework.Coin.initialize_(admin, $.copy(name), $.copy(name), u64("0"), false, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeBTC", [])]);
  [eth_cap, eth_burn] = Aptos_framework.Coin.initialize_(admin, $.copy(name), $.copy(name), u64("0"), false, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeETH", [])]);
  [usdc_cap, usdc_burn] = Aptos_framework.Coin.initialize_(admin, $.copy(name), $.copy(name), u64("0"), false, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDC", [])]);
  [usdt_cap, usdt_burn] = Aptos_framework.Coin.initialize_(admin, $.copy(name), $.copy(name), u64("0"), false, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDT", [])]);
  mint_amount = u64("1000000000000");
  $c.move_to(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FreeCoins", []), admin, new FreeCoins({ btc_coin: Aptos_framework.Coin.mint_($.copy(mint_amount), btc_cap, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeBTC", [])]), eth_coin: Aptos_framework.Coin.mint_($.copy(mint_amount), eth_cap, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeETH", [])]), usdc_coin: Aptos_framework.Coin.mint_($.copy(mint_amount), usdc_cap, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDC", [])]), usdt_coin: Aptos_framework.Coin.mint_($.copy(mint_amount), usdt_cap, $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDT", [])]), btc_cap: $.copy(btc_cap), eth_cap: $.copy(eth_cap), usdc_cap: $.copy(usdc_cap), usdt_cap: $.copy(usdt_cap), btc_burn: $.copy(btc_burn), eth_burn: $.copy(eth_burn), usdc_burn: $.copy(usdc_burn), usdt_burn: $.copy(usdt_burn) }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FreeCoins", [])));
  admin_init_(admin, $c);
  admin_add_pool_(admin, u64("10000"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeBTC", [])]);
  admin_add_pool_(admin, u64("1000"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeETH", [])]);
  admin_add_pool_(admin, u64("1"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDC", [])]);
  admin_add_pool_(admin, u64("1"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeUSDT", [])]);
  return;
}


export function buildPayload_init_fake_pools (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::init_fake_pools",
    typeParamStrings,
    []
  );

}

export function make_borrow_ (
  user: User,
  pool: LendingPool,
  amount: U64,
  reserve: LendingPoolReserve,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): Aptos_framework.Coin.Coin {
  let coin, pool_id, position;
  coin = Aptos_framework.Coin.extract_(reserve.reserve, $.copy(amount), $c, [$p[0]]);
  if (!$.deep_eq($.copy(pool.coin_type), Aptos_std.Type_info.type_of_($c, [$p[0]]))) {
    throw $.abortCode(u64("2001"));
  }
  pool_id = $.copy(pool.pool_id);
  pool.total_borrow = ($.copy(pool.total_borrow)).add($.copy(amount));
  if (!Aptos_std.Iterable_table.contains_(user.borrows, $.copy(pool_id), $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "BorrowPosition", [])])) {
    Aptos_std.Iterable_table.add_(user.borrows, $.copy(pool_id), new BorrowPosition({ pool_id: $.copy(pool_id), borrow_amount: $.copy(amount) }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "BorrowPosition", [])), $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "BorrowPosition", [])]);
  }
  else{
    position = Aptos_std.Iterable_table.borrow_mut_(user.borrows, $.copy(pool_id), $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "BorrowPosition", [])]);
    position.borrow_amount = ($.copy(position.borrow_amount)).add($.copy(amount));
  }
  return coin;
}

export function make_deposit_ (
  user: User,
  pool: LendingPool,
  coin: Aptos_framework.Coin.Coin,
  reserve: LendingPoolReserve,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let amount, pool_id, position;
  amount = Aptos_framework.Coin.value_(coin, $c, [$p[0]]);
  Aptos_framework.Coin.merge_(reserve.reserve, coin, $c, [$p[0]]);
  if (!$.deep_eq($.copy(pool.coin_type), Aptos_std.Type_info.type_of_($c, [$p[0]]))) {
    throw $.abortCode(u64("2001"));
  }
  pool_id = $.copy(pool.pool_id);
  pool.total_deposit = ($.copy(pool.total_deposit)).add($.copy(amount));
  if (!Aptos_std.Iterable_table.contains_(user.deposits, $.copy(pool_id), $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "DepositPosition", [])])) {
    Aptos_std.Iterable_table.add_(user.deposits, $.copy(pool_id), new DepositPosition({ pool_id: $.copy(pool_id), deposit_amount: $.copy(amount) }, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "DepositPosition", [])), $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "DepositPosition", [])]);
  }
  else{
    position = Aptos_std.Iterable_table.borrow_mut_(user.deposits, $.copy(pool_id), $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "DepositPosition", [])]);
    position.deposit_amount = ($.copy(position.deposit_amount)).add($.copy(amount));
  }
  return;
}

export function make_repayment_ (
  user: User,
  pool: LendingPool,
  coin: Aptos_framework.Coin.Coin,
  reserve: LendingPoolReserve,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let amount, pool_id, position;
  amount = Aptos_framework.Coin.value_(coin, $c, [$p[0]]);
  Aptos_framework.Coin.merge_(reserve.reserve, coin, $c, [$p[0]]);
  if (!$.deep_eq($.copy(pool.coin_type), Aptos_std.Type_info.type_of_($c, [$p[0]]))) {
    throw $.abortCode(u64("2001"));
  }
  pool_id = $.copy(pool.pool_id);
  pool.total_borrow = ($.copy(pool.total_borrow)).sub($.copy(amount));
  position = Aptos_std.Iterable_table.borrow_mut_(user.borrows, $.copy(pool_id), $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "BorrowPosition", [])]);
  position.borrow_amount = ($.copy(position.borrow_amount)).sub($.copy(amount));
  return;
}

export function make_withdrawal_ (
  user: User,
  pool: LendingPool,
  amount: U64,
  reserve: LendingPoolReserve,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): Aptos_framework.Coin.Coin {
  let coin, pool_id, position;
  coin = Aptos_framework.Coin.extract_(reserve.reserve, $.copy(amount), $c, [$p[0]]);
  if (!$.deep_eq($.copy(pool.coin_type), Aptos_std.Type_info.type_of_($c, [$p[0]]))) {
    throw $.abortCode(u64("2001"));
  }
  pool_id = $.copy(pool.pool_id);
  pool.total_deposit = ($.copy(pool.total_deposit)).sub($.copy(amount));
  position = Aptos_std.Iterable_table.borrow_mut_(user.deposits, $.copy(pool_id), $c, [AtomicTypeTag.U64, new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "DepositPosition", [])]);
  position.deposit_amount = ($.copy(position.deposit_amount)).sub($.copy(amount));
  return coin;
}

export function price_drop_ (
  admin: HexString,
  $c: AptosDataCache,
): void {
  admin_init_(admin, $c);
  admin_update_price_(admin, u64("5000"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeBTC", [])]);
  admin_update_price_(admin, u64("500"), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "FakeETH", [])]);
  return;
}


export function buildPayload_price_drop (
) {
  const typeParamStrings = [] as string[];
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::price_drop",
    typeParamStrings,
    []
  );

}

export function repay_ (
  user: HexString,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let coin, coin_type, pool, pool_id, protocol, reserve, user_assets;
  protocol = $c.borrow_global_mut<LendingProtocol>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingProtocol", []), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  ensure_user_exists_(user, protocol, $c);
  coin_type = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  pool_id = $.copy(Aptos_std.Table.borrow_(protocol.pool_index, $.copy(coin_type), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), AtomicTypeTag.U64]));
  pool = Std.Vector.borrow_mut_(protocol.pools, $.copy(pool_id), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPool", [])]);
  reserve = $c.borrow_global_mut<LendingPoolReserve>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPoolReserve", [$p[0]]), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  user_assets = $c.borrow_global_mut<User>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "User", []), Std.Signer.address_of_(user, $c));
  coin = Aptos_framework.Coin.withdraw_(user, $.copy(amount), $c, [$p[0]]);
  make_repayment_(user_assets, pool, coin, reserve, $c, [$p[0]]);
  return;
}


export function buildPayload_repay (
  amount: U64,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::repay",
    typeParamStrings,
    [
      $.payloadArg(amount),
    ]
  );

}

export function user_get_limits_ (
  user: User,
  protocol: LendingProtocol,
  $c: AptosDataCache,
): [boolean, U64, U64] {
  let borrow_value, deposit_value;
  [borrow_value, deposit_value] = compute_borrow_deposit_value_(user, protocol, $c);
  return [(($.copy(borrow_value)).mul(u64("100"))).lt(($.copy(deposit_value)).mul(u64("90"))), $.copy(borrow_value), $.copy(deposit_value)];
}

export function withdraw_ (
  user: HexString,
  amount: U64,
  $c: AptosDataCache,
  $p: TypeTag[], /* <CoinType>*/
): void {
  let temp$1, temp$2, coin, coin_type, pool, pool_id, protocol, reserve, user_assets;
  protocol = $c.borrow_global_mut<LendingProtocol>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingProtocol", []), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  ensure_user_exists_(user, protocol, $c);
  coin_type = Aptos_std.Type_info.type_of_($c, [$p[0]]);
  pool_id = $.copy(Aptos_std.Table.borrow_(protocol.pool_index, $.copy(coin_type), $c, [new StructTag(new HexString("0x1"), "type_info", "TypeInfo", []), AtomicTypeTag.U64]));
  pool = Std.Vector.borrow_mut_(protocol.pools, $.copy(pool_id), $c, [new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPool", [])]);
  reserve = $c.borrow_global_mut<LendingPoolReserve>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "LendingPoolReserve", [$p[0]]), new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"));
  user_assets = $c.borrow_global_mut<User>(new StructTag(new HexString("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a"), "lend", "User", []), Std.Signer.address_of_(user, $c));
  coin = make_withdrawal_(user_assets, pool, $.copy(amount), reserve, $c, [$p[0]]);
  if (!Aptos_framework.Coin.is_account_registered_(Std.Signer.address_of_(user, $c), $c, [$p[0]])) {
    Aptos_framework.Coins.register_internal_(user, $c, [$p[0]]);
  }
  else{
  }
  Aptos_framework.Coin.deposit_(Std.Signer.address_of_(user, $c), coin, $c, [$p[0]]);
  [temp$1, temp$2] = [user_assets, protocol];
  if (!check_borrow_within_limit_(temp$1, temp$2, $c)) {
    throw $.abortCode(u64("4000"));
  }
  return;
}


export function buildPayload_withdraw (
  amount: U64,
  $p: TypeTag[], /* <CoinType>*/
) {
  const typeParamStrings = $p.map(t=>$.getTypeTagFullname(t));
  return $.buildPayload(
    "0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::withdraw",
    typeParamStrings,
    [
      $.payloadArg(amount),
    ]
  );

}

export function loadParsers(repo: AptosParserRepo) {
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::AllUserInfo", AllUserInfo.AllUserInfoParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::BorrowPosition", BorrowPosition.BorrowPositionParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::DepositPosition", DepositPosition.DepositPositionParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::FakeBTC", FakeBTC.FakeBTCParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::FakeETH", FakeETH.FakeETHParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::FakeUSDC", FakeUSDC.FakeUSDCParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::FakeUSDT", FakeUSDT.FakeUSDTParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::FreeCoins", FreeCoins.FreeCoinsParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::LendingPool", LendingPool.LendingPoolParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::LendingPoolReserve", LendingPoolReserve.LendingPoolReserveParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::LendingProtocol", LendingProtocol.LendingProtocolParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::User", User.UserParser);
  repo.addParser("0xa61e1e86e9f596e483283727d2739ba24b919012720648c29380f9cd0a96c11a::lend::UserInfo", UserInfo.UserInfoParser);
}

