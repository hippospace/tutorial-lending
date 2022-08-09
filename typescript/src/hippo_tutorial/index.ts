
import { AptosParserRepo } from "@manahippo/move-to-ts";
import * as Lend2 from './lend2';

export * as Lend2 from './lend2';


export function loadParsers(repo: AptosParserRepo) {
  Lend2.loadParsers(repo);
}

export function getPackageRepo(): AptosParserRepo {
  const repo = new AptosParserRepo();
  loadParsers(repo);
  repo.addDefaultParsers();
  return repo;
}
