declare interface ContractContextDefinition extends Mocha.IContextDefinition {
  (description: string, callback: (accounts: Address[]) => void): Mocha.ISuite;
}

declare interface ContractBase {
  address: Address;
}

declare interface Contract<T> extends ContractBase {
  deployed(): Promise<T>;
}

declare interface TruffleArtifacts {
  require(name: string): ContractBase;
}

declare type TransactionOptions = {
  from?: Address;
  gas?: number;
  gasPrice?: number;
};

declare type TransactionReceipt = {
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  blockNumber: number;
  gasUsed: number;
  cumulativeGasUsed: number;
  contractAddress: Address | null;
  logs: [TransactionLog];
};

declare type TransactionLog = {
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  address: Address;
  type: string;
  event: string;
  args: any;
};

declare type TransactionResult = {
  tx: string;
  receipt: TransactionReceipt;
  logs: [TransactionLog];
};

declare module 'truffle-config' {
  import { BigNumber } from 'bignumber.js';
  import { Provider } from 'web3';
  import * as Artifactor from 'truffle-artifactor';
  import * as Resolver from 'truffle-resolver';

  type Options = {
    contracts_build_directory?: string;
    contracts_directory?: string;
    debug?: boolean;
    deterministic?: boolean;
    gasLimit?: number;
    gasPrice?: number | string | BigNumber;
    hostname?: string;
    logger?: { log: (...args: any[]) => void };
    mem?: boolean;
    migrations_directory?: string;
    mnemonic?: string;
    network?: string;
    networkId?: number;
    port?: number;
    reset?: boolean;
    secure?: boolean;
    seed?: string;
    working_directory?: string;
  };

  class Config {
    artifactor: Artifactor;
    contracts_build_directory: string;
    contracts_directory: string;
    migrations_directory: string;
    network: string;
    networks: { [network: string]: Network };
    port: number;
    provider: Provider;
    resolver: Resolver;
    working_directory: string;
  }

  type Network = {
    network_id: string;
    from: Address;
  };

  namespace Config {
    function detect(config: Options, filename?: string): Config;
  }

  export = Config;
}

declare module 'truffle-compile' {
  import * as Config from 'truffle-config';

  namespace Compile {
    type ContractDefinition = {
      contract_name: string;
      sourcePath: string;
      source: string;
      bytecode: string;
      deployedBytecode: string;
    };

    type ContractDefinitions = { [name: string]: ContractDefinition };

    function all(config: Config, callback: Callback<ContractDefinitions>): void;
  }

  export = Compile;
}

declare module 'truffle-resolver' {
  import * as Config from 'truffle-config';

  // noinspection JSUnusedGlobalSymbols
  class Resolver {
    public constructor(config: Config);
  }

  namespace Resolver {

  }

  export = Resolver;
}

declare module 'truffle-artifactor' {
  import { ContractDefinitions } from 'truffle-compile';

  // noinspection JSUnusedGlobalSymbols
  class Artifactor {
    public constructor(contractsBuildDirectory: string);

    saveAll(contracts: ContractDefinitions): Promise<void>;
  }

  namespace Artifactor {

  }

  export = Artifactor;
}

declare module 'truffle-migrate' {
  import * as Config from 'truffle-config';

  function run(config: Config, cb: Callback<any>): Config;
}

declare interface Deployer extends Promise<void> {
  deploy(object: ContractBase): Promise<void>;

  link(
    library: ContractBase,
    contracts: ContractBase | [ContractBase]
  ): Promise<void>;
}