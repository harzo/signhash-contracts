declare module 'signhash' {
  import { BigNumber } from 'bignumber.js';
  import {
    AnyContract,
    Contract,
    ContractBase,
    Deployer,
    TransactionOptions,
    TransactionResult,
    TruffleArtifacts
  } from 'truffle';
  import { AnyNumber } from 'web3';

  namespace signhash {
    interface SignHash extends ContractBase {
      sign(
        hash: string,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      revoke(
        hash: string,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      list(hash: string, maxCount: number): Promise<Address[]>;
    }

    interface SignedEvent {
      hash: string;
      signer: Address;
    }

    interface RevokedEvent {
      hash: string;
      signer: Address;
    }

    interface SignProof extends ContractBase {
      add(
        method: string,
        value: string,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      remove(
        method: string,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      get(signer: Address, method: string): Promise<string>;
    }

    interface AddedEvent {
      signer: Address;
      method: string;
      value: string;
    }

    interface RemovedEvent {
      signer: Address;
      method: string;
    }

    interface Migrations extends ContractBase {
      setCompleted(
        completed: number,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      upgrade(
        address: Address,
        options?: TransactionOptions
      ): Promise<TransactionResult>;
    }

    interface MultiSig extends ContractBase {
      nonce(): Promise<BigNumber>;

      owners(index: number): Promise<Address>;
      listOwners(): Promise<Address[]>;

      execute(
        v: number[],
        r: string[],
        s: string[],
        to: Address,
        value: AnyNumber,
        data: string,
        options?: TransactionOptions
      ): Promise<TransactionResult>;
    }

    interface DepositedEvent {
      from: Address;
      value: BigNumber;
    }

    interface ExecutedEvent {
      destination: Address;
      nonce: BigNumber;
      value: BigNumber;
      data: string;
    }

    interface TransferableMultiSig extends MultiSig {
      transferOwnership(
        v: number[],
        r: string[],
        s: string[],
        newOwners: Address[],
        options?: TransactionOptions
      ): Promise<TransactionResult>;
    }

    interface RecoverableMultiSig extends MultiSig {
      recoveryBlockOffset(): Promise<BigNumber>;
      recoveryBlock(): Promise<BigNumber>;
      recoveryHash(): Promise<string>;

      startRecovery(
        newOwners: Address[],
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      cancelRecovery(options?: TransactionOptions): Promise<TransactionResult>;

      confirmRecovery(
        newOwners: Address[],
        options?: TransactionOptions
      ): Promise<TransactionResult>;
    }

    interface RecoveryStartedEvent {
      from: Address;
      newOwners: Address[];
    }

    interface RecoveryCancelledEvent {
      from: Address;
    }

    interface RecoveryConfirmedEvent {
      from: Address;
      newOwners: Address[];
    }

    interface TipsWallet extends TransferableMultiSig, RecoverableMultiSig {}

    interface MigrationsContract extends Contract<Migrations> {
      'new'(options?: TransactionOptions): Promise<Migrations>;
    }

    interface AddressSetLibrary extends ContractBase {
      'new'(options?: TransactionOptions): Promise<ContractBase>;
    }

    interface SignHashContract extends Contract<SignHash> {
      'new'(options?: TransactionOptions): Promise<SignHash>;
    }

    interface SignProofContract extends Contract<SignProof> {
      'new'(options?: TransactionOptions): Promise<SignProof>;
    }

    interface TipsWalletContract extends Contract<TipsWallet> {
      'new'(
        owners: Address[],
        recoveryBlockOffset: AnyNumber,
        options?: TransactionOptions
      ): Promise<TipsWallet>;
    }

    interface SignHashArtifacts extends TruffleArtifacts {
      require(name: string): AnyContract;
      require(name: './Migrations.sol'): MigrationsContract;
      require(name: './AddressSet.sol'): AddressSetLibrary;
      require(name: './SignHash.sol'): SignHashContract;
      require(name: './TipsWallet.sol'): TipsWalletContract;
    }

    interface SignHashDeployer extends Deployer {
      deploy(contract: SignHashContract): Promise<void>;
      deploy(
        contract: TipsWalletContract,
        owners: Address[],
        recoveryBlockOffset: AnyNumber
      ): Promise<void>;
    }

    interface ERC20 extends ContractBase {
      totalSupply(): Promise<BigNumber>;

      balanceOf(who: Address): Promise<BigNumber>;
      allowance(owner: Address, spender: Address): Promise<BigNumber>;

      transfer(to: Address, value: BigNumber): Promise<TransactionResult>;
      transferFrom(
        from: Address,
        to: Address,
        value: AnyNumber
      ): Promise<TransactionResult>;
      approve(spender: Address, value: AnyNumber): Promise<TransactionResult>;
    }
  }

  export = signhash;
}
