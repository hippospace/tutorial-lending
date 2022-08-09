import * as $ from "@manahippo/move-to-ts";
import {AptosDataCache, AptosParserRepo, DummyCache} from "@manahippo/move-to-ts";
import {U8, U64, U128} from "@manahippo/move-to-ts";
import {u8, u64, u128} from "@manahippo/move-to-ts";
import {TypeParamDeclType, FieldDeclType} from "@manahippo/move-to-ts";
import {AtomicTypeTag, StructTag, TypeTag, VectorTag} from "@manahippo/move-to-ts";
import {HexString, AptosClient, AptosAccount} from "aptos";
export const packageName = "MoveStdlib";
export const moduleAddress = new HexString("0x1");
export const moduleName = "unit_test";


export function create_signers_for_testing_ (
  num_signers: U64,
  $c: AptosDataCache,
): HexString[] {
  return $.std_unit_test_create_signers_for_testing(num_signers, $c);

}
export function unit_test_poison_ (
  $c: AptosDataCache,
): void {
  create_signers_for_testing_(u64("0"), $c);
  return;
}

export function loadParsers(repo: AptosParserRepo) {
}

