const { calculateFee, GasPrice } = require("@cosmjs/stargate");
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { SigningCosmWasmClient, CosmWasmClient } = require("@cosmjs/cosmwasm-stargate");
const _ = require("fs");

const rpcEndpoint = "https://devnet-explorer-rpc.humans.zone/";

const sender = {
  mnemonic: "sound prevent lock blame review horn junk cupboard enrich south warfare visit",
  address: "human17zwfyu9z7p6ks7dw4032umr3wwgxz35gsuf3ak",
};


const user = {
  mnemonic: "weird butter crystal wasp perfect pizza economy goose crane sail fork kind",
  address: "human15g8ll4n3sksjnf8yvtzz84nv0stx7arawtukft"
}



const uploadRSAContract = async () => {
  const escrowWasmPath = "./RSA_VERIFY.wasm";
  const gasPrice = GasPrice.fromString("0.05uheart");

  // Upload contract
  const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "human" });
  const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
  const wasm = await _.readFileSync(escrowWasmPath);
  const uploadFee = await calculateFee(4_000_0000, gasPrice);
  const uploadVault = await sender_client.upload(sender.address, wasm, uploadFee, "Upload hackatom contract");
  console.log("Upload succeeded. Receipt:", uploadVault);
  return uploadVault.codeId;
}



const InstantiateContract = async (codeId) => {
  const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "human" });
  const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
  console.log("come in this function");
  const gasPrice = GasPrice.fromString("0.05uheart");
  const instantiateFee = calculateFee(700_000, gasPrice);

  console.log(typeof ("0xB793F2F926170FAD768F8B1A5769A2243B4CDCAC4780194F59B39E1A2ABC3BB8EA42DB495D17BEC7F7072A11ED4FA510E75A7886A5DB6F71B7AFCA0090CA079889D18AF0669829ED29A8E21D0C09BD19CAAF2FE2CC8121BFC5687AC6698E3022F468A481426486CAD263BE1A119491E034A6E1AB78F19C066D4145A50F9ECFF7"))

  const msg = {
    admin: sender.address,
    denom: "uheart",
    pubkey: {
      n: "0xB793F2F926170FAD768F8B1A5769A2243B4CDCAC4780194F59B39E1A2ABC3BB8EA42DB495D17BEC7F7072A11ED4FA510E75A7886A5DB6F71B7AFCA0090CA079889D18AF0669829ED29A8E21D0C09BD19CAAF2FE2CC8121BFC5687AC6698E3022F468A481426486CAD263BE1A119491E034A6E1AB78F19C066D4145A50F9ECFF7",
      e: "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010001"
    }
  };
  const { contractAddress } = await sender_client.instantiate(
    sender.address,
    codeId,
    msg,
    "RSA_Verify",
    instantiateFee,
  );
  console.info(`Contract instantiated at: `, contractAddress);
  return contractAddress;
}

const transferCoin = async (nftContractAddress) => {
  const gasPrice = GasPrice.fromString("0.05uheart");
  const sender_wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, { prefix: "human" });
  const sender_client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, sender_wallet);
  const executeFee = calculateFee(400_000, gasPrice);
  const msg =
  {
    transfer: {
      message: "0x68656c6c6f20776f726c64",
      signature: "0x57a0d6a185924d9d579b3ab319fe512331cb0bc6ef2da7d5285cbd06844f5c44662cae2e41ee5020893d6690e34b50a369a78250ae81ba6d708560535ef7cff0299f2ba070b096a9a76e84cf9c902b5e367b341ee166f5fc325dd08a3d971d96d528937f617a1eaf2250c56c4edca80c65970d54fe2492a19468bd32166b3c32",
      to_address: "human1z8ut5fmvvau4qlmfe2lqma0ku3daaeshd3mpk3",
      amount: "1000000"
    }
  }
  console.log(msg)
  const create_result = await sender_client.execute(
    sender.address,
    nftContractAddress,
    msg,
    executeFee,
    "",
    // [{ denom: "ujunox", amount: "10000" }]
  );
  console.log("minting nfts", create_result)
}




const main = async () => {
  // await uploadRSAContract()
  const codeId = 79;
  // await InstantiateContract(codeId)
  await transferCoin("human1u4u76safd0dhk8l2v5hzw2cway7fl407n9yvkgvtsskkz34up6xsuswutk")
  //("human1z8ut5fmvvau4qlmfe2lqma0ku3daaeshd3mpk3")
}

main()