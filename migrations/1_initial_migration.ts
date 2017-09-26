const Migrations = artifacts.require('./Migrations.sol');

async function deploy(deployer: IDeployer): Promise<void> {
  await deployer.deploy(Migrations);
}

function migrate(deployer: IDeployer) {
  deployer.then(() => deploy(deployer));
}

export = migrate;
